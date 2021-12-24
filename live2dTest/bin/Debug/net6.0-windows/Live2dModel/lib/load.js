// 通过读取远程配置文件，进行设置默认信息
function getInitConfig(callback) {
  fetch(`https://cdn.jsdelivr.net/gh/TheSecondAkari/vscode-live2d@latest/live2dExtraConfig.json`, {
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
    },
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // *client, no-referrer
  })
    .then(response => response.json())
    .then(function (myJson) {
      callback && callback(myJson)
    })
    .catch(e => {
      callback && callback()
    });
}

var 引流 = [
  "https://space.bilibili.com/672328094",
  "https://space.bilibili.com/672346917",
  "https://space.bilibili.com/672353429",
  "https://space.bilibili.com/672342685",
  "https://space.bilibili.com/351609538",
  "https://www.bilibili.com/video/BV1FZ4y1F7HH",
  "https://www.bilibili.com/video/BV1FX4y1g7u8",
  "https://www.bilibili.com/video/BV1aK4y1P7Cg",
  "https://www.bilibili.com/video/BV17A411V7Uh",
  "https://www.bilibili.com/video/BV1AV411v7er",
  "https://www.bilibili.com/video/BV1564y1173Q",
  "https://www.bilibili.com/video/BV1MX4y1N75X",
  "https://www.bilibili.com/video/BV17h411U71w",
  "https://www.bilibili.com/video/BV1ry4y1Y71t",
  "https://www.bilibili.com/video/BV1Sy4y1n7c4",
  "https://www.bilibili.com/video/BV1PN411X7QW",
  "https://www.bilibili.com/video/BV1Dp4y1H7iB",
  "https://www.bilibili.com/video/BV1bi4y1P7Eh",
  "https://www.bilibili.com/video/BV1vQ4y1Z7C2",
  "https://www.bilibili.com/video/BV1oU4y1h7Sc"
]

const initConfig = {
  mode: "fixed",
  hidden: false,
  content: {
    link: 引流,
    welcome: ["Hi!"],
    touch: "",
    home: ["这里有很多好看的", "想查看更多A-Soul的信息吗？"],
    skin: [["诶，想看看其他团员吗？", "嘉晚饭yyds", "嘉晚饭是真的"], "替换后入场文本"],
    background: ["要切换背景图吗？", "这次切背景图会切到我吗？", "换,换一下背景图也不是不可以啦",],
  },
  model: [
    "./models/Diana/Diana.model3.json",
    "./models/Ava/Ava.model3.json",
  ],
  tips: true,
  onModelLoad: onModelLoad
}

function 加载圣·嘉然() {
  // ExtraInfo 是远程维护的配置信息
  getInitConfig((ExtraInfo) => {
    if (ExtraInfo) {
      const 溜冰场 = ExtraInfo["溜冰场"];
      if (Array.isArray(溜冰场) && 溜冰场.length > 0) {
        initConfig.content.link = 溜冰场;
      }
    }
    
    pio_reference = new Paul_Pio(initConfig)

    pio_alignment = "right"

    // Then apply style
    pio_refresh_style()
  })
}

function reSizeLive2d() {
  const defaultWidth = 1000; // 默认宽度280px , zoom = 1
  const defaultHeight = 1000
  const container = document.getElementById("pio-container");
  if (container)
    container.style.zoom = Math.round(defaultHeight / defaultWidth * 100) / 100;
}

window.addEventListener("resize", reSizeLive2d);

