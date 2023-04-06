const fs = require("fs");

const ClearSearchParams = (url) => {
  url.indexOf("?") != -1 ? url = url.slice(0, url.indexOf("?")) : {};
  return url;
}

const GenerateID = (length, onlynums = false) => {
  var result = "";
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if(onlynums) chars = "01234567890123456789";
  for (var i=0;i<length;i++) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const FormatNumber = (num) => {
  if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K';
    }else if(num > 1000000000) {
        return (num/1000000000).toFixed(1) + 'B'; 
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M';
    }else if(num < 900){
        return num;
  }
}

const GenerateStars = (length, star = "*") => {
  let result = "";
  for(var i=0;i<length;i++) {
    result += star;
  }
  return result;
}

const SizeFromBytes = (bytes) => {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const IsEmpty = (s) => {
  if(!s) return true;
  return s.length === 0 || s.trim().length === 0;
}

const RemoveFromArray = (array, key) => {
  let arr = [...array];
  let index = arr.indexOf(key);
  arr.splice(index, 1);
  return arr;
}

module.exports = {
  GenerateID,
  FormatNumber,
  GenerateStars,
  SizeFromBytes,
  IsEmpty,
  RemoveFromArray,
  ClearSearchParams
}