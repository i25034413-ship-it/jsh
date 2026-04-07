let left = document.querySelector('.l_button-left')
let right = document.querySelector('.l_button-right')
let min = document.querySelectorAll('.l_min')
let img = document.querySelectorAll('.l_img')
let images = document.querySelector('.l_images')
let l_button = document.querySelector('.l_button')

let index = 0;//索引
let time;//计时器
function position() {
    for (let i = 0; i < min.length; i++) {
        img[i].style.display = 'none'
    }
    img[index].style.display = 'block'
}
function add() {
    if (index >= min.length - 1) {
        index = 0
    } else {
        index++
    }
}
function desc() {
    if (index < 1) {
        index = min.length - 1
    } else {
        index--
    }
}
// 圆角透明度
function rounded() {
    for (let i = 0; i < min.length; i++) {
        min[i].style.opacity = '0.5'
        min[i].style.border = '2px solid #000'
    }
    min[index].style.opacity = '1'
    min[index].style.border = '2px solid #fff'
}
//定时器
function timer() {
    time = setInterval(() => {
        index++
        desc()
        add()
        position()
        rounded()
    }, 2000)
}
// 左按钮
left.addEventListener('click', () => {
    desc()
    position()
    rounded()
    clearInterval(time)
    timer()
})
// 右按钮
right.addEventListener('click', () => {
    add()
    position()
    rounded()
    clearInterval(time)
    timer()
})
//圆角点击
for (let i = 0; i < min.length; i++) {
    min[i].addEventListener('click', () => {
        index = i
        position()
        rounded()
        clearInterval(time)
        timer()
    })
}
//鼠标移上去暂停
l_button.onmouseover = function () {
    clearInterval(time)
}
//鼠标移出又开启定时器
l_button.onmouseleave = function () {
    clearInterval(time)
    timer()
}
timer()


function updateTime() {
    var now = new Date();
    var formattedTime = now.getFullYear() + '-' + 
                        ('0' + (now.getMonth() + 1)).slice(-2) + '-' + 
                        ('0' + now.getDate()).slice(-2) + ' ' + 
                        ('0' + now.getHours()).slice(-2) + ':' + 
                        ('0' + now.getMinutes()).slice(-2) + ':' + 
                        ('0' + now.getSeconds()).slice(-2);
    document.getElementById('current-time').innerText = formattedTime;
}

window.onload = function() {
    updateTime();
    setInterval(updateTime, 1000); // 每秒更新一次时间
}