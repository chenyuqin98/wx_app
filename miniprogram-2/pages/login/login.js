// pages/test/test.js

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    no: '',
    pwd: '',
    noinput: false,
    pwdinput: false,
  },

  noinput: function (e) {
    this.setData({ no: e.detail.value });
    this.setData({ noinput: true });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({ disabled: false });
    }

  },
  pwdinput: function (e) {
    this.setData({ pwd: e.detail.value });
    this.setData({ pwdinput: true });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({ disabled: false });
    }
  },
  formSubmit: function (e) {
    wx.showLoading({
      title: '登录中...',
    })
    console.log(e);
    app.globalData.classifyid=e.detail.value.no
    this.setData({ disabled: true });

    wx.request({
      url: 'http://47.102.216.186/wx/login/',	//获取服务器地址，此处为本地地址
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header,转化成query string 
      },
      method: "POST",
      data: {
        username: e.detail.value.no,
        passwd: e.detail.value.pwd
      },
      success: function (res) {
        console.log(res.data);
        if (res.statusCode == 200) {
          if (res.data == '登录成功！') {
            wx.showToast({
              title: res.data,
              icon: 'none',
              duration: 2000
            })
            wx.switchTab({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
              url: "/pages/index/index",
            })
          } else {
            wx.setStorageSync('user', res.data);
            wx.showToast({
              title: res.data,
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              wx.switchTab({
                url: '',
              })
            }, 2000)
          }
        } else {
          wx.showToast({
            title: '服务器出现错误',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    wx.request({
      url: 'http://47.102.216.186/wx/show_user_info/',
      header: { "Content-Type": "applciation/json" },
      method: "GET",
      data: {
        user_id: app.globalData.classifyid
      },
      success: function (res) {
        // console.log(res.data)
        var json = JSON.parse(res.data)
        // console.log(json[0].fields.level)
        app.globalData.level = json[0].fields.level
        app.globalData.exp = json[0].fields.exp
        app.globalData.scores = json[0].fields.scores
        console.log(app.globalData)
      },})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ disabled: false });
    var user = wx.getStorageSync('user');
    if (typeof (user) == 'object' && user.no != '' && user.classid != '') {
      wx.switchTab({
        url: '',
      })
    }
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
    if (this.data.no == '' || this.data.pwd == '') {
      this.setData({ disabled: true });
    } else {
      this.setData({ disabled: false });
    }
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
  toRegister: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  }
})

 

