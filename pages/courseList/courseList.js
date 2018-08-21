// pages/courseList/courseList.js
var app = getApp();
//日期格式化
Date.prototype.toLocaleString = function () {
  var month = (this.getMonth() + 1) > 9 ? (this.getMonth() + 1) : "0" + (this.getMonth() + 1);
  var day = this.getDate() > 9 ? this.getDate() : "0" + this.getDate();
  var hour = this.getHours() > 9 ? this.getHours() : "0" + this.getHours();
  var minute = this.getMinutes() > 9 ? this.getMinutes() : "0" + this.getMinutes();
  return month + "/" + day + "-" + hour + ":" + minute;
};
Page({
  data: {
    cName: "未知学科",
    subjectPack: [],
    progress: ""
  },
  onShareAppMessage: function (options) {
  },
  // 在文档列表页打开文档
  saveToLocal: function (id) {
    var canPush = true;
    var subjectPack = id.currentTarget.dataset.pack;
    var wordTitle = subjectPack.wordTitle
    var path = subjectPack.wordDir;
    var fileType = subjectPack.fileType
    wx.showNavigationBarLoading();
  
    wx.getStorage({
      key: 'saved',
      success: function (res) {
        //如果有缓存 查询是否重复
        for (var i in res.data) {
          if (res.data[i].wordTitle == wordTitle) {
            canPush = false;
            wx.showToast({
              title: '重复下载',
            })
            wx.hideNavigationBarLoading();
            break;
          }
        }
        if (canPush) {
          wx.downloadFile({
            url: path,
            success: function (res) {
              wx.saveFile({
                tempFilePath: res.tempFilePath,
                success: function (res) {
                  var savedPath = res.savedFilePath;
                  wx.getSavedFileInfo({
                    filePath: savedPath,
                    success: function (res) {
                      console.log(savedPath);
                      var size = parseFloat(res.size / 1000).toFixed(1);
                      var unixTimestamp = new Date(res.createTime * 1000);
                      var time = unixTimestamp.toLocaleString();
                      var newObject = {
                        wordDir: savedPath,
                        wordTitle: wordTitle,
                        fileType:fileType,
                        size: size,
                        time: time
                      }
                      wx.getStorage({
                        key: 'saved',
                        success: function (res) {
                          console.log(res.data)
                          res.data.push(newObject);
                          console.log(res.data)

                          wx.setStorage({
                            key: 'saved',
                            data: res.data,
                          })
                          wx.showToast({
                            title: '下载成功',
                          })
                          wx.hideNavigationBarLoading();
                        },
                      })
                    }
                  })
                }
              })
            }
          })
        }
      },
      fail: function (res) {
        wx.downloadFile({
          url: path,
          success: function (res) {
            wx.saveFile({
              tempFilePath: res.tempFilePath,
              success: function (res) {
                var savedPath = res.savedFilePath;
                wx.getSavedFileInfo({
                  filePath: savedPath,
                  success: function (res) {
                    var size = parseFloat(res.size / 1000).toFixed(1);
                    var unixTimestamp = new Date(res.createTime * 1000);
                    var time = unixTimestamp.toLocaleString();
                    var newObject = [{
                      wordDir: savedPath,
                      wordTitle: wordTitle,
                      fileType:fileType,
                      size: size,
                      time: time
                    }]
                    wx.setStorage({
                      key: 'saved',
                      data: newObject,
                    })
                    wx.showToast({
                      title: '下载成功',
                    })
                    wx.hideNavigationBarLoading();

                  }//succ
                })
              }
            })
          }
        })
      }
    })
  },
  openWord: function (id) {
    var that = this;
    var subjectPack = id.currentTarget.dataset.pack;
    var canPush = true;
    for (var h in app.globalData.history) {
      if (app.globalData.history[h].wordTitle == subjectPack.wordTitle) {
        canPush = false;
        break;
      }
    }
    if (canPush) {
      app.globalData.history.push(subjectPack);
    }
    wx.showNavigationBarLoading()
    var t = setTimeout(function () {
      wx.showLoading({
        title: '就快好了',
      })
    }, 1500);
    setTimeout(function () {
      wx.hideLoading();
    }, 2200);
    const Task = wx.downloadFile({
      url: subjectPack.wordDir,
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log("打开文档的路径" + filePath);
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            wx.hideNavigationBarLoading();
            console.log('打开文档成功');
          }
        })
      },
      fail: function (res) {
        console.log(res);
        wx.showToast({
          title: '未能成功',
        })
        wx.hideNavigationBarLoading();

      }
    })
    Task.onProgressUpdate((res) => {
    //  console.log(res.progress)
      that.setData({
        progress: "100"
      })
    })

  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'subjectPack',
      success: function (res) {
        /*
        for (var i in res.data) {
          switch (res.data[i].fileType) {
            case "ppt":
              res.data[i].fileType = 1;
              break;
            case "pdf":
              res.data[i].fileType = 2;
              break;
              default:
              res.data[i].fileType = 0;
              break;
          }
        }
        */
        console.log(res.data);
        that.setData({
          cName: options.cName,
          subjectPack: res.data
        })
      }
    })
    wx.setNavigationBarTitle({
      title: options.cName//页面标题为路由参数
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
    var isFresher = app.globalData.isFresher
    if(isFresher){
      wx.showModal({
        title: '列表提示',
        content: '请先登录',
        showCancel: false,
        complete: function (res) {
          wx.redirectTo({
            url: '../../pages/login/login',
          })
        }
      })
    }
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
  onShareAppMessage: function (options) {
    console.log(options.from);
  }
})