<template>
  <el-main>
    <el-alert
      title="播放器使用Video.js及plugins包裝，可播放mp4、http-flv、hls(m3u8)(default)，內建city、fantasy、forest、sea等4種樣式主題，自訂樣式請修改/assets/stylesheet/videojs/custom.css(請勿更改路徑、檔名及class名稱)"
      type="success"
      style="margin-bottom: 20px"
    ></el-alert>
    <el-row :gutter="15">
      <el-col :lg="8">
        <el-card shadow="never" header="HLS">
          <el-row><span class="title">Default</span>
            <csiVideo ref="video5" :parentName="getName" :src="hlsUrl"></csiVideo>
          </el-row>
          <el-row><span class="title margin">Custom</span>
            <csiVideo ref="video6" :parentName="getName" :src="hlsUrl" :skin="'custom'"></csiVideo>
          </el-row>
        </el-card>
      </el-col>
      <el-col :lg="8">
        <el-card shadow="never" header="MP4">
          <el-row><span class="title">City</span>
            <csiVideo ref="video1" :parentName="getName" :src="mp4Url" :type="'mp4'" :skin="'city'"></csiVideo>
          </el-row>
          <el-row><span class="title margin">Fantasy</span>
            <csiVideo ref="video2" :parentName="getName" :src="mp4Url" :type="'mp4'" :skin="'fantasy'"></csiVideo>
          </el-row>
        </el-card>
      </el-col>
      <el-col :lg="8">
        <el-card shadow="never" header="FLV">
          <el-row><span class="title">Forest</span>
            <csiVideo ref="video3" :parentName="getName" :src="flvUrl" :type="'flv'" :skin="'forest'"></csiVideo>
          </el-row>
          <el-row><span class="title margin">Sea</span>
            <csiVideo ref="video4" :parentName="getName" :src="flvUrl" :type="'flv'" :skin="'sea'"></csiVideo>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import csiVideo from '@/components/csiVideo'

export default {
  name: 'videoPlayer',
  components: {
    csiVideo,
  },
  data() {
    return {
      hlsUrl: 'http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_stereo_subs.m3u8',
      mp4Url: './video/sample_mp4.mp4',
      flvUrl: './video/sample_flv.flv',
    }
  },
  computed: {
    getName() {
      return this.$options.name
    }
  },
  methods: {
    //
  },
}
</script>

<style scoped>
  .title { font-size: 1.2em; }
  .margin { margin-top: 10px; }
</style>
