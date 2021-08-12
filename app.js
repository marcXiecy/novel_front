// app.js
import Config from './config/config';
const Util = require("./utils/util")
App({
  onLaunch() {
    let source = wx.getStorageSync('source');

    if(!source){
      wx.setStorageSync('source', 'xbiquge')
    }
    // 登录
    let self = this;
    wx.checkSession({
      success: res => {
        Util.request(
          Config.apiCheckSession,
          'GET',
          [],
          function (res) {
            if (res.flag == 1) {
              if (res.data.name) {
                self.globalData.userInfo = res.data;
                self.globalData.userInfo_set = true;
                if (self.userInfoReadyCallback) {
                  self.userInfoReadyCallback(res.data)
                }
              }
            } else {
              self.login();

            }
          },
          function (err) {
            getApp().toastNetworkFailure();
          },
          function () {}
        )
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        self.login();
      }
    })
  },
  onShow(options) {},
  onHide() {
    // Do something when hide.
  },
  onError(msg) {
    console.log(msg)
  },
login(){
  let self = this
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      Util.request(
        Config.apiCode2Session + '/' + res.code,
        'GET',
        [],
        function (res) {
          if (res.flag == 1) {
            if (res.data.name) {
              self.globalData.userInfo = res.data;
              self.globalData.userInfo_set = true;
              if (self.userInfoReadyCallback) {
                self.userInfoReadyCallback(res.data)
              }
            }
          } else {
            wx.showToast({
              title: '请点击左上角登录',
              icon: 'none',
              duration: 2000
            });
          }
        },
        function (err) {
          getApp().toastNetworkFailure();
        },
        function () {}
      )
    }
  })
},
  globalData: {
    userInfo: null,
    userInfo_set: false,
    book_id: null
  }
})