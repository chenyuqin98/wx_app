//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //点击头像
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },

//页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  //获取用户信息
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /** 去设置 */
  toSetting() {
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },

  /** 关于 */
  toAbout() {
    wx.navigateTo({
      url: '/pages/about/index',
    })
  },
  /** 我喜欢的影单 */
  toFavMovieList() {
    wx.navigateTo({
      url: '/pages/pUser/pages/favMovieList/index',
    })
  },

  /** 我喜欢的卡片 */
  toFavCards() {
    wx.navigateTo({
      url: '/pages/pUser/pages/favCards/index',
    })
  },

  /** 作出评价 */
  toEvalute() {
    wx.navigateTo({
      url: '/pages/pUser/pages/evaluate/evaluate',
    })
  },
})
