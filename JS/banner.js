(function(){

// //获取 广告内容的
 // 完成广告区的图片切换
  // 横幅区数据
  var datas = [
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/15c05b32cf948b594477dfc3eb69fb69.jpg?w=2452&h=920',
      link: 'https://www.mi.com/mi11le-5g-ne',
    },
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a532e33470d046b3f044d5ea49fc5e9e.png?thumb=1&w=2452&h=920&f=webp&q=90',
      link: 'https://www.mi.com/xiaomipad5',
    },
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/918820682e4a490221cfd92b24c14b86.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
      link: 'https://www.mi.com/a/h/22033.html?sign=b60a6ca9167bce2d1ed8ee319cf83c75',
    },
    {
      img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/af7be8f65065f405f57f46a02731f78d.jpg?thumb=1&w=2452&h=920&f=webp&q=90',
      link: 'https://www.mi.com/a/h/22812.html?sign=aab397a7ecf2ae4c1765e9d11fdccca6',
    },
  ];
  //封装一个获取dom的 函数
   function $(content){
    return document.querySelector(content);
   }
//所有的dom
//图片 窗口的 dom
var banner =$('.banner');
//图片的超链接 和 图片
var bannerCover = $('.banner-cover');
var img = banner.querySelector('img')
//左箭头
var bannerLeft = $('.banner-i-left');
//右箭头
var bannerRight = $('.banner-i-right');
//右下角圆点
var bannerYuandian = $('.banner-yuandian');

//首先要改变图片 就是更改 超链接地址 和 img 的 src

function chenge(index){
   // chenge()实参的值 就是 datas数组里 第几张 图片对象的下标 
     bannerCover.href = datas[index].link;
    img.src = datas[index].img; 
    // 获取 带有默认内样式 的 span
    var selected = bannerYuandian.querySelector('.banner-yuandian-selected')
 
   // 判断 获取的 dom里 是否有值  如果有  就将其的 内样式 更改为 fl 
    if(selected){
      selected.className = '.fl'  
    }
   // bannerYuandian 下第 index 个 span 元素 
    var span = bannerYuandian.children[index];
    //给其设置内样式
   span.className = 'banner-yuandian-selected fl'
}
var curIndex = 0;  //声明一个变量 来赋值作为 chenge实参的数据
// 向上一个 切换图片
 function toPrev(){
  //每次 下标减一  就相当于往后退一个  
    curIndex --;
    //当 小于 0 时 就将下标设为 数组的长度减一 也就是最后那个下标
   if(curIndex < 0) {
    curIndex = datas.length - 1;
    //最后将这个下标值 放到 切换图片的 函数实参里
   } chenge(curIndex);
 }
//向下一个切换图片
function toNext(){
    curIndex ++;
    if(curIndex >= datas.length ) {
  curIndex = 0;
}  chenge(curIndex);
}
//创建事件 点击 左箭头  向上一个切换图片
 bannerLeft.onclick = toPrev;
//创建事件 点击 右箭头  向下一个切换图片
bannerRight.onclick = toNext;
//创建 圆点的 span 元素

    for(var i = 0; i < datas.length; i ++) {
      //循环 遍历图片的数组   有几张图片的时候就创建几个 span 
        var span = document.createElement("span");
       //将 span 加入父元素中 
        bannerYuandian.appendChild(span);
    //给他设置内样式
         span.className = 'fl';
 }

//     //根据 datas数组里第几章图片是 就给 圆点里 第几个 span 施加 内样式    
for(let i = 0; i < bannerYuandian.children.length; i ++) {
 // i 就相当于 每个span 的下标 然后在 父元素中取出   
    var span = bannerYuandian.children[i]
    // 给每个圆点注册点击事件  
     span.addEventListener("click",function(){
    //点击那个 圆点的时候  就将 超链接和图片更改为相应的值
        curIndex = i;
        chenge(i);
    
     })
 
}


//在设置轮播图  
// 首先创建 计时器 每隔 1.5 秒 自动更换图片
var timerId; //声明一个变量  存放 计时器的ID  方便开始停止
//开始
function start(){
    if(timerId){
    return;
    }
    timerId = setInterval(toNext,1500)
}
start();
//结束
function stop(){
    clearInterval(timerId);
    timerId = null;
}
//在 创建事件 鼠标移入的时候 停止转换 移除  继接切换
banner.addEventListener('mouseenter' , stop);
banner.addEventListener('mouseleave' , start);
})();