const config = require("../../config/config");
import Util from "../../utils/util";
// pages/catalog/catalog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catalog_url: '',
    shelf: '',
    book_id: '',
    inShelf: false,
    catalogs: [],
    ErrorMsg: '',
    Error: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    const eventChannel = this.getOpenerEventChannel()
    // getApp().globalData.book_id = options.book_id
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromSearch', function (data) {
       getApp().globalData.book_id = data.book_id
      self.setData({
        catalog_url: data.href,
        book_id: data.book_id,
      })
      Util.request(config.apiNovelCheckInShelf,
        'POST', {
          url: self.data.catalog_url
        },
        function (res) {
          if (res.flag == 1) {
            self.setData({
              shelf: res.data,
              inShelf: true
            })
          }
        })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: config.apiNovelCatalog,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        catalog_url: self.data.catalog_url,
        book_id: getApp().globalData.book_id,
      },
      success: res => {
        if (res.data.flag == 1) {
          getApp().globalData.book_id = res.data.book_id;
          self.setData({
            catalogs: res.data.data,
            Error: false
          })
          self.saveCallback(res)
    
        } else {
          self.setData({
            Error: true,
            ErrorMsg: res.data.msg
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
    this.saveCallback = res => {
      this.save();
    }

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
  save: function(){
    let self = this;
    wx.request({
      url: config.apiNovelSaveCatalog,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        url: self.data.catalog_url,
        book_id: getApp().globalData.book_id,
      },
      success: res => {

      },
    })
  },
  read: function (event) {
    let href = event.currentTarget.dataset.href;
    let author = event.currentTarget.dataset.author;
    let title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/article/article',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromCatalog', {
          href: href,
          author: author,
          title: title
        })
      }
    })
  },
  addToShelf: function () {
    let self = this;
    Util.request(config.apiNovelAddToShelf, 'GET', {
        book_id: getApp().globalData.book_id,
      }, function (res) {
        if (res.flag == 1) {
          self.setData({
            shelf: res.data,
            inShelf: true
          })
        } else {
          wx.showToast({
            title: '加入失败',
          })
        }
      },
      function (err) {
        wx.showToast({
          title: '加入失败',
        })
      }
    )

  },
  removeFromShelf: function () {
    let self = this;
    wx.showModal({
      title: '提示',
      content: '确认将书移出书架吗？',
      cancelColor: '#e2e2e2',
      success(res) {
        if (res.confirm) {

          Util.request(config.apiNovelRemoveFromShelf, 'GET', {
            id: self.data.shelf.id
          }, function (res) {
            if (res.flag == 1) {
              self.setData({
                shelf: {},
                inShelf: false
              })
            }
          })
        }
      }
    })
  }
})