function onModelLoad(model) {
  const container = document.getElementById("pio-container")
  reSizeLive2d(); // 初始加载
  const canvas = document.getElementById("pio")
  const modelNmae = model.internalModel.settings.name
  const coreModel = model.internalModel.coreModel
  const motionManager = model.internalModel.motionManager

  let touchList = [
    {
      text: "点击展示文本1",
      motion: "Idle"
    },
    {
      text: "点击展示文本2",
      motion: "Idle"
    }
  ]

  function playAction(action) {
    action.text && pio_reference.modules.render(action.text)
    action.motion && pio_reference.model.motion(action.motion)

    if (action.from && action.to) {
      Object.keys(action.from).forEach(id => {
        const hidePartIndex = coreModel._partIds.indexOf(id)
        TweenLite.to(coreModel._partOpacities, 0.6, { [hidePartIndex]: action.from[id] });
        // coreModel._partOpacities[hidePartIndex] = action.from[id]
      })

      motionManager.once("motionFinish", (data) => {
        Object.keys(action.to).forEach(id => {
          const hidePartIndex = coreModel._partIds.indexOf(id)
          TweenLite.to(coreModel._partOpacities, 0.6, { [hidePartIndex]: action.to[id] });
          // coreModel._partOpacities[hidePartIndex] = action.to[id]
        })
      })
    }
  }

  window.live2d_playAction = playAction; // 挂载到window上，方便调用

  canvas.onclick = function () {
    if (motionManager.state.currentGroup !== "Idle") return

    const action = pio_reference.modules.rand(touchList)
    playAction(action)
  }

  if (modelNmae === "Diana") {
    container.dataset.model = "Diana"
    initConfig.content.skin[1] = ["我是吃货担当 嘉然 Diana~"]
    playAction({ motion: "Tap抱阿草-左手" })

    touchList = [
      {
        text: "嘉心糖屁用没有",
        motion: "Tap生气 -领结"
      },
      {
        text: "有人急了，但我不说是谁~",
        motion: "Tap= =  左蝴蝶结"
      },
      {
        text: "呜呜...呜呜呜....",
        motion: "Tap哭 -眼角"
      },
      {
        text: "想然然了没有呀~",
        motion: "Tap害羞-中间刘海"
      },
      {
        text: "阿草好软呀~",
        motion: "Tap抱阿草-左手"
      },
      {
        text: "不要再戳啦！好痒！",
        motion: "Tap摇头- 身体"
      },
      {
        text: "嗷呜~~~",
        motion: "Tap耳朵-发卡"
      },
      {
        text: "zzZ。。。",
        motion: "Leave"
      },
      {
        text: "哇！好吃的！",
        motion: "Tap右头发"
      },
    ]

  } else if (modelNmae === "Ava") {
    container.dataset.model = "Ava"
    initConfig.content.skin[1] = ["我是<s>拉胯</s>Gamer担当 向晚 AvA~"]
    playAction({
      motion: "Tap左眼",
      from: {
        "Part15": 1
      },
      to: {
        "Part15": 0
      }
    })

    touchList = [
      {
        text: "水母 水母~ 只是普通的生物",
        motion: "Tap右手"
      },
      {
        text: "可爱的鸽子鸽子~我喜欢你~",
        motion: "Tap胸口项链",
        from: {
          "Part12": 1
        },
        to: {
          "Part12": 0
        }
      },
      {
        text: "好...好兄弟之间喜欢很正常啦",
        motion: "Tap中间刘海",
        from: {
          "Part12": 1
        },
        to: {
          "Part12": 0
        }
      },
      {
        text: "啊啊啊！怎么推流辣",
        motion: "Tap右眼",
        from: {
          "Part16": 1
        },
        to: {
          "Part16": 0
        }
      },
      {
        text: "你怎么老摸我，我的身体是不是可有魅力",
        motion: "Tap嘴"
      },
      {
        text: "AAAAAAAAAAvvvvAAA 向晚！",
        motion: "Tap左眼",
        from: {
          "Part15": 1
        },
        to: {
          "Part15": 0
        }
      }
    ]
    canvas.width = model.width * 1.2
    const hideParts = [
      "Part5", // 晕
      "neko", // 喵喵拳
      "game", // 左手游戏手柄
      "Part15", // 墨镜
      // "Part21", // 右手小臂
      // "Part22", // 左手垂下
      "gitar", // 吉他 ！和 上面 part21 22 冲突
      "Part", // 双手抱拳
      "Part16", // 惊讶特效
      "Part12" // 小心心
    ]
    const hidePartsIndex = hideParts.map(id => coreModel._partIds.indexOf(id))
    hidePartsIndex.forEach(idx => {
      coreModel._partOpacities[idx] = 0
    })
  }
}


var pio_reference
window.onload = 加载圣·嘉然
