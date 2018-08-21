var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
const app = getApp()
Page({
  data: {
    stuNum: '',
    stuName: ''
  },

  //获取手机号码
  getPhoneNumber: function (e) {
    var that = this
    console.log(e)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权'
      })
    } else {
      if (that.data.stuNum.length == 0 || that.data.stuName.length == 0) {
        wx.showModal({
          title: '提示',
          content: '用户名和密码不能为空',
        })
      } else {
        wx.request({
          url: app.globalData.server + 'User/Validate',
          data: {
            stuNum: that.data.stuNum,
            stuName: that.data.stuName
          },
          success: function (res) {
            if (res.data.data.validate == "false") {
              //校验失败
              wx.showToast({
                title: '学号和姓名不匹配',
                icon: 'none',
                duration: 1000
              })
            } else {
              //校验成功
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1000
              })
              wx.login({
                success: function (res) {
                  // 用户信息持久化
                  var code = res.code
                  wx.request({
                    url: app.globalData.server + 'User/UserInfoPersistence',
                    data: {
                      code: code, encryptedData: e.detail.encryptedData,
                      iv: e.detail.iv,
                      name: that.data.stuName,
                      stuNum: that.data.stuNum
                    },
                    success: function (res) {
                      // 持久化成功后 将用户全局信息isFresher置为false
                      app.globalData.isFresher = false
                      console.log(res)
                      if (res.data.data.userInfoPersistence == 'true') {
                        //获取登录红包金额
                        wx.request({
                          url: app.globalData.server + "User/FirstLogin",
                          data: {
                            openId: app.globalData.openid
                          },
                          success: function (res) {
                            console.log("调用FirstLogin成功")
                            wx.setTabBarBadge({
                              index: 2,
                              text: '¥',
                            })
                            console.log(res.data)
                            var money = res.data.msg
                            var time = setTimeout(function (res) {
                              wx.redirectTo({
                                url: '../../pages/money/money?via=' + 'login' + '&money=' + money,
                              })
                            }, 1000)
                          }
                        })
                      } else {
                        wx.showToast({
                          title: res.data.msg,
                          icon: "none"
                        })
                        wx.switchTab({
                          url: '../home/home',
                        })
                      }
                    }, fail: function (res) {
                      wx.showToast({
                        title: '服务器错误',
                        icon: "none"
                      })
                    }
                  })
                }, fail: function (res) {
                  wx.showToast({
                    title: '登陆失败',
                    icon: "none"
                  })
                }
              })
            }
          }
        })
      }
    }
  },

  // 获取输入账号 
  numInput: function (e) {
    this.setData({
      stuNum: e.detail.value
    })
  },

  // 获取输入密码 
  nameInput: function (e) {
    this.setData({
      stuName: e.detail.value
    })
  },
  onShow: function () {
    if (!app.globalData.isFresher) {
      wx.showToast({
        title: '云端自动登录成功',
        icon: 'none'
      })
      var timeForLogin = setTimeout(function (res) {
       wx.switchTab({
         url: '../home/home',
       })
      }, 1000)
    }else{
      wx.login({
        success: function (res) {
          console.log(res.code)
          wx.request({
            url: app.globalData.server + 'User/GetOpenId',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res.data)
              var openid = res.data
              app.globalData.openid = openid
              wx.setStorage({
                key: 'openid',
                data: openid,
              })
            }, complete: function (res) {
              wx.request({
                url: app.globalData.server + "User/IsExistent",
                data: {
                  wechatOpenId: app.globalData.openid
                },
                success: function (res) {
                  console.log("login页面存在校验")
                  console.log(res.data.data)
                  if (res.data.data.isFresher == 'true') {
                   
                  } else {
                    app.globalData.isFresher = false
                    wx.showToast({
                      title: '云端写入成功',
                      icon: 'none'
                    })
                    var timeForLogin = setTimeout(function (res) {
                      wx.switchTab({
                        url: '../home/home',
                      })
                    }, 1000)
                  }
                }
              })
            }
          })
        }
      })
    }
  },

  // 登录 
  login: function () {

  }
}) 