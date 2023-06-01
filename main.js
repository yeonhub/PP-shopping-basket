'use strict';
const get = (target) => {
    return document.querySelector(target);
}
const getAll = (target) => {
    return document.querySelectorAll(target);
}

let $more = get('.more');
let $ul_box = get('#container .inner .ul_box');
let $ul = get('#container .inner ul');
let $cartUl = get('#container .cart_box ul');
let $li = getAll('#container .inner ul li');
let $ht = getAll('#container .inner ul li .xi-heart-o');
let $add = getAll('#container .inner ul li .xi-cart-add');
let $jjimCart = get('.jjim')
let uh = 1250;

let list = [
    { id: 0, name: '슬릿 스커트', price: 32000, stock: 11, heart: false, cart: false, cartStock: 0 },
    { id: 1, name: '리본 벨트 원피스', price: 27000, stock: 4, heart: false, cart: false, cartStock: 0 },
    { id: 2, name: '프릴 점퍼', price: 40000, stock: 21, heart: false, cart: false, cartStock: 0 },
    { id: 3, name: '카라 원피스', price: 41000, stock: 8, heart: false, cart: false, cartStock: 0 },
    { id: 4, name: '제임스 니트', price: 28000, stock: 17, heart: false, cart: false, cartStock: 0 },
    { id: 5, name: '오픈 롱 원피스', price: 18000, stock: 2, heart: false, cart: false, cartStock: 0 },
    { id: 6, name: '토끼 니트', price: 35000, stock: 8, heart: false, cart: false, cartStock: 0 },
    { id: 7, name: '부티 스커트', price: 43000, stock: 18, heart: false, cart: false, cartStock: 0 },
    { id: 8, name: '배색 니트 원피스', price: 55000, stock: 11, heart: false, cart: false, cartStock: 0 },
    { id: 9, name: '체크 케이프', price: 74000, stock: 35, heart: false, cart: false, cartStock: 0 },
    { id: 10, name: '백버튼 니트', price: 29000, stock: 7, heart: false, cart: false, cartStock: 0 },
    { id: 11, name: '폴리 치마', price: 18000, stock: 9, heart: false, cart: false, cartStock: 0 }
];
show();

function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// re
function re() {
    $li = getAll('#container .inner ul li');
    $ht = getAll('#container .inner ul li .xi-heart-o');
    $add = getAll('#container .inner ul li .xi-cart-add');
};
function show() {
    for (let i = 0; i < list.length; i++) {
        let li = document.createElement('li');
        li.dataset.id = i;
        li.innerHTML = `
        <img src="images/img${i}-0.jpg">
        <p>${list[i].name}</p>
        <span>재고 : ${list[i].stock}</span>
        <strong class="ori_p">${priceToString(list[i].price)}원</strong>
        <strong class="sal_p">${priceToString(list[i].price * 0.9)}원</strong>
        <i class="xi-heart-o"></i>
        <i class="xi-cart-add"></i>
        `
        $ul.append(li)
        re();
    };
}
$li.forEach((element, idx) => {
    element.addEventListener('mouseenter', e => {
        e.currentTarget.firstElementChild.setAttribute('src', `images/img${idx}-1.jpg`);
        e.currentTarget.firstElementChild.style.transition = "0.3s";
    })
    element.addEventListener('mouseleave', e => {
        e.currentTarget.firstElementChild.setAttribute('src', `images/img${idx}-0.jpg`);
    })
})

// JJIM
let idList = []
$ht.forEach(elemet => {
    elemet.addEventListener('click', e => {
        if (e.currentTarget.classList.contains('xi-heart-o')) {
            e.currentTarget.classList.remove('xi-heart-o');
            e.currentTarget.classList.add('xi-heart');
            let id = e.target.parentElement.dataset.id;
            idList.push(id)
        } else {
            e.currentTarget.classList.remove('xi-heart');
            e.currentTarget.classList.add('xi-heart-o');
            let id = e.target.parentElement.dataset.id;
            idList = idList.filter((ele) => ele !== id)
        }
    })
});

$jjimCart.addEventListener('click', e => {
    for (let i = 0; i < idList.length; i++) {
        list[idList[i]].heart = true;
        console.log(list);
    }
    list.forEach(ele => {
        if (ele.heart) {
            ele.stock--
            ele.cartStock++
            let li = document.createElement('li');
            li.innerHTML = `
            <img src="images/img${ele.id}-0.jpg" alt="">
            <button class="incre"><i class="xi-angle-up"></i></button>
            <button class="redu"><i class="xi-angle-down"></i></button>
            <span>${ele.cartStock}</span>
            <button class="remove"><i class="xi-cart-remove"></i></button>
            `
            $cartUl.append(li)
            console.log(list);
        }
        // heart remove
        let heartElement = document.querySelector('.xi-heart');
        if (heartElement) {
            heartElement.classList.remove('xi-heart');
            heartElement.classList.add('xi-heart-o');
        }
        // heart state false
        ele.heart = false;
    })
    show();
})

// more btn
$more.addEventListener('click', e => {
    uh += 635;
    if (uh === 2520) {
        uh = 2520;
        $more.style.display = 'none'
    }
    $ul_box.style.height = uh + 'px';
});
