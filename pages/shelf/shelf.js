// pages/shelf/shelf.js
const config = require("../../config/config")
const Util = require("../../utils/util")
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    shelf: [],
    hasShelf: false,
    shelfFail: false
  },

  onLoad() {
    let self = this;
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    app.userInfoReadyCallback = res => {
      if (res.name) {
        self.setData({
          userInfo: res,
          hasUserInfo: true
        })
        self.getShelf();
      }
    }
    //滑动数据
    this.setData({
      slideButtons: [{
          text: '目录',
        },
        {
          type: 'warn',
          text: '删除',
        }
      ],
    });
  },
  slideButtonTap(e) {
    let id = e.currentTarget.dataset.index;
    let self = this;
    if (e.detail.index == 0) {
      let href = e.currentTarget.dataset.catalog;
      wx.navigateTo({
        url: '/pages/catalog/catalog?href=' + href,
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromSearch', {
            href: href
          })
        }
      })
    }
    if (e.detail.index == 1) {
      wx.showModal({
        title: '提示',
        content: '确认将书移出书架吗？',
        cancelColor: '#e2e2e2',
        success(res) {
          if (res.confirm) {
            Util.request(config.apiNovelRemoveFromShelf, 'GET', {
              id: id
            }, function (res) {
              if (res.flag == 1) {
                self.getShelf();
              }
            })
          }
        }
      })
    }

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
    this.getShelf();
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
  getShelf: function () {
    let self = this;
    wx.showLoading({
      title: '加载中',
    })
    Util.request(
      config.apiNovelShelf,
      'GET',
      [],
      function (res) {
        self.setData({
          shelf: res.data,
          hasShelf: true,
          shelfFail: false
        })
      },
      function (err) {
        self.setData({
          shelf: res.data,
          hasShelf: false,
          shelfFail: true
        })
        getApp().toastNetworkFailure();
      },
      function () {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    )
  },
  toCatalog: function (event) {
    let href = event.currentTarget.dataset.catalog;
    wx.navigateTo({
      url: '/pages/catalog/catalog?href=' + href,
      // success: function (res) {
      //   // 通过eventChannel向被打开页面传送数据
      //   res.eventChannel.emit('acceptDataFromSearch', {
      //     href: href
      //   })
      // }
    })
  },
  toArticle: function (event) {
    let href = event.currentTarget.dataset.article;
    let author = event.currentTarget.dataset.author;
    let title = event.currentTarget.dataset.title;
    let id = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/article/article',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromCatalog', {
          href: href,
          author: author,
          title: title,
        })
      }
    })
  },
  toSearch: function () {
    wx.switchTab({
      url: '/pages/search/search',
    })
  },
  onPullDownRefresh: function () {
    this.getShelf();
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
        })
        this.updateUserInfo(res.userInfo)
        this.getShelf();
      }
    })
  },
  getUserInfo: function () {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.updateUserInfo(res.userInfo)
        this.getShelf();
      }
    })
  },
  updateUserInfo: function (data) {
    var self = this;
    let gender = 'male';
    if (data.gender == 2) {
      gender = 'female';
    }
    Util.request(
      config.apiupdateUser,
      'POST', {
        name: data.nickName,
        avatar: data.avatarUrl,
        gender: gender
      },
      function (res) {
        self.setData({
          hasUserInfo: true
        })
        self.getSystemUserInfo();
      }
    )
  },
  getSystemUserInfo: function () {
    var self = this;
    Util.request(
      config.apiGetCurrentUser,
      'get', {},
      function (res) {
        getApp().globalData.userInfo = res.data
        self.setData({
          userInfo: res.data,
          hasUserInfo: true
        })
      }
    )
  },
})


// getPhoneNumber: function (e) {
//   var self = this;

//   if (e.detail.encryptedData && e.detail.iv) {
//     Util.request(
//       config.apiupdateUserPhone,
//       'POST', {
//         encryptedData: e.detail.encryptedData,
//         iv: e.detail.iv,
//       },
//       function (res) {
//         console.log(res);
//       }
//     )
//   }
// },
// ,