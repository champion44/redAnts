// pages/detail/detail.js

var app = getApp()

Page({
  data: {
    input: "输入您想找的学科",
    subjects: [],
    dynamic: "",
    recommend: [],
    sa: "on",
    sh: "off",
    value: "",
    isShow: false,
    //  用于存储用户搜索历史
    searchHistory: [],
    showHistory: false,
    showResults: true,
    show: true
  },
  showSearchHistory: function () {
    this.setData({
      sa: "off",
      sh: "on",
      showHistory: true,
      showResults: false,
    })
  },
  showAll: function () {
    this.setData({
      sa: "on",
      sh: "off",
      showHistory: false,
      showResults: true,
    })
  },
  goToWordList: function (id) {
    var that = this;
    var cName = id.currentTarget.id;
    var subjectPack = id.currentTarget.dataset.pack;
    var newObject = {
      cname: cName,
      subjectPack: subjectPack
    }
    var newObjects = [{
      cname: cName,
      subjectPack: subjectPack
    }];
    wx.getStorage({
      key: 'searchHistory',
      success: function (res) {
        var canPush = true;
        for (var i in res.data) {
          if (res.data[i].cname == cName) {
            canPush = false;
            break;
          }
        }
        if (canPush) {
          res.data.push(newObject);
          wx.setStorage({
            key: 'searchHistory',
            data: res.data,
          })
          that.setData({
            sa: "off",
            sh: "on",
          })
        }
      }, fail: function (res) {
        wx.setStorage({
          key: 'searchHistory',
          data: newObjects,
        })
        that.setData({
          sa: "off",
          sh: "on",
        })
      }
    })
    wx.setStorage({
      key: 'subjectPack',
      data: subjectPack,
      success: function (res) {
        wx.navigateTo({
          url: '../courseList/courseList?cName=' + cName,
        })
      }
    })
  },
  search: function (event) {
    var that = this;
    var keyword = event.detail.value;
    if (keyword.length > 0) {
      that.setData({
        dynamic: keyword,
        isShow: true,
        show: false,
        showHistory: false,
        showResults: true
      })
    } else {
      wx.getStorage({
        key: 'searchHistory',
        success: function (res) {
          if (res.data.length > 0) {
            that.setData({
              isShow: false,
              show: true,
              showHistory: true,
              showResults: false,
            })
          } else {
            that.setData({
              isShow: false,
              show: true,
              showHistory: false,
              showResults: true,
            })
          }
        },
      })
    }
    var wordArr = keyword.split("");
    var temp = app.globalData.subjects;
    var results = new Array(wordArr.length);
    for (var i = 0; i < results.length; i++) {
      var result = [];
      results[i] = result;
    }
    for (var i = 0; i < wordArr.length; i++) {
      for (var j = 0; j < temp.length; j++) {
        // 第一次 等于temp长度 总长 每次结果刷新temp
        if ((temp[j].cname.indexOf(wordArr[i])) >= 0) {
          results[i].push(temp[j]);
        }//if的返回
      }//第二层
      temp = results[i];
    }//第一层for
    that.setData({
      subjects: temp
    })
  },
  delSearchHistory: function (id) {
    var that = this;
    var cName = id.currentTarget.id;
    wx.getStorage({
      key: 'searchHistory',
      success: function (res) {
        for (var i in res.data) {
          if (res.data[i].cname == cName) {
            res.data.splice(i, 1);
          }
        }
        // 刷新页面
        if (res.data.length <= 0) {
          that.setData({
            showHistory: false,
            showResults: true,
            sa: "on",
            sh: "off"
          })
        }
        that.setData({
          searchHistory: res.data
        })
        // 重新写入缓存
        wx.setStorage({
          key: 'searchHistory',
          data: res.data,
        })
      },
    })
  },
  change: function () {
    var that = this;
    wx.getStorage({
      key: 'searchHistory',
      success: function (res) {
        if (res.data.length > 0) {
          that.setData({
            showHistory: true,
            showResults: false,
          })
        }
      },
    })
    that.setData({
      subjects: app.globalData.subjects,
      input: "输入您想找的学科",
      value: "",
      isShow: false,
      show: true
    })
  },
  onLoad: function (options) {
    var that = this
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
     wx.request({
      url: 'https://sinacloud.net/redant-4you/allSubjects.json',
      success: function (res) {
        // console.log(res);
        that.setData({
          recommend: res.data,
          subjects: res.data
        })
        app.globalData.subjects=res.data;
      }
    })
    wx.getStorage({
      key: 'searchHistory',
      success: function (res) {
        if (res.data.length <= 0) {
          that.setData({
            showHistory: false,
            showResults: true,
            sh: "off",
            sa: "on"
          })
        } else {
          that.setData({
            searchHistory: res.data,
            showHistory: true,
            showResults: false,
            sh: "on",
            sa: "off"
          })
        }
      }, fail: function (res) {
        console.log(res)
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})