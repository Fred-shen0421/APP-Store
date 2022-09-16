<!--
 * @Descripttion: Videojs二次封裝
 * @version: 1.0
 * @Author: Louis
 * @Date: 2022年7月22日12:10:06
 * @LastEditors: Louis
 * @LastEditTime: 2022年7月28日13:37:50
-->

<template>
  <video
    ref="csiVideo"
    class="video-js vjs-big-play-centered"
    :class="useSkin"
    controls
    preload="auto"
    width="100%"
    height="100%"
  ></video>
</template>

<script>
import Videojs from 'video.js'
import langTW from 'video.js/dist/lang/zh-TW.json'
import store from '@/store'
import 'video.js/dist/video-js.css'
import 'videojs-flvjs-es6'

export default {
  props: {
    parentName: { type: String, required: true, default: '' },
    src: { type: String, required: true, default: '' },
    type: { type: String, default: 'hls' },
    skin: { type: String, default: '' },
    autoplay: { type: Boolean, default: false },
    controls: { type: Boolean, default: true },
    loop: { type: Boolean, default: false },
    muted: { type: Boolean, default: false },
    aspectRatio: { type: String, default: '16:9' },
    options: { type: Object, default: () => {} },
  },
  data() {
    return {
      useSkin: '',
      player: null,
      skinClass: {
        custom: 'vjs-theme-custom',
        city: 'vjs-theme-city',
        fantasy: 'vjs-theme-fantasy',
        forest: 'vjs-theme-forest',
        sea: 'vjs-theme-sea',
      },
    }
  },
  created() {
    this.initSkin()
  },
  mounted() {
    Videojs.addLanguage('zh-TW', langTW)
    this.init()
  },
  deactivated() {
    //由於keepAlive導致關閉tab時若該tab是currentRoute就不會觸發beforeUnmount, unmounted，只有deactivated
    //但切換tab時也會觸發deactivated，因此需在deactivated時判斷tab是否還存在，若不存在需執行dispose
    const keepLiveRoute = [...store.state.keepAlive.keepLiveRoute]
    const findRoute = keepLiveRoute.find(function (route) {
      return this.parentName == route
    }, this)
    if (findRoute == undefined) {
      this.dispose()
    }
  },
  beforeUnmount() {
    this.dispose()
  },
  methods: {
    init() {
      let options = {
        language: 'zh-TW',
        autoplay: this.autoplay,
        controls: this.controls,
        loop: this.loop,
        muted: this.muted,
        aspectRatio: this.aspectRatio,
        fullscreen: {
          options: { navigationUI: 'hide' },
        },
        ...this.options,
      }

      switch (this.type) {
        case 'mp4':
          this.playMp4(options)
          break
        case 'flv':
          this.playFlv(options)
          break
        default:
          this.playHls(options)
          break
      }
    },
    playMp4(options) {
      this.player = Videojs(this.$refs.csiVideo, {
        sources: [
          {
            src: this.src,
            type: 'video/mp4',
          },
        ],
        ...options,
      })
    },
    //.flv必須是 H264+AAC 可以用 ffmpeg 以如下命令轉換
    //ffmpeg -i source.mp4 -vcodec libx264 -c:a aac converted.flv
    playFlv(options) {
      this.player = Videojs(this.$refs.csiVideo, {
        techOrder: ['html5', 'flvjs'],
        flvjs: {
          mediaDataSource: {
            isLive: false,
            cors: true,
            withCredentials: false,
          },
        },
        sources: [
          {
            src: this.src,
            type: 'video/x-flv',
          },
        ],
        ...options,
      })
    },
    playHls(options) {
      this.player = Videojs(this.$refs.csiVideo, {
        techOrder: ['html5', 'flvjs'], // 相容順序
        html5: {
          vhs: {
            withCredentials: false,
          },
        },
        sources: [
          {
            src: this.src,
            type: 'application/x-mpegURL',
          },
        ],
        ...options,
      })
    },
    initSkin() {
      if (this.skin && this.skinClass[this.skin]) {
        //動態載入skin對應的.css
        if (this.skin == 'custom') {
          (async () => {
            await import(`@/assets/stylesheet/videojs/${this.skin}.css`)
          })()
        } else {
          (async () => {
            await import(`@videojs/themes/dist/${this.skin}/index.css`)
          })()
        }
        this.useSkin = this.skinClass[this.skin]
      }
    },
    dispose() {
      if (this.player) {
        this.player.dispose()
      }
    },
  },
}
</script>
