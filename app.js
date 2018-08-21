//app.js
App({
  onLaunch: function () {
    console.log("launch")
    var that = this;
    const updateManager = wx.getUpdateManager()
    console.log(updateManager)
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showToast({
        title: '新版本下载失败',
        icon: 'none'
      })
    })
    wx.login({
      success: function (res) {
        console.log(res.code)
        wx.request({
          url: that.globalData.server + 'User/GetOpenId',
          data: {
            code: res.code
          },
          success: function (res) {
            console.log(res.data)
            var openid = res.data
            that.globalData.openid = openid
            wx.setStorage({
              key: 'openid',
              data: openid,
            })
          }, complete: function (res) {
            wx.request({
              url: that.globalData.server + "User/IsExistent",
              data: {
                wechatOpenId: that.globalData.openid
              }
              /*,
              complete: function (res) {
                console.log("app存在校验")
                console.log(res.data.data)
                if (res.data.data.isFresher == "true") {
                  wx.showModal({
                    title: '提示',
                    content: '请先登录',
                    showCancel: false,
                    complete: function (res) {
                      wx.redirectTo({
                        url: '../../pages/login/login',
                      })
                    }
                  })
                } else {
                  that.globalData.isFresher = false
                }
              }
              */
            })
          }
        })
      }
    })
  },
  onHide: function () {
    console.log("i'm going to sleep")
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  onLoad: function () {
    console.log("onLoad")
  },
  onShow: function () {

  },
  globalData: {
    userInfo: null,
    isFresher: true,
    history: [],
    openid: '',
    subjects: [],
    indexSubjects: [],
    purePhone: '',
    server: 'https://afd.antcar.net.cn/'
  }
})