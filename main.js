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
let $incre = getAll('#container .cart_box ul .incre');
let $redu = getAll('#container .cart_box ul .redu');
let $jjimCart = get('#container .cart_box .jjim');
let $rem = get('#container .cart_box .rem')
let $ord = get('#container .cart_box .ord')
let $wrap = get('#wrap')
let $bg = get('.bg')
let $loading = get('.loading')
let uh = 1250;
let idList = []
let cartList = []
let deduList = []

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
    $ul_box = get('#container .inner .ul_box');
    $ul = get('#container .inner ul');
    $cartUl = get('#container .cart_box ul');
    $li = getAll('#container .inner ul li');
    $ht = getAll('#container .inner ul li .xi-heart-o');
    $add = getAll('#container .inner ul li .xi-cart-add');
    $jjimCart = get('.jjim')
};
function show() {
    console.log('show');
    $ul.innerHTML = ''
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
    };
    re();
    pic();
    jjim();

    console.log('showEnd');
}
function pic() {
    $li.forEach((element, idx) => {
        element.addEventListener('mouseenter', e => {
            e.currentTarget.firstElementChild.setAttribute('src', `images/img${idx}-1.jpg`);
            e.currentTarget.firstElementChild.style.transition = "0.3s";
        })
        element.addEventListener('mouseleave', e => {
            e.currentTarget.firstElementChild.setAttribute('src', `images/img${idx}-0.jpg`);
        })
    })
}
// JJIM
function jjim() {
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
}
// cart +/-
function cartPM(incBtn, redBtn) {
    incBtn.addEventListener('click', e => {
        console.log('cartP');
        let id = e.currentTarget.parentElement.dataset.id
        console.log(id);
        if (list[id].stock !== 0) {
            list[id].stock--
            list[id].cartStock++
            e.currentTarget.nextElementSibling.nextElementSibling.textContent = list[id].cartStock;
            show();
            console.log('cartPEnd');
        }
    })
    redBtn.addEventListener('click', e => {
        console.log('cartM');
        let id = e.currentTarget.parentElement.dataset.id
        if (list[id].cartStock !== 1) {
            list[id].stock++
            list[id].cartStock--
            e.currentTarget.nextElementSibling.textContent = list[id].cartStock;
            show()
            console.log('cartMEnd');
        }
    })
}
function cartRemove(remBtn) {
    remBtn.addEventListener('click', e => {
        let id = e.currentTarget.parentElement.dataset.id
        list[id].stock += list[id].cartStock;
        list[id].cartStock = 0;
        e.currentTarget.parentElement.remove()
        idList = []
        cartList = []
        deduList = []
        list.forEach(ele => {
            ele.heart = false;
            ele.cart = false;
        })
        console.log(list);
        show()
        console.log('cartMEnd');
    })
}

$jjimCart.addEventListener('click', e => {
    for (let i = 0; i < idList.length; i++) {
        list[idList[i]].heart = true;
    }
    deduList = idList.filter(item => !cartList.includes(item));
    if (deduList.length != 0) {
        for (let i = 0; i < deduList.length; i++) {
            list[deduList[i]].stock--;
            list[deduList[i]].cartStock++;
            let li = document.createElement('li');
            let incBtn = document.createElement('button');
            let redBtn = document.createElement('button');
            let span = document.createElement('span');
            let remBtn = document.createElement('button');
            li.dataset.id = list[deduList[i]].id
            li.innerHTML = `
            <img src="images/img${list[deduList[i]].id}-0.jpg" alt="">
            `
            incBtn.classList.add('incre')
            redBtn.classList.add('redu')
            span.innerHTML = list[deduList[i]].cartStock
            remBtn.classList.add('remove')

            incBtn.innerHTML = `<i class="xi-angle-up"></i>`
            redBtn.innerHTML = `<i class="xi-angle-down"></i>`
            remBtn.innerHTML = `<i class="xi-cart-remove"></i>`

            $cartUl.append(li)
            li.append(incBtn)
            li.append(redBtn)
            li.append(span)
            li.append(remBtn)

            cartPM(incBtn, redBtn)
            cartRemove(remBtn)

            list[deduList[i]].heart = false;
        }
        idList = []
        cartList = []
        deduList = []
    } else {
        idList = []
        cartList = []
        deduList = []
    }
    // heart remove
    let heartElement = document.querySelector('.xi-heart');
    if (heartElement) {
        heartElement.classList.remove('xi-heart');
        heartElement.classList.add('xi-heart-o');
    }
    // heart state false
    idList = []

    let cartLi = getAll('#container .cart_box ul li')
    cartLi.forEach(ele => {
        cartList.push(ele.dataset.id)
    });
    cartList = cartList.filter((value, index, self) => self.indexOf(value) === index);
    show();
})

$rem.addEventListener('click', e => {
    let $cartLis = getAll('#container .cart_box ul li')
    if ($cartLis.length) {
        $cartLis.forEach(ele => {
            ele.remove();
        })
        list.forEach(ele => {
            ele.heart = false;
            ele.cart = false;
            ele.stock += ele.cartStock;
            ele.cartStock = 0;
        });
        idList = []
        cartList = []
        deduList = []
        list.forEach(ele => {
            ele.heart = false;
            ele.cart = false;
        })
        show()
    }
})
$ord.addEventListener('click', e => {
    $bg.style.display = 'block'
    $loading.style.display = 'block'
    setTimeout(() => {
        $bg.style.display = 'none'
        $loading.style.display = 'none'
        $wrap.style.display = 'none'
    }, 2000);
    console.log(list);
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
