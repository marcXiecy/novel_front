const config = require("../../config/config");
import Util from "../../utils/util";
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
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
    Util.request(config.apiNovelSearch,'GET',
      {
        keyword: self.data.keyword,
      },
      function(res) {
        if (res.flag == 1) {
          self.setData({
            searchResult: res.data,
            searchError: false
          })
        } else {
          self.setData({
            searchError: true,
            searchErrorMsg: res.msg
          })
        }

      },
      function(res) {
        getApp().toastNetworkFailure();

      },
      function(res){
        wx.hideLoading()
      }
    )
  
  },
  toCatalog: function (event) {
    let href = event.currentTarget.dataset.href;
    wx.navigateTo({
      url: '/pages/catalog/catalog?href=' + href,
      // success: function(res) {
      //   // 通过eventChannel向被打开页面传送数据
      //   res.eventChannel.emit('acceptDataFromSearch', { href: href })
      // }
    })
  },
  delete_search:function(){
    this.setData({
      keyword:''
    })
  }
})