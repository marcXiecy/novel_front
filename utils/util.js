const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

let request = function (url, method, data, success, fail = () => {}, complete = () => {}) {
  let cookie = wx.getStorageSync('cookie');
  let header = {
    'Content-Type': 'application/json',
    'Cookie': cookie
  };
  wx.request({
    url: url,
    method: method,
    data: data,
    header: header,
    success: res => {
      if (res.header) {
        if ('Set-Cookie' in res.header) {
          wx.setStorageSync('cookie', res.header['Set-Cookie']);
        } else if ('set-cookie' in res.header) {
          wx.setStorageSync('cookie', res.header['set-cookie']);
        }
      }
      success && success(res.data);
    },
    fail: res => {
      getApp().toastNetworkFailure();
      fail && fail(res);
    },
    complete: () => {
      setTimeout(function () {
        wx.hideLoading()
      }, 500)
      complete && complete();
    }
  })
}

module.exports = {
  formatTime,
  request: request,
}
