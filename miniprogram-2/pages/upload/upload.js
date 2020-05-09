// pages/upload/upload.js
const app = getApp()
Page({
  data: {
    path: '',
    filename: '',
    title:'',
    author:'',
    print:'',
    date:'',
    website:'',
    intro:'',
    id:'',
    user_id:'',
    type:'',
    imagesList:''

  },
  onLoad: function (options) {
    console.log(app.globalData.classifyid)
    this.setData({
      id: app.globalData.classifyid,
      user_id: app.globalData.classifyid
    })

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  imageChoose: function () {
    var that = this;
    let imagesList = [];
    let maxSize = 3840*2160;
    let maxLength = 1;
    let flag = true;
    wx.chooseImage({
      count: 1, //最多可以选择的图片总数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 500
        })
        for (let i = 0; i < res.tempFiles.length; i++) {
          if (res.tempFiles[i].size > maxSize) {
            flag = false;
            console.log(111)
            wx.showModal({
              content: '图片太大，不允许上传',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
          }
        }
        if (res.tempFiles.length > maxLength) {
          console.log('222');
          wx.showModal({
            content: '最多能上传' + maxLength + '张图片',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('确定');
              }
            }
          })
        }
        if (flag == true && res.tempFiles.length <= maxLength) {
          that.setData({
            imagesList: res.tempFilePaths
          })
        }
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  fileChoose:function(){
    wx.chooseMessageFile({
      count: 1,     //能选择文件的数量
      type: 'file',   //能选择文件的类型,这里只允许上传文件.
      success:(res)=> {
        var size = res.tempFiles[0].size;
        console.log(res)
        if (size > 4194304) {
          wx.showToast({
            title: '文件大小不能超过4MB,格式必须为epub！',
            icon: "none",
            duration: 2000,
            mask: true
          })
        } else {
          this.setData({
            path: res.tempFiles[0].path, //将文件的路径保存在页面的变量上,方便 wx.uploadFile调用
            filename: res.tempFiles[0].name              //渲染到wxml方便用户知道自己选择了什么文件
          })
        }
      }
    })
  },
  handleSubmit:function(){
    console.log(this.data)
    wx.request({
      url: 'http://47.102.216.186/wx/user_upload/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: {
        user_id: app.globalData.classifyid,
        title: this.data.title,
        author: this.data.author,
        publisher: this.data.print,
        year: this.data.date,
        website: this.data.website,
        // ISBN: this.data.ISBN,
        intro: this.data.intro,
        // user_id:this.data.id,
        cover:this.data.imagesList,
        url:this.data.path,
        type:this.data.type
      },
      success: function () {
        wx.showToast({
          title: '上传成功',
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
  handleInput1:function(e){
    console.log(e.detail.value)
    let that = this;
    that.setData({
      title: e.detail.value
    })
  },
  handleInput2: function (e) {
    console.log(e.detail.value)
    let that = this;
    that.setData({
      author: e.detail.value
    })
  },
  handleInput3: function (e) {
    console.log(e.detail.value)
    let that = this;
    that.setData({
      print: e.detail.value
    })
  },
  handleInput4: function (e) {
    console.log(e.detail.value)
    let that = this;
    that.setData({
      date: e.detail.value
    })
  },
  handleInput5: function (e) {
    console.log(e.detail.value)
    let that = this;
    that.setData({
      ISBN: e.detail.value
    })
  },
  handleInput6: function (e) {
    console.log(e.detail.value)
    let that = this;
    that.setData({
      type: e.detail.value
    })
  },
  handleInput7: function (e) {
    console.log(e.detail.value)
    let that = this;
    that.setData({
      intro: e.detail.value
    })
  },
})