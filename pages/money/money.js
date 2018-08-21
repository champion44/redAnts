// pages/money/money.js
const app = getApp()
const serverPath = app.globalData.server
Page({
  data: {
    flag: false,
    money: 0.45,
    moneyType: ''
  },
  //出现
  show: function () {
    this.setData({ flag: false })
  },
  //消失

  hide: function () {
    this.setData({ flag: true })
  },
  nav: function (res) {
    switch (res.currentTarget.id) {
      case '1':
        wx.switchTab({
          url: '../home/home',
        })
        break;
      case '2':
        wx.switchTab({
          url: '../my/my',
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    moneyType:options.via,
    money: options.money
  })
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