// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pk:'',
    author:'罗伯特.阿尔特',
    title:'七个疯子',
    year:'2020-4',
    cover:'https://img1.doubanio.com/view/subject/l/public/s33607648.jpg',
    publisher:'四川文艺出版社',
    pubdates: '',
    fileSrc: "https://marxism.pku.edu.cn/docs/2019-12/20191231165721673467.xls",
    newsList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.pk=options.pk
    var that = this
    wx.request({
      url: 'http://47.102.216.186/wx/search_detail/',
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      data: {
        id: that.data.pk
      },
      success: function (res) {
        console.log(res)
        var json = JSON.parse(res.data)
        console.log(json)
        that.setData({
          newsList: json
        })
        console.log(that.data.newsList[0].fields.title)
      },
      fail: function (err) {
        console.log('调用失败')
        wx.showToast({
          title: '无法获取终端数据！',
          icon: 'none',
          duration: 2000
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleCollect:function(){
    wx.request({
      url: '',
      data: {
        bookid: '',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  handleDownload:function(e){
    console.log(e.currentTarget.dataset.src)
      let bookUrl = e.currentTarget.dataset.src
      // 下载监听进度
      const downloadTask = wx.downloadFile({
        url: bookUrl,
        success: function (res) {
          console.log(res)
          if (res.statusCode === 200) {
            wx.saveFile({
              tempFilePath: res.tempFilePath,
              success: function (res) {
                const savedFilePath = res.savedFilePath
                console.log(savedFilePath)
                wx.showToast({
                  title: '保存文件成功'
                })
              },
              fail: function (res) {
                wx.showToast({
                  title: '保存文件失败'
                })
              }
            })
          }
        }
      })
      downloadTask.onProgressUpdate((res) => {
        if (res.progress === 100) {
          this.setData({
            progress: ''
          })
        } else {
          this.setData({
            progress: res.progress + '%'
          })
        }
      })
  }
})