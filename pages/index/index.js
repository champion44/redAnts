//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    subjects: []
    },

  search: function () {  
    wx.navigateTo({
      url: '../search/search'
    })
  },
  goToWordList:function(id){
       var cName = id.currentTarget.id;
       var subjectPack = id.currentTarget.dataset.pack;
       wx.setStorage({
         key: 'subjectPack',
         data: subjectPack,
         success:function(res){
           wx.navigateTo({
             url: '../courseList/courseList?cName='+cName,
           })         
           }
       })
  },
  onShow:function(){
    var that = this;
    console.log("onshow");
    wx.request({
      url: 'https://sinacloud.net/redant-4you/allSubjects.json',
      success: function (res) {
        var firstResData = res.data;
        //  从网上下载后拼接成首页数据
        var index = [
          {
            "cname": "物理化学",
            "imgPath": "../../dist/image/examplePic/che.png"
          },
          {
            "cname": "大学英语",
            "imgPath": "../../dist/image/examplePic/eng.png"
          },
          {
            "cname": "地质学",
            "imgPath": "../../dist/image/examplePic/geo.png"
          },
          {
            "cname": "大学物理",
            "imgPath": "../../dist/image/examplePic/phy.png"
          },
          {
            "cname": "政治经济学",
            "imgPath": "../../dist/image/examplePic/pol.png"
          },
          {
            "cname": "高等数学",
            "imgPath": "../../dist/image/examplePic/mat.png"
          }
        ];
        var indexSubjects = [];
        for (var i in index) {
          for (var j in firstResData) {
            if (firstResData[j].cname == index[i].cname) {
              firstResData[j].imgPath = index[i].imgPath;
              indexSubjects.push(firstResData[j]);
              break;
            }
          }
        }
        console.log(indexSubjects);
        that.setData({
          subjects: indexSubjects
        })
      }
    })
  },
  onLoad: function () {
    var that = this;
    console.log("刷新");
    //调用应用实例的方法获取全局数据
    wx.request({
      url: 'https://sinacloud.net/redant-4you/allSubjects.json',
      success: function (res) {
        var firstResData = res.data;
        //  从网上下载后拼接成首页数据
        var index = [
          {
            "cname": "物理化学",
            "imgPath": "../../dist/image/examplePic/che.png"
          },
          {
            "cname": "大学英语",
            "imgPath": "../../dist/image/examplePic/eng.png"
          },
          {
            "cname": "地质学",
            "imgPath": "../../dist/image/examplePic/geo.png"
          },
          {
            "cname": "大学物理",
            "imgPath": "../../dist/image/examplePic/phy.png"
          },
          {
            "cname": "政治经济学",
            "imgPath": "../../dist/image/examplePic/pol.png"
          },
          {
            "cname": "高等数学",
            "imgPath": "../../dist/image/examplePic/mat.png"
          }
        ];
        var indexSubjects = [];
        for (var i in index) {
          for (var j in firstResData) {
            if (firstResData[j].cname == index[i].cname) {
              firstResData[j].imgPath = index[i].imgPath;
              indexSubjects.push(firstResData[j]);
              break;
            }
          }
        }
        console.log(indexSubjects);
        that.setData({
          subjects: indexSubjects
        })
      }
      })
  }
})
