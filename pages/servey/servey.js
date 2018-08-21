// pages/servey/servey.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noAnswered: true,
    btnInfo: "请求中...",
    // 控制欢迎答题页面的显示
    fresher: true,
    singleChoise: '',
    isComplete: false,
    answers: ["", "", "", "", "", "", "", "", ""],
    now: 0,
    percent: 1 / 9 * 100,
    questionContent: []
  },
  beginServey: function (res) {
    this.setData({
      fresher: false
    })
  },
  answerClicked: function (res) {
    console.log(res)
    var that = this
    var answers = that.data.answers
    answers[res.currentTarget.id] = res.target.id
    that.setData({
      answers: answers
    })
    var obj = { "target": { "id": "1" } }
    var timer = setTimeout(function () {
      that.arrow(obj);
    }, 600);

  },
  arrow: function (res) {
    var that = this
    console.log(that.data.answers)
    switch (res.target.id) {
      case '0':
        //上一题
        if (that.data.now == 0) {
          //已经不能上一题
          wx.showToast({
            title: '已是第一题',
            icon: "none"
          })
          break;
        }
        that.setData({
          now: that.data.now - 1,
          percent: (that.data.now) / 9 * 100
        })
        break;
      case '1':
        if (that.data.answers[that.data.now] == "") {
          wx.showToast({
            title: '您未作答',
            icon: "none"
          })
          break;
        }
        if (that.data.now == 8) {
          //已经是最后一道题
          //进入答题结束页面
          wx.getStorage({
            key: 'openid',
            success: function (res) {
              console.log(res)
              var answersString = that.data.answers.join("")
              console.log(answersString)
              wx.request({
                url: app.globalData.server + '/Survey/UserServeyPersistence',
                data: {
                  openId: res.data,
                  answers: answersString,
                  type: 'A'
                }, success(res) {
                  wx.setTabBarBadge({
                    index: 2,
                    text: '¥',
                  })
                  console.log("答题结束log")
                  that.setData({
                    fresher: true,
                    noAnswered: false,
                    btnInfo: "答题结束"
                  })
                  if (res.data.msg == '您已经答过题，谢谢') {
                    wx.redirectTo({
                      url: '../../pages/money/money?via=' + 'haveServ' + '&money=' + 0,
                    })
                  } else {
                    wx.redirectTo({
                      url: '../../pages/money/money?via=' + 'survey' + '&money=' + res.data.msg,
                    })
                  }
                },
                fail: function (res) {
                  console.log("fail")
                  console.log(res)
                }
              })
            },
          })
          break;
        }
        that.setData({
          now: that.data.now + 1,
          percent: (that.data.now + 2) / 9 * 100
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    var that = this
    /*
    console.log(app.globalData.isFresher)
    if (app.globalData.isFresher) {
      wx.showModal({
        title: '主页提示',
        content: '请先登录',
        showCancel: false,
        complete: function (res) {
          wx.redirectTo({
            url: '../../pages/login/login',
          })
        }
      })
    }
    */
    wx.request({
      url: app.globalData.server + 'Survey/NoAnswered',
      data: {
        openId: app.globalData.openid
      },
      success: function (res) {
          wx.request({
            url: app.globalData.server + 'Survey/GetServeyQuestions',
            success: function (res) {
              console.log(res)
              var data = res.data.data
              for (var i in data) {
                var options = data[i].options
                var arrayTemp = options.split(".")
                arrayTemp.shift()
                for (var j in arrayTemp) {
                  var regB = new RegExp("B", "g");
                  var regC = new RegExp("C", "g");
                  var regD = new RegExp("D", "g");
                  var temp = arrayTemp[j].replace(regB, "").replace(regC, "").replace(regD, "")
                  arrayTemp[j] = temp
                }
                data[i].answers = arrayTemp
              }
              that.setData({
                questionContent: data,
                noAnswered: true,
                btnInfo: "开始答题"
              })
            }
          })
      }, fail: function (res) {
        wx.showToast({
          title: '出错了',
          icon: "none"
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onReady: function () {

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

  }
})