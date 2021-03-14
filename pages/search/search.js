const config = require("../../config/config");

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '圣墟',
    searchResult: [],
    searchError: false,
    searchErrorMsg:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //搜索
  search: function () {
    var self = this;
    self.setData({
      searchResult: [],
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: config.apiNovelSearch,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        keyword: self.data.keyword,
      },
      success: res => {
        if (res.data.flag == 1) {
          self.setData({
            searchResult: res.data.data,
            searchError: false
          })
        } else {
          self.setData({
            searchError: true,
            searchErrorMsg: res.data.msg
          })
        }

      },
      fail: res => {
        getApp().toastNetworkFailure();

      },
      complete: () => {
        wx.hideLoading()
      }
    })
  
  },
  toCatalog: function (event) {
    let href = event.currentTarget.dataset.href;
    wx.navigateTo({
      url: '/pages/catalog/catalog',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromSearch', { href: href })
      }
    })
  },
})