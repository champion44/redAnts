var config = require('../../comm/script/config')
var app = getApp();
Page({
  data: {
    userInfo:[],
    gridList: [
      { enName: '2lishidingzhishuju', zhName: '浏览记录' },
      { enName: 'iconset0425', zhName: '下载历史' },
      { enName: 'datiqia', zhName: '答题问卷' },
      { enName: 'hongbao', zhName: '我的红包' },
    ],skin: 'https://sinacloud.net/redant-4you/img/bg/bg1.png'

  },
  onLoad: function (cb) {
    var that = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function (res) {
        if (res.data == "") {
          that.setData({
            skin: config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            skin: res.data
          })
        }
      }
    })
  },
  viewGridDetail: function (e) {
    var data = e.currentTarget.dataset
    switch (data.url) {
      case '2lishidingzhishuju':
        wx.navigateTo({
          url: "../history/history?id=1"
        })
        // 历史记录
        break;
      case 'iconset0425':
        //下载历史
        wx.navigateTo({
          url: "../history/history?id=2"
        })
        break;
      case 'datiqia':
        // 答题卡
        break;
      case 'hongbao':
        // 红包
        break;
      default: break;
    }
  },
  viewSkin: function () {
    wx.navigateTo({
      url: "../skin/skin"
    })
  }
})