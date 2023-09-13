// pages/my/my.js
const config = require("../../config/config")
const Util = require("../../utils/util")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    source:'',
    currentSource:'',
    sourceData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
      let self = this;
      self.setData({
        userInfo: app.globalData.userInfo,
      })
      let source = wx.getStorageSync('source');
      self.setData({
        source: source,
      })

      Util.request(config.apiSourceEnums, 'GET', {}, function (res) {
        if (res.flag == 1) {
          self.setData({
            sourceData: res.data
          })
          res.data.forEach(element => {
            if(element.value == source){
              self.setData({
                currentSource: element.title
              })
            }
          });
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

  setSource: function(e){
   let source = e.currentTarget.dataset.source;
   wx.setStorageSync('source', source)
   wx.showToast({
    title: '切换成功',
    icon: 'none',
    duration: 1000
  });
  this.setData({
    source: source,
  })
  }
})