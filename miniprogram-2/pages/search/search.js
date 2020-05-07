// pages/search/search.js

const count = 20;  // 每页加载数据数目
Page({

  /** 页面的初始数据 */
  data: {
    inputVal: "",
    history: [],
    hot: ['陆犯焉识', '民族与民族主义', '微观经济学', '大象',  '平凡的世界','教父', '嫌疑人X的献身'],
    newsList:''
  },

  //搜索
  Search: function () {
    var that = this;
    this.setHistory()
    this.setData({
      loading: true
    })
    wx.showLoading({
      title: 'loading...',
    })
    console.log(this.data.inputVal)
    wx.request({
      url: 'http://47.102.216.186/wx/search/',//请求地址
      header: {
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      data:{
        q: this.data.inputVal
      },
      success: function (res) {
        console.log(res)
        if(res.data=="[]"){
          wx.showToast({
            title: '无法找到该书籍',
            icon: 'none',
            duration: 3000,
          })
          }else {
            console.log(res.data)
          var json = JSON.parse(res.data)
          console.log(json)
          wx.hideLoading()
          that.setData({
            newsList: json
          })
          console.log(json)
          }       
      },
      fail: function (err) {
        console.log('调用失败')
        wx.showToast({
          title: '搜索失败！',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },


  /** 生命周期函数--监听页面加载 */
  onLoad(options) {
    const history = wx.getStorageSync('search_history') || []
    this.setData({
      history,
    })
  },

  clearInput() {
    this.setData({
      inputVal: "",
      result: false
    });
  },

  inputTyping(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  /** 用户确认搜索 */
  inputConfirm() {
    const that = this;
    const { inputVal } = this.data;
    if(inputVal!=''){
      this.setData({
        result: false
      }, () => {
        that.Search()
      })
    } 
  },
  /** 快速搜索 */
  quickSearch(e) {
    const { keywords } = e.currentTarget.dataset
    console.log(keywords)
    this.setData({
      inputVal: keywords
    }, this.Search
  )},

  /** 取消返回 */
  goBack() {
    wx.navigateBack()
  },

  /** 搜索历史存储 */
  setHistory() {
    let { history, inputVal } = this.data
    let arr = history.slice(0, 8)
    arr.unshift(inputVal)
    if(inputVal!=''){
      history =[...(new Set(arr))]
      this.setData({
        history,
      })
      wx.setStorage({
        key: 'search_history',
        data: history,
      })
    } 
  },

  clearHistory() {
    wx.removeStorage({ key: 'search_history' })
    this.setData({
      history: [],
    })
  },
  toBook:function(e){
    console.log(e.currentTarget.dataset.pk)
    var id = e.currentTarget.dataset.pk
    wx.navigateTo({
      url: '/pages/details/details?pk='+id,
    })
  }
})