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
    book_info: [],
    author: '',
    title: '',
    current_title: '',
    next: '',
    preview: null,
    ErrorMsg: '',
    Error: false,
    windowHeight: 0,
    loadingFlag: 0,
    menudisplay: 'none',
    is_night: false,
    night_back: '#2b2b2b',
    night_color: '#ffffff',
    day_back: '#f6f6f6',
    day_color: '#000000',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    var self = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromCatalog', function (data) {
      self.setData({
        next: data.href,
        author: data.author,
        title: data.title,
      })
    })
    let article_night = wx.getStorageSync('article_night');
    this.setData({
      is_night: article_night
    })
    this.setArticleModel();
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
    var self = this;
    //获取书籍的本地信息
    Util.request(
      config.apiNovelInfo,
      'GET', {
        title: self.data.title,
        author: self.data.author,
      },
      function (res) {
        if (res.flag == 1) {
          getApp().globalData.book_id = res.data.id;
          self.setData({
            book_info: res.data
          })
        }
      },
      function (res) {
        getApp().toastNetworkFailure();
      },
      function (res) {
        self.setData({
          loadingFlag: 0,
        })
      }
    )

    wx.showLoading({
      title: '加载中',
    })
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
    wx.showLoading({
      title: '加载上一章节',
    })
    this.loading_pre();
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
  onReachBottom: function () {
    this.loading();
  },
  loading_pre: function () {
    var self = this;
    if (self.data.loadingFlag == 1) {
      return;
    }
    self.setData({
      loadingFlag: 1,
    })
    Util.request(
      config.apiNovelArticle,
      'GET', {
        article_url: self.data.preview,
        title: self.data.title,
        author: self.data.author,
      },
      function (res) {
        if (res.flag == 1) {
          self.data.article.unshift.apply(self.data.article, res.data.article);
          self.setData({
            article: self.data.article,
            article_url: self.data.next,
            preview: res.data.preview,
            current_title: res.data.c_title,
            Error: false
          })
          wx.setNavigationBarTitle({
            title: res.data.article[0].text,

          })
        } else {
          self.setData({
            Error: true,
            ErrorMsg: res.msg
          })
        }
      },
      function (res) {
        getApp().toastNetworkFailure();
      },
      function (res) {
        self.setData({
          loadingFlag: 0,
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    )
  },
  loading: function () {
    var self = this;
    if (self.data.loadingFlag == 1) {
      return;
    }
    self.setData({
      loadingFlag: 1,
    })
    Util.request(
      config.apiNovelArticle,
      'GET', {
        article_url: self.data.next,
        title: self.data.title,
        c_title: self.data.c_title,
        author: self.data.author,
      },
      function (res) {
        if (res.flag == 1) {

          self.data.article.push.apply(self.data.article, res.data.article);
          self.setData({
            article: self.data.article,
            article_url: self.data.next,
            next: res.data.next,
            current_title: res.data.c_title,
            Error: false
          })
          if (!self.data.preview) {
            self.setData({
              preview: res.data.preview
            })
          }
          wx.setNavigationBarTitle({
            title: res.data.article[0].text,
          })
        } else {
          self.setData({
            Error: true,
            ErrorMsg: res.msg
          })
        }
      },
      function (res) {
        getApp().toastNetworkFailure();
      },
      function (res) {
        self.setData({
          loadingFlag: 0,
        })
        wx.hideLoading()
      }
    )
  },
  showmenu: function () {
    this.setData({
      menudisplay: 'flex',
    })
  },
  closemenu: function () {
    this.setData({
      menudisplay: 'none',
    })
  },
  backtocatalog: function () {
    let href = this.data.book_info.url;
    let c_title = this.data.current_title;
    let book_id = getApp().globalData.book_id;
    wx.redirectTo({
      url: '/pages/catalog/catalog?href=' + href + '&book_id=' + book_id + '&c_title=' + c_title,
      // success: function (res) {
      //   // 通过eventChannel向被打开页面传送数据
      //   res.eventChannel.emit('acceptDataFromSearch', {
      //     href: href,
      //     book_id: book_id,
      //     title: title,
      //   })
      // }
    })
  },
  backtoshelf: function () {
    wx.switchTab({
      url: '/pages/shelf/shelf',
    })
  },
  changeModel: function () {
    this.setData({
      is_night: !this.data.is_night,
    });
    this.setArticleModel();
    wx.setStorage({
      key: "article_night",
      data: this.data.is_night
    })
  },
  setArticleModel: function () {
    if (this.data.is_night) {
      wx.setNavigationBarColor({
        frontColor: this.data.night_color,
        backgroundColor: this.data.night_back,
        animation: {
          duration: 200,
          timingFunc: 'easeIn'
        }
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: this.data.day_color,
        backgroundColor: this.data.day_back,
        animation: {
          duration: 200,
          timingFunc: 'easeIn'
        }
      })
    }
  },
})