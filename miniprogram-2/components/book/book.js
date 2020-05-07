// components/book/book.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookname:{
      type:String,
      value: "无规则游戏：阿富汗屡被中断的历史"
    },
    picture:{
      type:String,
      value: "https://img9.doubanio.com/view/subject/s/public/s29923214.jpg"
    },
    author:{
      type:String,
      value: "塔米姆·安萨利"
    },
    isbn:{
      type:String,
      value:"9787213088308"
    },
    introduction:{
      type:String,
      value:"这是一个被自己的恶魔破坏的国家，这是一个被反复争夺和统治的国家。塔米姆·安萨利通过阿富汗人的视角来解读祖国的历史，他驳斥了“帝国坟场”的论断，讲述了长期以来外部世界从未完全了解的阿富汗内部斗争，剖析了现代入侵者屡战屡败的致命原因。在这里，外国的干涉和入侵不是主旋律，它们只是扰乱了阿富汗的发展，阿富汗人有自己的故事，这是与所有入侵完全不同的：高高在上的私权力、根深蒂固的部落文化、走火入魔的极端思想、错综复杂的地缘政治……塔米姆·安萨利带领我们走进一个“真实的阿富汗”。本书叙事流畅，为我们了解阿富汗这个长期处于国际话语权之外的国家提供了启示性的见解。"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCollected:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    Book_download:function(){
      wx.downloadFile({
        url: 'https://marxism.pku.edu.cn/docs/2020-01/20200117160044036149.pdf', //仅为示例，并非真实的资源
        success(res) {
          const filePath = res.tempFilePath;
          console.log(res);
          wx.showToast({
            title: '下载成功'
          })
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            wx.openDocument({
              filePath: filePath,
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          }
        }
      })
    },
    Book_collect:function(){
      let isCollected = !this.data.isCollected
      this.setData({
        isCollected:isCollected
      })
      //提示用户
      wx.showToast({
        title: isCollected ? '收藏成功' : '取消收藏',
        icon: 'success'
      })
    }
  }
})
