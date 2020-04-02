// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    passwordconfirm: ""
  },
 
  usernameinput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  passwordinput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  passwordconfirminput: function (e) {
    this.setData({
      passwordconfirm: e.detail.value
    })
  },
  
  signin: function () {
    var that = this;
    //请求的时候需要提交的参数
    var name = that.data.username
    var pwd = that.data.password
    // console.log("js中收到的用户名："+name+"，密码："+pwd)
    //发送ajax请求将用户注册信息传递过去进行注册
    if (that.data.username == "") {
      wx.showModal({
        title: "信息提示",
        content: "用户名不能为空!"
      })
    } else if (that.data.password == "") {
      wx.showModal({
        title: "信息提示",
        content: "请输入密码!"
      })
    } else if (that.data.passwordconfirm == "") {
      wx.showModal({
        title: "信息提示",
        content: "请确认密码!"
      })
    } else if (that.data.passwordconfirm != that.data.password) {
      wx.showModal({
        title: "信息提示",
        content: "两次密码输入不一致!"
      })
    }
    else{
      wx.request({
        url: 'http://192.168.0.102:8080/wx_login/wx_regist/',
        data: {
          name: name,
          pwd: pwd
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: "POST",
        // dataType: "json",
        success: function (res) {
          // console.log("成功")
          console.log(res)

          wx.showToast({
          title: "注册成功",
          content: "注册成功"
          }),

          setTimeout(
            function(){
              wx.navigateBack({
                delta:1
              })
            },2000
          )

          // setTimeout(function () {
          //   wx.switchTab({
          //     url: "/pages/home/home"
          //   }) //要延时执行的代码
          //   }, 1000) //延迟时间 这里是3秒
        },

        fail: function (res) {
          wx: wx.showToast({
            title: '服务器网络错误,请稍后重试',
            icon: 'loading',
            duration: 1500,
          })
        },
        complete: function (res) {
        }
      })
    }
  }

})