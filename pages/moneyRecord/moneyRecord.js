// pages/moneyRecord/moneyRecord.js
const app = getApp()
Page({
  data: {
    totalMoney: 0.00,
    moneyList: []
  },
  clareMoney: function (res) {
    wx.showToast({
      title: '提现金额不能低于1元！',
      icon: "none",
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this
    wx.request({
      url: app.globalData.server + 'user/GetRedPackagesList',
      data: {
        openId: app.globalData.openid
      }, success: function (res) {
        that.setData({
          moneyList: res.data.data.logs
        })
        wx.request({
          url: app.globalData.server+'User/GetAmount',
          data: {
            openId: app.globalData.openid
          },success:function(res){
            that.setData({
              totalMoney: res.data.msg
            })
          }
        })
      }
    })
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