Date.prototype.toLocaleString = function () {
  //     var dayZero = "";
  //     var hourZero = "";
  //     var minuteZero = "";
  //   if (this.getMonth()<10){
  // dayZero="0";
  //   }
  //   if (this.getDate()<10){
  //     hourZero="0";
  //   }
  //   if (this.getMinutes()){
  //     minuteZero="0";
  //   }
  var month = (this.getMonth() + 1) > 9 ? (this.getMonth() + 1) : "0" + (this.getMonth() + 1);
  var day = this.getDate() > 9 ? this.getDate() : "0" + this.getDate();
  var hour = this.getHours() > 9 ? this.getHours() : "0" + this.getHours();
  var minute = this.getMinutes() > 9 ? this.getMinutes() : "0" + this.getMinutes();
  return month + "/" + day + "-" + hour + ":" + minute;
  //return (this.getMonth() + 1) + "/" + dayZero+this.getDate() + "-" + hourZero+this.getHours() + ":" + minuteZero+this.getMinutes();
};
module.exports.Date.prototype.toLocaleString = Date.prototype.toLocaleString;