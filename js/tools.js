/*
1.用来获取元素
2.判断某个元素是否有某个class
3.如果没有就添加
4.如果有就删除
*/

//获取元素
function M(sele) {
  var first = sele.substr(0,1),
      isArr = sele.split(' ');
      if (first == '#' && isArr.length == 1) {
        return document.getElementById(sele.substr(1));
      }else {
        var arr = Array.from(document.querySelectorAll(sele));
        return arr.length == 1 ? arr[0] : arr;
      }
}

//判断某个元素是否有某个class
function hasClass(ele,cls) {
  var re = new RegExp(`\\b${cls}\\b`);
  if (re.test(ele.className)) {
    return true;
  }else {
    return false;
  }
}

//给某个元素添加class
function addClass(ele,cls){
  if (!hasClass(ele,cls)) {
    ele.className += ` ${cls}`
  }
  ele.className = ele.className.trim();
}

//给某个元素删除class
function rmClass(ele,cls) {
  var re = new RegExp(`\\b${cls}\\b`);
  if (hasClass(ele,cls)) {
    ele.className =ele.className.replace(re,'').replace(/\s{2}/,' ').trim();
  }
}
