//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    count:{ //最多选择图片的张数，默认9张
      type:Number,
      value:9
    },
    uploadUrl:{ //图片上传服务器路径
      type:String,
      value:''
    },
    showUrl:{
      type:String,
      value:''
    },

    detailPics:[],//上传图片集合
    isShow:true,
    isDel:false,
    delString:'选择删除'
  },
  uploadDetailImage(){
    console.log('点击上传');
      let _that = this;
      if(this.data.detailPics.length>this.data.count){
        wx.showToast({
          title: '最多选择'+_that.data.count+'张',
        });
        return;
      };

      wx.chooseImage({
        count: _that.data.count,
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'],      // album 从相册选图，camera 使用相机，默认二者都有
        success:function(res){
          res.tempFiles.map((item,index)=>{
            item.index = index;
          });
          _that.setData({
            detailPics:res.tempFiles,
            isShow:false
          });
          console.log(_that.data.detailPics)
        }
      });
  },

  click_del(){
    if(!this.data.isDel){
      this.setData({
        isDel:true,
        delString:'取消删除'
      });
    }else{
      this.setData({
        isDel:false,
        delString:'选择删除'
      });
    }
  },

  delImg(e){
    let index = this.data.detailPics.findIndex((ele)=>{
      return e.target.dataset.index == ele.index
    });

    if(index>-1){
      this.data.detailPics.splice(index,1)
    }

    this.setData({
      detailPics: this.data.detailPics
    })
    if(this.data.detailPics.length == 0){
      this.setData({
        isShow:true
      })
    }
    // console.log("dddd",index,this.data.detailPics)
  },
  click_back(e){
    this.setData({
      isShow:true,
      detailPics: []
    })
  },
  uploadClound(e){
    console.log('上传服务器');
    wx.uploadFile({
      filePath: 'filePath',
      name: 'name',
      url: 'url',
      success(res){
        const data = res.data;
      }
    })
  },
  onLoad: function () {
  }
})
