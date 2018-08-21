// pages/home/home.js
var app = getApp();
Page({
  data: {
    homeTexts: [{ title: "查 成 绩", content: "成绩任意查", iconPic: "../../dist/image/homePic/sheet.png" }, { title: "等 级 考 试", content: "四六级/计算机等", iconPic: "../../dist/image/homePic/computer.png" }, { title: "学 习 资 料", content: "各科学习资料", iconPic: "../../dist/image/homePic/book.png" }],
    adPic: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  bannerDetail: function (res) {
    var id = res.currentTarget.id
    wx.navigateTo({
      url: '../bannerDetail/bannerDetail?id=' + id
    })
  },
  copy: function (res) {
    wx.showActionSheet({
      itemList: ["复制群号到剪切板"],
      success: function (res) {
        wx.setClipboardData({
          data: '628257900',
        })
      }, complete: function (res) {
        console.log(res)
      }
    })
  },
  bindFun: function (res) {
    var id = res.currentTarget.id
    switch (id) {
      case '0':
        // wx.navigateTo({
        //   url: '../compusory/compusory',
        // })
        wx.showToast({
          title: '上线中...',
          icon: "none"
        })
        break;
      case '1':
        wx.showToast({
          title: '上线中...',
          icon: "none"
        })
        break;
      case '2':
        wx.navigateTo({
          url: '../index/index',
          fail: function (res) {
            console.log(res)
          }
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onready")
    var that = this
    wx.request({
      url: 'https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/bannerForStudy.json',
      success: function (res) {
        that.setData({
          adPic: res.data
        })
      }
    })
    /*
    console.log(app.globalData.isFresher)
    var time = setTimeout(function () {
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
    }, 1000)
    */
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("show")

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

  }
})