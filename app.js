// app.js
import Config from './config/config';
const Util = require("./utils/util")
App({
  onLaunch() {
    // 登录
    let self = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        Util.request(
          Config.apiCode2Session + '/' + res.code,
          'GET',
          [],
          function (res) {

            if (res.flag == 1) {
              self.globalData.userInfo = res.data;
            } else {
              wx.showToast({
                title: '网络状态不佳',
                icon: 'error',
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
  onShow(options) {
    let self = this
    // Do something when show.
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.updateUserInfo(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onHide() {
    // Do something when hide.
  },
  onError(msg) {
    console.log(msg)
  },
  updateUserInfo: function (data) {
    var self = this;
    let gender = 'male';
    if (data.gender == 2) {
      gender = 'female';
    }
    Util.request(
      Config.apiupdateUser,
      'POST', {
        name: data.nickName,
        avatar: data.avatarUrl,
        gender: gender
      },
      function (res) {

      }
    )
  },
  getUserInfo: function () {
    var self = this;
    Util.request(
      Config.apiGetCurrentUser,
      'get', {},
      function (res) {
        self.globalData.userInfo = res.data
      }
    )
  },
  globalData: {
    userInfo: null
  }
})