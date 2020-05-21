// pages/collect/collect.js
const app = getApp()
import request from '../../utils/network.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:'',
    newList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let json =''
    let json1 = ''
    var array =[]
    request({
      url: 'http://47.102.216.186/wx/show_favo/',
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      data: {
        user_id: app.globalData.classifyid,
      }
    }).then(res=>{
        json = JSON.parse(res.data)
        this.setData({
          number:json.length
        })
        for (let i = 0; i < json.length; i++) {
          request({
            url: 'http://47.102.216.186/wx/search_detail/',
            method: 'GET',
            data: {
              id: json[i].fields.books
            }
          }).then(res => {
            json1 = JSON.parse(res.data)
            array[i]=json1[0]
            var item = 'newList[' + i + ']'
            this.setData({
              [item]:json1[0]
            })
            console.log(this.data)
          }).catch(err => {
            console.log(err)
          })
        }
    }).catch(err=>{
      console.log(err)
    })
  },
  toBook: function (e) {
    wx.navigateTo({
      url: '/pages/details/details?pk='+e.currentTarget.dataset.pk,
    })
  }
})