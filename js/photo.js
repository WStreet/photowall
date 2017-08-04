(function(){
//-------------------------------------
//用来声明变量和初始化数据
var data = dataList,len = data.length;

createPhotos(data);  //用来生成所有的HTML结构

var n = 0;



//-------------------------------------
//实现交互效果
//sortImgs(n);

M('.shade .start').onclick = function(){
  addClass(M('.shade'),'hide');
  M('.photo').style.opacity = 1;
  addClass(M('#photo_0'),'center');
  sortImgs(n);
}

M('.nav_i').forEach((item,i)=>{
  item.onclick = function(){
    turnImg(M(`#photo_${i}`));
  }
})





//-------------------------------------
//需求函数化
//需求1：初始化所有的HTML结构
function createPhotos(data){
  var photo_html = M('.photo').innerHTML.split('{{split}}')[0].trim();
  var nav_html = M('.nav').innerHTML.trim();
  var photos = [],navs = [];
  data.forEach((item,i)=>{
    var template = photo_html.replace(/{{id}}/,i)
                             .replace(/{{src}}/,'src')
                             .replace(/{{img}}/,item.img)
                             .replace(/{{caption}}/,item.caption)
                             .replace(/{{desc}}/,item.desc),
       temNav = nav_html.replace(/{{id}}/,i);
   photos.push(template);
   navs.push(temNav);
 });
 photos.push(`<div class="nav">${navs.join('')}</div>`)
 M('.photo').innerHTML = photos.join('');
}
//需求2：对所有照片进行排序
function sortImgs(n){
  var photos = M('.photo_i');
  initPhotos(photos);
  var center = photos.splice(n,1)[0];
  addClass(center,'center');
  addClass(M(`#nav_${n}`),'active')
  center.onclick = function(){
    turnImg(this);
  }

  photos.sort(()=>{
    return 0.5 - Math.random();
  });

  var left = photos.splice(0,Math.ceil((len-1)/2)),
      right = photos;
      //console.log(left.length,right.length);

      var range = scope();

      left.forEach((item,i)=>{
        item.style.zIndex = rn([0,len]);
        item.style.left = rn(range.L.x)+'px';
        item.style.top = rn(range.L.y)+'px';
        item.style.transform=`translate(0,0) scale(.9) rotate(${rn([-2160,2160])}deg)`;
      });
      right.forEach((item,i)=>{
        item.style.zIndex = rn([0,len]);
        item.style.left = rn(range.R.x)+'px';
        item.style.top = rn(range.R.y)+'px';
        item.style.transform=`translate(0,0) scale(.9) rotate(${rn([-2160,2160])}deg)`;
      })
}
//需求3：返回某两个数值之间的整数
function rn(arr) {//[1,10]
  var max = Math.max.apply(null,arr),
      min = Math.min.apply(null,arr);
  return Math.round(Math.random()*(max-min)+min);
}
//需求4：设定左右两边照片的随机范围
function scope(){
  var outter = M('.photo_wall'),
      oneImg = M('#photo_'+rn([0,len-1]));
      //console.log(outter,oneImg);
      var W = outter.clientWidth,
          H = outter.clientHeight,
          w = oneImg.offsetWidth,
          h = oneImg.offsetHeight;
      var data = {
        L:{
          x:[-w/3,W/2-w/2-w],
          y:[-h/3,H-h*2/3]
        },
        R:{
          x:[(W+w)/2,W-w*2/3],
          y:[-h/3,H-h*2/3]
        }
      }
      return data;
}
//需求5：控制照片和导航栏按钮翻转
function turnImg(ele) {
  //如果当前照片是正面，点击之后变成反面
  //如果当前照片是反面，点击之后变成正面
  var cur = ele.id.split('_')[1];
  var nav = M(`#nav_${cur}`);

  if (!hasClass(ele,'center')) {
    return sortImgs(cur);
  }

  if (hasClass(ele,'front')) {
    rmClass(ele,'front');
    addClass(ele,'back');
    addClass(nav,'back')
  }else {
    rmClass(ele,'back');
    addClass(ele,'front');
    rmClass(nav,'back');
  }
}
//需求6：恢复初始样式
function initPhotos(eles) {
  eles.forEach((item,i)=>{
    if (hasClass(item,'center')) {
      var nav = M(`#nav_${i}`)
      rmClass(item,'center');
      rmClass(item,'back');
      addClass(item,'front');
      rmClass(nav,'active');
      rmClass(nav,'back');
      item.onclick = null;
    }
    item.style.left = '';
    item.style.top = '';
    item.style.zIndex = '';
    item.style.transform = `translate(-50%,-50%) scale(1) rotate(0deg)`;
  });
}





})()
