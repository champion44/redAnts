var app = getApp();
Date.prototype.toLocaleString = function () {
  var month = (this.getMonth() + 1) > 9 ? (this.getMonth() + 1) : "0" + (this.getMonth() + 1);
  var day = this.getDate() > 9 ? this.getDate() : "0" + this.getDate();
  var hour = this.getHours() > 9 ? this.getHours() : "0" + this.getHours();
  var minute = this.getMinutes() > 9 ? this.getMinutes() : "0" + this.getMinutes();
  return month + "/" + day + "-" + hour + ":" + minute;
};
var NullTip = {
  tipText: '找不到任何记录'
}
Page({
  data: {
    title: "",
    nullTip: NullTip,
    historyShow: true,
    storedShow: false,
    historyBtn: "on",
    storedBtn: "off",
    history: [],
    sign: true,
    stored: [],
    skin: 'https://sinacloud.net/redant-4you/img/bg/bg1.png'
  },
  onLoad: function (cb) {
    var that = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    console.log(this.data.userInfo)
  },
  toClick: function (res) {
    var that = this
    var id = res.currentTarget.id
    var obj = { "target": { "id": id } }
    that.click(obj)
  },
  click: function (res) {
    var id = res.target.id
    switch (id) {
      case '1':
        wx.navigateTo({
          url: "../history/history?id=1"
        })
        break;
      case '2':
        wx.navigateTo({
          url: "../history/history?id=2"
        })
        break;
      case '3':
      wx.showToast({
        title: '上线中...',
        icon:"none"
      })
        break;
      case '4':
        wx.navigateTo({
          url: "../moneyRecord/moneyRecord"
        })
        break;
    }
  },
  // 历史页面下载进本地
  saveToLocal: function (id) {
    var canPush = true;
    var subjectPack = id.currentTarget.dataset.pack;
    var wordTitle = subjectPack.wordTitle
    var path = subjectPack.wordDir
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
                        fileType: fileType,
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
                      fileType: fileType,
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
  // 打开缓存文档
  openStored: function (id) {
    var filePath = id.currentTarget.id
    wx.openDocument({
      filePath: filePath,
      success: function (res) {
        console.log("打开保存文件成功");
      }
    })
  },
  // 打开历史文档
  openWord: function (id) {
    var path = id.currentTarget.id;
    //app.globalData.history.push(newHistory);
    console.log(app.globalData.history);
    wx.showNavigationBarLoading()
    wx.downloadFile({
      url: path,
      success: function (res) {
        var filePath = res.tempFilePath
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
        console.log("fail");
      }
    })

  },
  onShow: function () {
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
    wx.removeTabBarBadge({
      index: 2,
    })
    var that = this
    if (app.globalData.history.length > 0) {
      that.setData({
        sign: false,
        history: app.globalData.history
      })
    }
    wx.getStorage({
      key: 'saved',
      success: function (res) {
        if (res.data.length > 0) {
          that.setData({
            stored: res.data
          })
        }
      },
    })
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
  // 点击浏览历史触发
  history: function () {
    var that = this;
    if (app.globalData.history.length > 0) {
      that.setData({
        sign: false,
        storedShow: false,
        historyShow: true,
        history: app.globalData.history,
        historyBtn: "on",
        storedBtn: "off"
      })
    } else {
      that.setData({
        sign: true,
        storedShow: false,
        historyShow: true,
        historyBtn: "on",
        storedBtn: "off"
      })
    }

  },
  // 点击缓存文件触发
  stored: function () {
    var that = this;
    wx.getStorage({
      key: 'saved',
      success: function (res) {
        console.log("这是下载历史");
        console.log(res.data);
        if (res.data.length <= 0) {
          that.setData({
            sign: true,
            storedShow: true,
            historyShow: false,
            stored: res.data,
            historyBtn: "off",
            storedBtn: "on"
          })
        } else {
          that.setData({
            sign: false,
            storedShow: true,
            historyShow: false,
            stored: res.data,
            historyBtn: "off",
            storedBtn: "on"
          })
        }
      },
      fail: function () {
        that.setData({
          sign: true,
          storedShow: true,
          historyShow: false,
          historyBtn: "off",
          storedBtn: "on"
        })
      }
    })
    // wx.getSavedFileList({
    //   success: function (res) {
    //     console.log(res.fileList);
    //     if (res.fileList.length > 0) {
    //       that.setData({
    //         sign: false,
    //         storedShow: true,
    //         historyShow: false,
    //         stored: res.fileList
    //       })
    //     } else {
    //       that.setData({
    //         sign: true,
    //         storedShow: true,
    //         historyShow: false
    //       })
    //     }
    //   }
    // })
  },
  delHistory: function (id) {
    var that = this
    var wordTitle = id.currentTarget.id;
    console.log(wordTitle)
    console.log(app.globalData.history)
    for (var i in app.globalData.history) {
      if (app.globalData.history[i].wordTitle == wordTitle) {
        app.globalData.history.splice(i, 1);
        wx.showToast({
          title: '删除成功',
        })
        if (app.globalData.history.length <= 0) {
          that.setData({
            sign: true
          })
        } else {
          that.setData({
            sign: false,
            history: app.globalData.history
          })
        }
        break;
      }
    }
  },
  delSaved: function (id) {
    var that = this;
    var info = id.currentTarget.id
    var strs = new Array(); //定义一数组 
    strs = info.split(","); //字符分割 
    var wordTitle = strs[0]
    var delPath = strs[1];
    console.log(delPath);
    // 在缓存列表也得删除
    wx.getStorage({
      key: 'saved',
      success: function (res) {
        console.log(res.data);
        for (var i in res.data) {
          if (res.data[i].wordTitle == wordTitle) {
            console.log(res.data[i].wordTitle)
            res.data.splice(i, 1);
            console.log(res.data);
            // 将删除后的重新写入缓存
            wx.setStorage({
              key: 'saved',
              data: res.data
            })
            if (res.data.length <= 0) {
              that.setData({
                sign: true
              })
            } else {
              that.setData({
                sign: false,
                stored: res.data
              })
            }
            break;
          }
        }
      },
    })

    wx.showToast({
      title: '删除成功',
    })

  },
  viewSkin: function () {
    wx.navigateTo({
      url: "../skin/skin"
    })
  }
})