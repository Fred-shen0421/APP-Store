/* eslint-disable */
!function(n,a){"object"==typeof exports&&"undefined"!=typeof module?module.exports=a():"function"==typeof define&&define.amd?define(a):(n="undefined"!=typeof globalThis?globalThis:n||self).PinyinMatch=a()}(this,(function(){"use strict";var n=[],a={},i={};function u(n){for(var a=[],i=[],u=0;n.length>=u;u++)i.push(!0);return e(0,n,[],a,i),a}function e(a,i,u,o,g){if(a!==i.length)for(var h=function(h){var t=i.substring(a,h+1),r=!1;if(n.some((function(n){return 0===n.indexOf(t)}))&&!i[h+1]&&g[h+1]){if(1===t.length)u.push(t);else{var s=[];n.forEach((function(n){0===n.indexOf(t)&&s.push(n)})),u.push(s)}r=!0}else-1!==n.indexOf(t)&&g[h+1]&&(u.push(t),r=!0);if(r){var f=o.length;e(h+1,i,u,o,g),o.length===f&&(g[h+1]=!1),u.pop()}},t=a;i.length>t;t++)h(t);else o.push(u.join(" "))}function o(n){var a=[];return u(n).forEach((function(n){var i=n.split(" "),u=i.length-1;i[u].indexOf(",")?i[u].split(",").forEach((function(n){i.splice(u,1,n),a.push(JSON.parse(JSON.stringify(i)))})):a.push(i)})),0!==a.length&&a[0].length===n.length||a.push(n.split("")),i=function(n,a,i){return a in n?Object.defineProperty(n,a,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[a]=i,n}({},n,a),a}function g(n,a,i,u){if(!n)return!1;var e=n.split(" ");return e.forEach((function(n){n.length>0&&u&&e.push(n.charAt(0))})),i?e.some((function(n){return 0===n.indexOf(a)})):-1!==e.indexOf(a)}function h(n,u){if(!n||!u)return!1;n=n.toLowerCase(),u=u.replace(/\s+/g,"").toLowerCase();var e=n.indexOf(u);if(-1!==e)return[e,e+u.length-1];var g=t(n.split(""),[u.split("")],u);return g||t(function(n){for(var i=[],u=0,e=n.length;e>u;u++){var o=n.charAt(u);i.push(a[o]||o)}return i}(n),i[u]||o(u),u)}function t(n,a,i){for(var u=0;n.length>u;u++)for(var e=0;a.length>e;e++){var o=a[e],h=o.length,t=h===i.length,r=!0,s=0,f=0,c=0;if(n.length>=h){for(;o.length>s;s++)if(0===s&&" "===n[u+s+f])f+=1,s-=1;else if(" "===n[u+s+c])c+=1,s-=1;else if(!g(n[u+s+c],o[s],!n[u+s+1]||!o[s+1],t)){r=!1;break}if(r)return[u+f,c+u+s-1]}}return!1}return{match:function(i){return n=Object.keys(i),a=function(n){var a={};for(var i in n)for(var u=n[i],e=0,o=u.length;o>e;e++)a[u[e]]=a[u[e]]?a[u[e]]+" "+i:i;return a}(i),h}({a:"阿啊呵醃嗄丫錒",e:"額阿俄惡鵝遏鄂厄餓峨扼娥鱷哦蛾噩愕訛鍔堊婀鶚萼諤莪顎鋨顎呃閼屙苊軛",ai:"愛埃艾礙癌哀挨矮隘藹唉皚哎靄捱曖嬡噯璦嗌鑀砹",ei:"誒",xi:"系西席息希習吸喜細析戲洗悉錫溪惜稀襲夕灑晰昔犧臘烯熙媳棲膝隙犀蹊硒兮熄曦禧嬉璽奚汐徙羲銑淅嘻歙熹矽蟋郗唏皙隰樨浠愾蜥檄卻翕鬩鰓舾屣葸螅咭粞覡欷僖醯鼷裼穸餼舄禊誒菥蓰",yi:"一以已意議義益億易醫藝食依移衣異伊儀宜射遺疑毅誼亦疫役憶抑尾乙譯翼蛇溢椅沂洩逸蟻夷邑怡繹彝裔姨熠貽矣屹頤倚詣胰奕翌疙弈軼蛾驛壹猗臆弋銥旖漪迤佚翊詒懌痍懿飴嶧揖眙鎰仡黟肄咿翳挹縊囈刈咦嶷羿釔殪荑薏蜴鐿噫癔苡悒嗌瘞佾埸圯艤酏劓",an:"安案按岸暗鞍氨俺胺銨諳庵黯鵪桉淹犴揞廠廣",han:"廠漢韓含旱寒汗涵函喊憾罕焊翰邯撼瀚憨捍酣悍鼾邗頷蚶晗菡旰頇犴焓撖",ang:"昂仰盎骯",ao:"奧澳傲熬凹鰲敖遨鏖襖坳翱嗷拗懊岙螯驁獒鏊媼廒聱",wa:"瓦挖娃窪襪蛙凹哇佤媧咼膃",yu:"於與育余預域予遇奧語譽玉魚雨漁裕愈娛欲吁輿宇羽逾豫郁寓吾獄喻御浴愉禹俞邪榆愚渝尉淤虞嶼峪粥馭瑜禺毓鈺隅芋熨瘀迂煜昱汩於臾盂聿竽萸嫗腴圄諭覦揄齬諛俁餘庾妤瘐鬻歟鷸閾崳雩鵒圉蜮傴紆窬窳飫蕷狳聿舁蝓燠",niu:"牛紐扭鈕拗妞忸狃",o:"哦噢喔",ba:"把八巴拔伯吧壩爸霸罷芭跋扒叭靶疤笆耙鱍粑笆灞鈀捌菝魃茇",pa:"怕帕爬扒趴琶啪葩耙杷鈀把",pi:"被批副否皮壞辟啤匹披疲罷僻毗坯脾譬劈媲屁琵邳裨痞癖陂丕枇辟霹吡紕砒鈹淠郫埤濞睥芘蚍圮鼙羆蜱疋貔仳庀擗甓陴",bi:"比必幣筆畢秘避閉佛辟壁弊彼逼碧鼻臂蔽拂泌璧庇痺斃弼匕鄙陛裨賁敝蓖吡篦紕俾鉍毖篳荸薜婢嗶蹕濞秕蓽愎睥妣芘箅髀畀潷狴萆嬖襞舭",bai:"百白敗擺伯拜柏佰掰唄擘捭稗",bo:"波博播勃撥薄佛伯玻搏柏泊舶剝渤卜駁簿脖膊簸菠礡箔鉑亳缽帛擘餑跛鈸趵檗啵鵓擗踣",bei:"北被備倍背杯勃貝輩悲碑臂卑悖憊蓓陂鋇狽唄焙碚褙庳鞴孛鵯邶鐾",ban:"辦版半班般板頒伴搬斑扮拌扳瓣阪阪絆鈑瘢舨斑",pan:"判盤番潘攀盼拚畔胖叛拌蹣磐爿蟠泮袢襻",bin:"份賓頻濱斌彬瀕殯繽鬢檳擯臏玢鑌豳髕儐",bang:"幫邦彭旁榜棒膀鎊綁傍磅蚌謗梆濱蒡",pang:"旁龐乓磅螃彷滂逄耪",beng:"泵崩蚌蹦迸繃甭崩甏堋",bao:"報保包寶暴胞薄爆炮飽抱堡剝鮑曝葆瀑豹刨褒雹孢苞煲褓趵鴇齙",bu:"不部步布補捕堡埔卜埠簿哺怖鈽噗瓿逋晡醭鈽",pu:"普暴鋪浦樸堡葡譜埔撲僕蒲曝瀑溥莆圃璞濮菩蹼匍噗氆鐠鏷",mian:"面棉免綿緬勉眠冕娩靦澠湎沔黽眄",po:"破繁坡迫頗樸泊婆潑魄粕鄱珀陂叵笸濼皤釙叵",fan:"反范犯繁飯泛翻凡返番販煩拚帆樊藩礬梵蕃釩幡畈蘩蹯燔",fu:"府服副負富復福夫婦幅付扶父符附腐赴佛浮覆輔傅伏撫賦輻腹弗膚阜袱縛甫氟斧孚敷俯拂俘咐腑孵芙涪釜脯茯馥宓紱訃夫罘麩蝠匐芾蜉跗鳧滏蝮駙紼蚨砩桴賻菔嘸趺苻拊鮒怫稃郛莩帕祓艴黻黼鰒",ben:"本體奔苯笨夯賁錛畚坌",feng:"風豐封峰奉鳳鋒馮逢縫蜂楓瘋諷烽俸灃酆砜葑唪",bian:"變便邊編遍辯鞭辨貶匾扁卞汴辮砭苄蝙鳊弁窆籩煸褊碥忭緶",pian:"便片篇偏騙翩扁駢胼蹁諞猵緶",zhen:"鎮真針圳振震珍陣診填偵臻貞枕楨賑禎幀甄斟縝箴疹砧榛鴆軫稹溱蓁胗椹朕畛湞",biao:"表標彪鏢裱飆膘飆鑣婊驃颮杓髟鰾瘭",piao:"票樸漂飄嫖瓢剽縹殍瞟驃嘌莩螵",huo:"和活或貨獲火伙惑霍禍豁霍藿锪蠖鈥耛鑊夥劐攉",bie:"別鱉憋癟蹩",min:"民敏閩閔皿泯岷憫珉抿黽緡玟愍苠鮸",fen:"分份紛奮粉氛芬憤糞墳汾焚酚吩忿棼玢鼢瀵僨鲼",bing:"並病兵冰屏餅炳秉丙摒柄檳稟枋邴",geng:"更耕頸庚耿梗埂羹哽賡綆鯁",fang:"方放房防訪紡芳仿坊妨肪邡舫彷枋魴鈁",xian:"現先縣見線限顯險獻鮮洗憲纖陷閒賢仙銜掀鹹嫌摻羨弦腺癇嫻舷餡酰銑冼涎暹秈掀莧蜆躚峴蘚燹鷴氙薟霰跣獫祆筅",fou:"不否缶",ca:"拆擦嚓礤",cha:"查察差茶插叉剎茬楂岔詫碴嚓喳奼杈汊衩搽槎察苴擦馇鍤猹",cai:"才采財材菜彩裁蔡猜踩睬",can:"參殘餐燦慘蠶摻璨慚粲孱驂黲",shen:"信深參身神什審申甚沈伸慎滲腎紳莘呻嬸娠砷蜃哂椹葚吲糝瀋詵諗矧胂",cen:"參岑涔",san:"三參散傘三糝散毿",cang:"藏倉蒼滄艙臧傖",zang:"藏髒葬贓臧奘駔",chen:"稱陳沈沉晨琛臣塵辰襯趁忱郴宸諶磣嗔抻櫬傖讖齔肜",cao:"草操曹槽糙嘈漕螬艚屮",ce:"策測冊側廁柵惻",ze:"責則澤擇側咋嘖仄簀賾笮舴昃迮幘",zhai:"債擇齊宅寨側摘窄齋祭翟砦瘵嚌",dao:"到道導島倒刀盜稻蹈悼搗叨禱燾氘纛幬忉",ceng:"層曾蹭噌",zha:"查扎炸詐閘渣咋乍搾楂札柵眨吒柞喳喋鍘蚱吒怍砟楂痄哳齇",chai:"差拆柴釵豺儕蠆瘥",ci:"次此差詞辭刺瓷磁茲慈茨賜祠伺雌疵茲糍呲粢",zi:"資自子字齊咨滋仔姿紫茲孜淄籽梓鯔漬姊吱秭恣甾孳訾滓錙輜趑齜貲眥緇呲笫諮嵫髭茈粢觜耔",cuo:"措錯磋挫搓撮蹉銼厝嵯痤矬瘥脞鹺",chan:"產單闡嶄纏摻禪顫鏟蟬攙潺蟾饞懺嬋孱覘廛諂讒澶驏羼躔蕆囅",shan:"山單善陝閃衫擅汕扇摻珊禪刪膳繕贍鄯柵煽姍跚鱔嬗潸訕舢苫疝撣膻釤剡蟮芟埏騸",zhan:"展戰占站嶄粘湛沾瞻顫詹斬盞輾綻氈棧蘸旃譫搌",xin:"新心信辛欣薪馨鑫芯鋅忻莘昕釁歆囟鐔",lian:"聯連練廉煉臉蓮戀鏈簾憐漣斂璉鐮濂楝鰱殮瀲褳襝臁奩薟蠊蘞",chang:"場長廠常償昌唱暢倡嘗腸敞倘猖娼淌裳徜昶悵嫦菖鯧閶倀萇氅惝鬯",zhang:"長張章障漲掌帳脹彰丈仗漳樟賬杖璋嶂仉瘴蟑獐幛鄣嫜",chao:"超朝潮炒鈔抄巢吵剿綽嘲晁焯耖怊",zhao:"著照招找召朝趙兆昭肇罩釗沼嘲爪詔濯啁棹笊",zhou:"調州周洲舟驟軸晝宙粥皺肘咒帚胄縐紂妯啁謅繇碡籀酎荮",che:"車徹撤尺扯澈掣坼硨屮",ju:"車局據具舉且居劇巨聚渠距句拒俱櫃菊拘炬桔懼矩鞠駒鋸踞咀瞿枸掬沮莒橘颶疽鉅趄踽遽琚齟椐苣裾矩狙倨櫸苴詎雎鋦窶鞫犋屨醵",cheng:"成程城承稱盛搶乘誠呈淨懲撐澄秤橙騁逞瞠丞晟鐺埕塍蟶檉鋮酲裎棖",rong:"容榮融絨溶蓉熔戎榕茸冗嶸肜狨蠑",sheng:"生聲升勝盛乘聖剩牲甸省繩笙甥嵊晟澠眚",deng:"等登鄧燈澄凳瞪蹬登磴嶝鐙簦戥",zhi:"制之治質職只志至指織支值知識直致執置止植紙拓智殖秩旨址滯氏枝芝脂幟汁肢摯稚酯擲峙炙櫛侄芷窒咫吱趾痔蜘郅桎雉祉酈陟痣蛭帙枳躑徵胝梔贄祗豸鷙摭軹卮輊彘觶縶跖埴黹忮騭膣躓",zheng:"政正證爭整征鄭丁症掙蒸睜錚箏拯崢怔諍猙徵鉦",tang:"堂唐糖湯塘躺趟倘棠燙淌膛搪鏜儻螳溏帑羰樘醣螗耙鐋瑭",chi:"持吃池遲赤馳尺斥齒翅匙癡恥熾侈弛叱啻坻眙嗤墀哧茌豉敕笞飭踟蚩柢媸魑篪褫彳鴟螭瘛眵傺",shi:"是時實事市十使世施式勢視識師史示石食始士失適試什澤室似詩飾殖釋駛氏碩逝濕蝕獅誓拾屍匙仕柿矢峙侍噬嗜柵拭噓屎恃軾虱耆舐蒔鈰謚炻豕鰣螫釃筮塒弒蓍鲺貰",qi:"企其起期氣七器汽奇齊啟旗棋妻棄揭枝歧欺騎契迄亟漆戚豈稽岐琦棲緝琪泣乞砌祁崎綺祺祈淒淇杞臍麒圻憩芪伎俟畦耆葺沏萋騏鰭綦訖蘄屺頎亓磧柒啐汔綮萁嘁蠐槭欹芑榿丌蜞",chuai:"揣踹啜搋膪",tuo:"托脫拓拖妥駝陀沱鴕馱唾橢坨佗砣跎庹柁橐乇鉈沲酡鼉籜柝",duo:"多度奪朵躲鐸隋咄墮舵垛惰哆踱跺掇剁柁綞沲裰哚隳",xue:"學血雪削薛穴靴謔噱鱈踅澩",chong:"重種充沖湧崇蟲寵忡憧舂茺銃艟",chou:"籌抽綢酬愁丑臭仇疇稠瞅躊惆儔瘳讎幬",qiu:"求球秋丘邱仇酋裘龜囚遒鰍虯蚯泅楸湫犰逑巰艽俅蝤賕鼽糗",xiu:"修秀休宿袖繡臭朽銹羞嗅岫溴庥饈咻髹鵂貅",chu:"出處礎初助除儲畜觸楚廚雛矗櫥鋤滁躇怵絀搐芻蜍黜杵躕亍樗楚楮",tuan:"團揣湍疃摶彖",zhui:"追墜綴揣椎錐贅惴隹騅縋",chuan:"傳川船穿串喘椽舛釧遄氚舡",zhuan:"專轉傳賺磚撰篆饌囀顓",yuan:"元員院原源遠願園援圓緣袁怨淵苑宛冤媛猿垣沅塬垸鴛轅鳶瑗圜爰芫黿櫞螈眢宛掾",cuan:"竄攢篡躥攛爨汆镩",chuang:"創床窗闖幢瘡愴",zhuang:"裝狀莊壯撞妝幢樁奘僮戇",chui:"吹垂錘炊椎陲槌捶棰",chun:"春純醇淳唇椿蠢鶉朐蓴肫蝽",zhun:"准屯淳諄肫窀",cu:"促趨趣粗簇醋卒蹴猝蹙蔟殂徂",dun:"噸頓盾敦蹲墩囤沌鈍燉盹遁躉砘礅",qu:"區去取曲趨渠趣驅屈軀衢娶祛瞿嶇齲覷朐蛐蛆苣闃詘劬蕖蘧氍黢蠷璩麴鴝磲",xu:"需許續須序徐休蓄畜虛吁緒敘旭邪恤墟栩絮圩婿戌胥噓滸煦酗詡朐盱蓿漵洫頊勖糈砉醑",chuo:"輟綽戳淖啜齪踔辶",zu:"組族足祖租阻卒俎詛鏃菹",ji:"濟機其技基記計系期際及集級幾給積極己紀即繼擊既激績急奇吉季齊疾跡雞劑輯籍寄擠圾冀亟寂暨脊躋肌稽忌饑祭緝棘磯汲畸姬藉瘠驥羈妓譏稷薊悸嫉岌嘰伎鯽詰楫薺戟箕霽嵇覬麂畿璣笈犄芨唧屐髻戢佶偈笄跽蒺乩咭繼脊蟣掎齏殛鱭剞洎丌墼蕺芰嚌",cong:"從叢匆聰蔥囪琮淙樅驄蓯璁",zong:"總從綜宗縱蹤棕粽鬃傯樅腙",cou:"湊輳腠楱",cui:"衰催崔脆翠萃粹摧璀瘁悴淬啐隹毳榱",wei:"為位委未維衛圍違威偉危味微唯謂偽慰尾魏韋胃畏帷喂巍萎蔚緯濰尉渭惟薇葦煒圩娓諉瑋崴桅偎逶倭猥囗葳隗痿蝟潿嵬韙煨艉隹幃闈洧溈隈鮪軎",cun:"村存寸忖皴",zuo:"作做座左坐昨佐琢撮祚柞唑嘬酢怍笮阼胙",zuan:"鑽纂攥纘躦",da:"大達打答搭沓瘩憚嗒噠耷韃靼褡笪怛妲",dai:"大代帶待貸毒戴袋歹呆隸逮岱傣棣怠殆黛甙埭詒紿玳呔迨",tai:"台太態泰抬胎汰鈦苔薹肽跆邰鮐酞駘炱",ta:"他它她拓塔踏塌榻沓漯獺嗒撻蹋趿遢鉈鰨溻闥",dan:"但單石擔丹膽旦彈蛋淡誕氮鄲耽殫憚儋眈疸澹撣膻啖簞聃萏癉賧",lu:"路六陸錄綠露魯盧爐鹿祿賂蘆廬碌麓顱瀘鹵潞鷺轆虜璐漉嚕戮鱸擄櫓轤逯淥蓼擼鸕櫨氌臚櫓簏艫輅壚",tan:"談探坦攤彈炭壇灘貪歎譚潭碳毯癱檀痰袒坍覃忐曇郯澹鉭錟",ren:"人任認仁忍韌刃紉飪妊荏稔壬仞軔衽",jie:"家結解價界接節她屆介階街借傑潔截姐揭捷劫戒皆竭桔誡楷秸睫藉拮芥詰碣嗟頡蚧孑婕癤桀訐疥偈羯袷嚌喈鮚骱",yan:"研嚴驗演言眼煙沿延鹽炎燕巖宴艷顏殷彥掩淹閻衍鉛雁咽厭焰堰硯唁焉晏簷蜒奄儼醃妍諺兗筵焱偃閆嫣鄢湮贗胭琰灩閹魘釅郾懨崦芫剡鼴菸饜埏讞厴罨",dang:"當黨檔蕩擋宕碭鐺襠凼菪讜",tao:"套討跳陶濤逃桃萄淘掏滔韜叨洮啕絛饕鼗",tiao:"條調挑跳迢眺苕窕笤佻啁糶髫銚祧齠蜩鰷",te:"特忑忒鋱慝",de:"的地得德底鎝",dei:"得",di:"的地第提低底抵弟迪遞帝敵堤蒂締滴滌翟娣笛棣荻諦狄邸嘀砥坻詆嫡鏑碲骶氐柢糴羝睇覿",ti:"體提題弟替梯踢惕剔蹄棣啼屜剃涕銻倜悌逖嚏荑醍綈鵜緹裼",tui:"推退弟腿褪頹蛻忒煺",you:"有由又優遊油友右郵尤憂幼猶誘悠幽佑釉柚鈾魷囿酉攸黝莠猷蝣疣呦蚴蕕莜銪宥繇卣牖鼬尢蚰侑",dian:"電點店典奠甸碘澱殿墊顛滇癲巔惦掂癜玷佃踮靛鈿簟坫阽",tian:"天田添填甜甸恬腆佃舔鈿闐忝殄畋栝掭",zhu:"主術住注助屬逐寧著築駐朱珠祝豬諸柱竹鑄株矚囑貯煮燭苧褚蛛拄銖洙竺蛀渚佇杼侏澍誅茱箸炷躅翥瀦邾櫧舳櫫、瘃麈疰",nian:"年念釀輾碾廿捻攆拈蔫鯰埝輦黏",diao:"調掉雕吊釣刁貂凋碉鯛叼銚吊",yao:"要麼約藥邀搖耀腰遙姚窯瑤咬堯鑰謠餚夭僥吆瘧妖杳舀窕窈曜鷂爻繇徭軺銚鰩腰珧",die:"跌疊蝶迭碟爹諜牒耋佚喋堞瓞鰈垤揲蹀",she:"設社攝涉射折捨蛇拾舌奢懾赦賒佘麝歙畬厙猞揲灄",ye:"業也夜葉射野液冶喝頁爺耶邪咽椰燁掖拽曳曄謁腋噎揶靨鄴琊揲",xie:"些解協寫血葉謝械鞋脅斜攜懈契卸諧洩蟹邪歇瀉屑挾燮榭蠍擷偕褻楔頡纈邂鮭瀣勰榍薤紲渫廨獬躞",zhe:"這者著著浙折哲蔗遮轍輒柘鍺褶蜇蟄鷓謫赭摺乇磔螫",ding:"定訂頂丁鼎盯釘錠叮仃鋌町酊啶碇腚疔玎耵",diu:"丟銩",ting:"聽庭停廳廷挺亭艇婷汀鋌烴霆町蜓葶梃莛",dong:"動東董冬洞懂凍棟侗咚峒氡恫胴硐垌鶇崠胨",tong:"同通統童痛銅桶桐筒彤侗佟潼捅酮砼瞳慟峒仝通僮垌茼",zhong:"中重種眾終鍾忠仲衷腫踵塚盅蚣忪鍾舯螽",dou:"都斗讀豆抖兜陡逗竇瀆蚪痘蔸鈄兜",du:"度都獨督讀毒渡杜堵賭睹肚鍍瀆篤竺嘟犢妒牘蠹櫝黷芏髑",duan:"斷段短端鍛緞鍛椴籪",dui:"對隊追敦兌堆碓鐓懟憝",rui:"瑞兌銳睿芮蕊蕤蚋枘",yue:"月說約越樂躍兌閱岳粵悅曰鑰櫟鉞樾瀹龠噦刖",tun:"吞屯囤褪豚臀飩暾汆",hui:"會回揮匯惠輝恢徽繪毀慧灰賄卉悔穢潰薈暉彗諱誨琿墮詼蕙晦睢麾燴茴喙檜蛔洄澮虺恚蟪灰隳繢噦",wu:"務物無五武午吳舞伍污烏誤亡惡屋晤悟吾霧蕪梧勿巫侮塢毋誣嗚鎢鄔捂鶩兀婺嫵於戊鵡浯蜈唔騖仵焐芴鋈廡鼯牾憮圬忤痦迕杌寤阢",ya:"亞壓雅牙押鴨呀軋涯崖邪芽啞訝鴉婭衙丫蚜碣埡伢氬椏琊揠丫睚痖疋迓岈砑",he:"和合河何核蓋賀喝赫荷盒鶴嚇呵苛禾菏壑褐涸閡闔劾訶頜呵貉曷翮紇盍",wo:"我握窩沃臥撾渦斡渥幄蝸喔倭萵齷肟硪",en:"恩摁蒽",n:"嗯唔",er:"而二爾兒耳邇餌洱貳鉺珥佴鴯鮞",fa:"發法罰乏伐閥筏砝垡琺",quan:"全權券泉圈拳勸犬銓痊詮荃醛蜷顴綣筌鬈悛輇畎",fei:"費非飛肥廢菲肺啡沸匪斐蜚妃誹扉翡霏吠緋腓痱芾淝悱狒榧砩鯡篚鐨",pei:"配培壞賠佩陪沛裴胚妃霈淠旆帔呸醅轡棓",ping:"平評憑瓶馮屏萍蘋乒坪枰娉俜鲆",fo:"佛",hu:"和護戶核湖互乎呼胡戲忽虎滬糊壺葫狐蝴弧瑚滸鵠琥扈唬滹惚祜囫斛笏芴醐猢怙忽戽槲觳煳鶘冱瓠虍岵鹱烀轷",ga:"夾咖嘎尬噶旮伽尕釓尜",ge:"個合各革格歌哥蓋隔割閣戈葛鴿擱胳舸疙鉻骼蛤咯圪鎘頜仡硌嗝鬲膈紇袼搿塥哿虼",ha:"哈蛤鉿",xia:"下夏峽廈轄霞夾蝦狹嚇俠暇遐瞎匣瑕唬呷黠硤罅狎瘕柙",gai:"改該蓋概溉鈣丐芥賅垓陔戤",hai:"海還害孩亥咳骸駭氦嗨胲醢",gan:"干感趕敢甘肝桿贛乾柑尷竿稈橄矸淦甘擀酐紺泔坩旰疳澉",gang:"港鋼剛崗綱岡槓缸扛肛罡戇筻",jiang:"將強江港獎講降疆蔣姜漿匠醬僵槳絳韁強豇礓洚茳糨耩",hang:"行航杭巷夯吭桁沆絎頏",gong:"工公共供功紅貢攻宮鞏龔恭拱躬弓汞蚣珙觥肱廾",hong:"紅宏洪轟虹鴻弘哄烘泓訇蕻閎訌葒黌薨",guang:"廣光逛潢獷胱光桄",qiong:"窮瓊穹邛煢筇跫蛩銎",gao:"高告搞稿膏糕鎬皋羔鋯杲郜睪誥稿篙縞槁槔",hao:"好號毫豪耗浩郝皓昊皋蒿壕灝嚎濠蠔貉顥嗥薅嚆",li:"理力利立裡李歷例離勵禮麗黎璃厲厘粒莉梨隸栗荔瀝犁漓哩狸藜罹籬鯉礪吏澧俐驪溧礫蒞鋰笠蠡蠣痢靂儷僳醴櫟酈俚櫪喱邐娌鸝戾砬唳壢癘蜊黧猁鬲糲蘺嚦躒疬縭鱺鱧嫠詈悝藶篥轢",jia:"家加價假佳架甲嘉賈駕嫁夾稼鉀挾拮迦伽頰浹枷戛莢痂頡鎵笳珈岬胛袈郟葭袷瘕鋏跏蛺恝哿",luo:"落羅絡洛邏螺鑼駱蘿裸漯烙摞騾咯籮珞捋犖硌雒欏鏍躒瘰濼腡玀裸蠃",ke:"可科克客刻課顆渴殼柯棵呵坷恪苛咳磕珂稞瞌溘軻窠嗑痾蝌岢鉿頦髁蚵緙氪騍鈳錁",qia:"卡恰洽掐髂袷咭葜",gei:"給",gen:"根跟亙艮哏茛",hen:"很狠恨痕哏",gou:"構購夠句溝狗鉤拘勾苟垢枸篝佝媾詬岣彀緱笱韝覯遘",kou:"口扣寇叩摳佝蔻芤眍筘",gu:"股古顧故固鼓骨估谷賈姑孤雇辜菇沽咕呱錮鈷箍汩梏痼崮轱鴣牯蠱詁轂鶻菰罟嘏臌觚瞽蛄酤牿鲴",pai:"牌排派拍迫徘湃俳哌蒎",gua:"括掛瓜刮寡卦呱褂剮胍詿鴰栝咼",tou:"投頭透偷愉骰",guai:"怪拐乖",kuai:"會快塊筷膾蒯儈澮鄶蕢獪噲",guan:"關管觀館官貫冠慣灌罐莞綸棺斡矜倌鸛鰥盥摜涫",wan:"萬完晚灣玩碗頑挽彎蔓丸莞皖宛婉腕蜿惋烷琬畹豌剜紈綰脘菀芄宛",ne:"呢哪吶訥",gui:"規貴歸軌桂櫃圭鬼硅瑰跪龜匱閨詭癸鱖檜皈鮭劊晷傀眭媯炅庋簋劌宄匭",jun:"軍均俊君峻菌竣鈞駿龜浚雋郡筠皸麇捃",jiong:"窘炯迥炅扃",jue:"決絕角覺掘崛訣獗抉爵嚼倔厥蕨攫玨矍蹶譎橛鱖噱桷噘撅橛孓觖劂爝",gun:"滾棍輥袞磙鯀緄",hun:"婚混魂渾昏棍琿葷餛諢溷閽",guo:"國過果郭鍋裹幗渦槨囗蟈虢聒堝摑猓崞蜾咼馘",hei:"黑嘿嗨",kan:"看刊勘堪坎砍侃嵌檻瞰闞龕戡凵莰",heng:"衡橫恆亨哼珩桁蘅",mo:"萬沒麼模末冒莫摩墨默磨摸漠脈膜魔沫陌抹寞蘑摹驀饃茉嘿謨秣蟆貉嫫鏌歿耱嬤麼瘼貊貘",peng:"鵬朋彭膨蓬碰蘋棚捧亨烹篷澎抨硼怦砰彭蟛堋",hou:"後候厚侯猴喉吼逅篌餱骺後鱟瘊堠",hua:"化華劃話花畫滑嘩豁驊樺猾鏵砉",huai:"懷壞淮徊槐踝",huan:"還環換歡患緩喚煥幻瘓桓寰渙宦垸洹浣豢奐郇圜獾鯇鬟萑逭漶鍰繯擐",xun:"訊訓迅孫尋詢循旬巡汛勳遜熏徇浚殉馴鱘薰荀潯洵峋塤巽郇醺恂蕁窨蕈曛獯",huang:"黃荒煌皇凰慌晃潢謊惶簧璜恍幌湟蝗磺隍徨遑肓篁鰉蟥黃",nai:"能乃奶耐奈鼐萘氖柰佴艿",luan:"亂卵灤巒鸞欒鑾攣孿臠孌",qie:"切且契竊茄砌鍥怯伽愜妾趄挈卻篋慊",jian:"建間件見堅檢健監減簡艱踐兼鑒鍵漸柬劍尖肩艦薦箭淺剪儉鹼繭奸殲揀撿煎賤濺檻澗塹箋諫餞鑭緘瞼謇蹇腱菅翦戩毽筧犍鹼韉牮筧湔鰹囝襉踺搛縑鶼蒹譾僭戔趼楗",nan:"南難男楠喃囡赧腩囝蝻",qian:"前千錢簽潛遷欠纖牽淺遣謙乾鉛歉黔譴嵌倩鉗茜虔塹釬騫阡掮鈐扦芊犍蕁仟芡慳繾僉愆褰凵肷岍搴箝慊槧",qiang:"強搶疆牆槍腔鏘嗆羌薔襁羥蹌檣戕嬙戧熗鏹錆蜣",xiang:"向項相想鄉象響香降像享箱羊祥湘詳橡巷翔襄廂鑲饗餉緗驤薌庠鯗葙蟓",jiao:"教交較校角覺叫腳繳膠轎郊焦驕澆椒礁佼蕉嬌矯攪絞酵剿嚼餃窖跤蛟僥狡姣皎茭嶠鉸醮鮫湫徼鷦僬噍艽撟敫",zhuo:"著著繳桌卓捉琢灼濁酌拙茁涿鐲淖啄濯焯倬擢斫棹諑浞禚",qiao:"橋喬僑巧悄敲俏殼雀瞧翹竅峭鍬撬蕎蹺樵憔鞘橇嶠誚譙愀鞒磽劁繰",xiao:"小效銷消校曉笑肖削孝蕭俏瀟硝宵嘯囂霄淆哮筱逍姣簫驍梟嘵綃蛸崤枵魈",si:"司四思斯食私死似絲飼寺肆撕泗伺嗣祀廝駟嘶鍶俟巳螄絲耜笥糸鷥緦澌姒汜兕",kai:"開凱慨豈楷愷揩鍇鎧愾塏剴開蒈",jin:"進金今近僅緊盡津斤禁錦勁晉謹筋巾浸襟靳瑾燼縉矜覲堇饉藎噤廑妗槿贐衿巹",qin:"親勤侵秦欽琴禽芹沁寢擒覃噙矜秦撳溱芩衾廑鋟唚檎螓",jing:"經京精境競景警竟井驚徑靜勁敬淨鏡睛晶頸荊兢靖涇憬鯨莖腈菁脛阱旌粳靚痙箐儆逕婧肼剄弳獍",ying:"應營影英景迎映硬盈贏穎嬰鷹熒瑩櫻瑛蠅縈鶯穎膺纓瀛楹罌滎螢鸚瀅鎣郢塋嚶瓔嬴癭媵攖瀠",jiu:"就究九酒久救舊糾舅灸疚揪咎韭玖臼柩赳鳩鷲廄啾鬮桕僦鬏",zui:"最罪嘴醉咀蕞觜",juan:"卷捐圈眷娟倦絹雋鐫涓鵑鄄蠲狷錈桊",suan:"算酸蒜狻",yun:"員運雲允孕蘊韻醞耘暈勻芸隕紜鄖筠惲韞鄆氳殞慍昀菀狁",qun:"群裙逡麇",ka:"卡喀咖卡咯佧胩",kang:"康抗扛慷炕亢糠伉鈧閌",keng:"坑鏗吭",kao:"考靠烤拷銬栲尻犒",ken:"肯墾懇啃齦裉",yin:"因引銀印音飲陰隱姻殷淫尹蔭吟癮寅茵圻垠鄞湮蚓氤胤齦窨喑銦洇狺夤吲霪茚堙",kong:"空控孔恐倥崆箜",ku:"苦庫哭酷褲枯窟挎骷堀褲刳嚳",kua:"跨誇垮挎胯侉",kui:"虧奎愧魁饋潰匱葵窺盔逵睽馗聵喟夔簣巋奎揆隗傀暌跬蕢憒悝蝰",kuan:"款寬髖",kuang:"況礦框狂曠眶匡筐鄺壙匡貺夼誑誆纊",que:"確卻缺雀鵲闕瘸榷炔闋愨",kun:"困昆坤捆琨錕鯤醌髡悃閫",kuo:"擴括闊廓蛞",la:"拉落垃臘啦辣蠟喇剌旯砬邋瘌",lai:"來萊賴睞徠籟淶賚瀨癩崍癘錸",lan:"蘭覽藍籃欄嵐爛濫纜攬瀾攔懶欖斕婪闌襤罱林讕鑭漤",lin:"林臨鄰賃琳磷淋麟霖鱗凜拎遴藺吝粼嶙躪廩檁林轔膦瞵懍",lang:"浪朗郎廊狼琅榔螂閬鋃莨啷蒗稂",liang:"量兩糧良輛亮梁涼諒粱晾靚踉莨椋魎墚",lao:"老勞落絡牢撈澇烙姥佬嶗嘮酪潦癆醪銠鐒栳耢",mu:"目模木畝幕母牧莫穆姆墓慕牟牡募睦繆沐暮拇姥鉬苜仫毪坶",le:"了樂勒肋叻鰳勒仂泐",lei:"類累雷勒淚蕾壘磊擂鐳肋羸耒儡嫘縲酹勒誄檑",sui:"隨歲雖碎尿隧遂髓穗綏隋邃睢祟濉燧誶眭荽",lie:"列烈劣裂獵冽咧趔洌鬣埒捩躐",leng:"冷愣稜楞塄",ling:"領令另零靈齡陵嶺凌玲鈴菱稜伶羚苓聆翎泠瓴囹綾呤欞蛉酃鯪柃",lia:"倆",liao:"了料療遼廖聊寥繆僚燎繚撂撩嘹潦鐐寮蓼獠釕尥鷯",liu:"流劉六留柳瘤硫溜碌瀏榴琉餾遛鎏騮綹鎦旒溜鷚琉",lun:"論輪倫侖綸淪掄圇",lv:"率律旅綠慮履呂鋁屢氯縷濾侶驢櫚閭僂褸捋膂穭",lou:"樓露漏陋婁摟簍嘍鏤僂瘺髏耬螻嶁蔞",mao:"貿毛矛冒貌茂茅帽貓髦錨懋袤犛卯鉚耄峁瑁蟊茆蝥旄泖昴瞀",long:"龍隆弄壟籠攏聾隴朧瓏窿蘢嚨礱垅瀧櫳癃",nong:"農濃弄膿儂噥",shuang:"雙爽霜孀瀧",shu:"術書數屬樹輸束述署熟殊蔬舒疏鼠淑叔暑樞墅俞曙抒豎蜀薯梳戍恕孰沭贖庶漱塾倏澍紓姝菽黍腧秫毹殳疋攄",shuai:"率衰帥摔甩蟀",lve:"略掠鋝",ma:"麼馬嗎摩麻碼媽瑪嘛罵抹螞嘜蟆犸榪",me:"麼麼",mai:"買賣麥邁脈埋霾荬勱",man:"滿慢曼漫埋蔓瞞蠻鰻饅幔謾螨熳縵鏝顢墁鞔嫚",mi:"米密秘迷彌蜜謎覓靡泌瞇麋獼謐咪糜宓汨醚嘧弭脒冪禰縻蘼羋糸敉",men:"們門悶瞞汶捫燜懣鞔鍆",mang:"忙盲茫芒氓莽蟒邙硭漭",meng:"蒙盟夢猛孟萌氓朦錳檬猛懵蟒蜢虻黽蠓艨甍艋瞢礞",miao:"苗秒妙描廟瞄繆渺淼藐緲邈鹋杪眇喵",mou:"某謀牟繆眸哞鍪蛑侔",miu:"繆謬",mei:"美沒每煤梅媒枚妹眉魅霉昧媚玫酶鎂湄寐莓袂楣糜嵋楣浼猸眉",wen:"文問聞穩溫紋吻蚊雯紊瘟汶韞刎璺玟閿",mie:"滅蔑篾乜咩蠛",ming:"明名命鳴銘冥茗溟酩瞑螟暝",na:"內南那納拿哪娜鈉吶捺衲拿肭",nei:"內那哪餒",nuo:"難諾挪娜糯懦儺喏搦楉",ruo:"若弱偌箬",nang:"囊囊囔曩攮",nao:"腦鬧惱撓瑙淖孬垴鐃橈呶硇猱蟯",ni:"你尼呢泥疑擬逆倪妮膩匿霓溺旎暱坭鈮鯢你怩睨猊",nen:"嫩恁",neng:"能",nin:"您恁",niao:"鳥尿溺裊尿蔦嬲",nie:"攝聶捏涅鎳孽捻櫱嚙躡囁臬鑷顳乜隉",niang:"娘釀",ning:"寧凝擰濘檸嚀獰佞聹甯",nu:"努怒奴弩駑帑孥胬",nv:"女釹衄恧",ru:"入如女乳儒辱汝茹褥孺濡蠕嚅縟溽銣洳薷襦颥蓐",nuan:"暖",nve:"虐瘧",re:"熱若惹喏",ou:"區歐偶毆嘔禺藕謳鷗甌漚耦慪",pao:"跑炮泡拋刨袍咆皰庖狍匏脬",pou:"剖掊裒",pen:"噴盆湓",pie:"瞥撇苤氕",pin:"品貧聘頻拼拚顰姘嬪榀牝",se:"色塞瑟澀嗇穡銫槭",qing:"情青清請親輕慶傾頃卿晴氫擎氰罄磬蜻箐鯖綮苘黥圊檠謦",zan:"贊暫攢塹昝簪糌瓚鏨趲拶",shao:"少紹召燒稍邵哨韶捎勺梢鞘芍苕劭艄筲杓潲",sao:"掃騷嫂梢繅搔瘙臊埽繰鳋",sha:"沙廈殺紗砂啥莎剎杉傻煞鯊霎嗄痧裟挲鎩唼歃",xuan:"縣選宣券旋懸軒喧玄絢渲璇炫萱癬漩眩暄煊鉉楦泫諼痃碹揎鏇儇",ran:"然染燃冉苒髯蚺",rang:"讓壤攘嚷瓤穰禳",rao:"繞擾饒嬈橈蕘",reng:"仍扔",ri:"日",rou:"肉柔揉糅鞣蹂",ruan:"軟阮朊",run:"潤閏",sa:"薩灑撒颯卅仨脎",suo:"所些索縮鎖莎梭瑣嗦唆嗩娑蓑羧挲桫嗍睃",sai:"思賽塞腮塞鰓",shui:"說水稅誰睡",sang:"桑喪嗓搡顙磉",sen:"森",seng:"僧",shai:"篩曬",shang:"上商尚傷賞湯裳墒晌垧觴殤熵鞝",xing:"行省星腥猩惺興刑型形邢餳醒幸杏性姓陘荇滎擤悻硎",shou:"收手受首售授守壽瘦獸狩綬艏",shuo:"說數碩爍朔鑠妁槊蒴搠",su:"速素蘇訴縮塑肅俗宿粟溯酥夙愫簌穌僳謖涑蔌嗉觫",shua:"刷耍唰",shuan:"栓拴涮閂",shun:"順瞬舜吮",song:"送松宋訟頌聳誦嵩淞慫悚崧淞忪竦菘",sou:"艘搜擻嗽嗖叟餿藪颼嗾溲鎪螋瞍",sun:"損孫筍蓀榫隼猻飧",teng:"騰疼籐滕謄",tie:"鐵貼帖餮萜",tu:"土突圖途徒塗吐屠兔禿凸荼釷菟堍酴",wai:"外歪崴",wang:"王望往網忘亡旺汪枉妄惘罔輞魍",weng:"翁嗡甕蓊蕹",zhua:"抓撾爪",yang:"樣養央陽洋揚楊羊詳氧仰秧癢漾瘍泱殃恙鴦徉佯怏煬烊鞅蛘",xiong:"雄兄熊胸凶匈洶芎",yo:"喲唷",yong:"用永擁勇湧泳庸俑踴傭詠雍甬鏞臃邕蛹恿慵壅癰鳙墉饔喁",za:"雜扎咱砸咋匝咂拶",zai:"在再災載栽仔宰哉崽甾",zao:"造早遭棗噪灶燥糟鑿躁藻皂澡蚤皂",zei:"賊",zen:"怎譖",zeng:"增曾綜贈憎珵甑罾繒",zhei:"這",zou:"走鄒奏揍諏騶陬楱鄹鯫",zhuai:"轉拽",zun:"尊遵鱒樽撙",dia:"嗲",nou:"耨"})}}));
