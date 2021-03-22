const config = require("../../config/config");
import Util from "../../utils/util";
// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article_url: '',
    article: [],
    book_info:[],
    author:'',
    title:'',
    next: '',
    preview: '',
    ErrorMsg: '',
    Error: false,
    windowHeight: 0,
    loadingFlag:0,
    menudisplay:'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f5efcf',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    var self = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromCatalog', function(data) {
      self.setData({
        next: data.href,
        author: data.author,
        title: data.title,
      })
    })
    //获取书籍的本地信息
    Util.request(
      config.apiNovelInfo,
      'GET',
    {
       title: self.data.title,
       author: self.data.author,
     },
     function(res) {
       if (res.flag == 1) {
        self.setData({
          book_info: res.data
         })
       }
     },
     function(res){
       getApp().toastNetworkFailure();
     },
     function(res) {
       self.setData({
         loadingFlag: 0,
       })
     }
   )


    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          windowHeight: res.windowHeight
        });

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loading();
   
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
  onReachBottom: function(){
    this.loading();
  },
  loading: function () {
    var self = this;
    if(self.data.loadingFlag == 1){
      return;
    }
    self.setData({
      loadingFlag: 1,
    })
    Util.request(
       config.apiNovelArticle,
       'GET',
     {
        article_url: self.data.next,
        title: self.data.title,
        author: self.data.author,
      },
      function(res) {
        if (res.flag == 1) {

          self.data.article.push.apply(self.data.article,res.data.article);
          self.setData({
            article: self.data.article,
            article_url: self.data.next,
            next: res.data.next,
            preview: res.data.preview,
            Error: false
          })
          wx.setNavigationBarTitle({
            title: res.data.article[0].text
          })
        } else {
          self.setData({
            Error: true,
            ErrorMsg: res.msg
          })
        }
      },
      function(res){
        getApp().toastNetworkFailure();
      },
      function(res) {
        self.setData({
          loadingFlag: 0,
        })
      }
    )
  },showmenu:function (){
    this.setData({
      menudisplay: 'flex',
    })
  },closemenu:function(){
    this.setData({
      menudisplay: 'none',
    })
  },
  backtocatalog: function(){
    let href = this.data.book_info.url;
    wx.navigateTo({
      url: '/pages/catalog/catalog',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromSearch', { href: href })
      }
    })
  },
  backtoshelf: function(){
    wx.switchTab({
      url: '/pages/shelf/shelf',
    })
  }
})