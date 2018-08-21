// pages/loveSearch/loveSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adPic: [{ adPicUrl: "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/indexBanner/ad.png" }, { adPicUrl: "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/indexBanner/ad.png" }, { adPicUrl: "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/indexBanner/ad.png" }],
    gridList: [
      { enName: 'score', zhName: '查成绩pro' ,iconPic:'../../dist/image/loveSearch/score.png'},
      { enName: 'schedual', zhName: '查课表pro', iconPic: '../../dist/image/loveSearch/schedual.png'},
      { enName: 'books', zhName: '图书馆书目', iconPic: '../../dist/image/loveSearch/books.png' },
      { enName: 'room', zhName: '研修室预约', iconPic: '../../dist/image/loveSearch/room.png' },
      { enName: 'cet', zhName: '四六级查询', iconPic: '../../dist/image/loveSearch/cet.png' },
      { enName: 'computer', zhName: '计算机二级', iconPic: '../../dist/image/loveSearch/computer.png' },
      { enName: 'calendar', zhName: '校历', iconPic: '../../dist/image/loveSearch/calendar.png' },
      { enName: 'map', zhName: '校园街景', iconPic: '../../dist/image/loveSearch/map.png' }
    ]
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