// pages/details/details.js
const app = getApp()
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
    newsList:'',
    type:''
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
          newsList: json,
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

  handleCollect:function(){
    console.log(this.data.newsList[0].fields.type)
    console.log(this.data.pk)
    wx.request({
      url: 'http://47.102.216.186/wx/add_favo/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        user_id: app.globalData.classifyid,
        book_id: this.data.pk, 
        type: this.data.newsList[0].fields.type
      },
      success: function () {
        wx.showToast({
          title: '已收藏',
          icon: 'none',
          duration: 2000,
        })
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