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
let $li = getAll('#wrap #container .inner ul li');
let $ht = getAll('#container .inner ul li .xi-heart-o');
let $add = getAll('#container .inner ul li .xi-cart-add');
let $incre = getAll('#container .cart_box ul .incre'); // +
let $redu = getAll('#container .cart_box ul .redu'); // -
let $jjimCart = get('#container .cart_box .jjim'); // 찜 상품 담기
let $rem = get('#container .cart_box .rem') // 비우기
let $ord = get('#container .cart_box .ord') // 주문하기
let $goOrder = get('#header .inner .top-menu .goOrder') // 장바구니
let $wrap = get('#wrap')
let $bg = get('.bg')
let $loading = get('.loading')
let uh = 1250;
let idList = []
let cartList = []
let deduList = []
// cart
let $wrapC = get('#wrapB')
let $today = get('#wrapB #header .inner .nav .gnb .today')
let $logo = get('#wrapB #header .inner h2')
let $cartpageUl = get('#wrapB #container .cartUl_box ul')
let $chk = getAll('#wrapB #container .cartUl_box ul li .xi-check-circle-o')
let $price = get('#wrapB .inner .order .price')

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

// init
show();

// 상품 가격 변환
function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 재할당
function re() {
    $ul_box = get('#container .inner .ul_box');
    $ul = get('#container .inner ul');
    $cartUl = get('#container .cart_box ul');
    $li = getAll('#wrap #container .inner ul li');
    $ht = getAll('#container .inner ul li .xi-heart-o');
    $add = getAll('#container .inner ul li .xi-cart-add');
    $jjimCart = get('.jjim')
    $chk = getAll('#wrapB #container .cartUl_box ul li .xi-check-circle-o')
};

// 상품 목록에 list 출력
function show() {
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
    // jjim();
    jjimEventListeners();
    add();
}

// thumbnail hover 시 이미지 변환
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

// 찜
// function jjim() {
//     $ht.forEach(elemet => {
//         elemet.addEventListener('click', e => {
//             if (e.currentTarget.classList.contains('xi-heart-o')) {
//                 e.currentTarget.classList.remove('xi-heart-o');
//                 e.currentTarget.classList.add('xi-heart');
//                 let id = e.target.parentElement.dataset.id;
//                 idList.push(id)
//             } else {
//                 e.currentTarget.classList.remove('xi-heart');
//                 e.currentTarget.classList.add('xi-heart-o');
//                 let id = e.target.parentElement.dataset.id;
//                 idList = idList.filter((ele) => ele !== id)
//             }
//         })
//     });
// }
function updateJjimList(id, isAdd) {
    if (isAdd) {
        idList.push(id);
    } else {
        idList = idList.filter((ele) => ele !== id);
    }
}
function updateHeartButton(element, isFilled) {
    if (isFilled) {
        element.classList.remove('xi-heart-o');
        element.classList.add('xi-heart');
    } else {
        element.classList.remove('xi-heart');
        element.classList.add('xi-heart-o');
    }
}
function jjimEventListeners() {
    $ht.forEach(element => {
        element.addEventListener('click', e => {
            let id = e.target.parentElement.dataset.id;
            let isAdd = e.currentTarget.classList.contains('xi-heart-o');
            updateJjimList(id, isAdd);
            updateHeartButton(e.currentTarget, isAdd);
        });
    });
};


// cart 상품 증가/감소
// function cartPM(incBtn, redBtn) {
//     incBtn.addEventListener('click', e => {
//         let id = e.currentTarget.parentElement.dataset.id
//         if (list[id].stock !== 0) {
//             list[id].stock--
//             list[id].cartStock++
//             e.currentTarget.nextElementSibling.nextElementSibling.textContent = list[id].cartStock;
//             show();
//         }
//     })

//     redBtn.addEventListener('click', e => {
//         let id = e.currentTarget.parentElement.dataset.id
//         if (list[id].cartStock !== 1) {
//             list[id].stock++
//             list[id].cartStock--
//             e.currentTarget.nextElementSibling.textContent = list[id].cartStock;
//             show()
//         }
//     })
// }

function updateStock(id, stockDelta, cartStockDelta) {
    list[id].stock += stockDelta;
    list[id].cartStock += cartStockDelta;
}

// cart 상품 증가/감소
function cartPM(incBtn, redBtn) {
    incBtn.addEventListener('click', e => {
        let id = e.currentTarget.parentElement.dataset.id
        if(list[id].stock !== 0){
            updateStock(id, -1, 1);
        }
        e.currentTarget.nextElementSibling.nextElementSibling.textContent = list[id].cartStock;
        show();
    })
    redBtn.addEventListener('click', e => {
        let id = e.currentTarget.parentElement.dataset.id
        if(list[id].cartStock !== 1){
            updateStock(id, 1, -1);
        }
        e.currentTarget.nextElementSibling.textContent = list[id].cartStock;
        show()
    })
}


// remove cart item (장바구니 상품 제거)
// function cartRemove(remBtn) {
//     remBtn.addEventListener('click', e => {
//         let id = e.currentTarget.parentElement.dataset.id
//         list[id].stock += list[id].cartStock;
//         list[id].cartStock = 0;
//         list[id].cart = false
//         list[id].heart = false
//         e.currentTarget.parentElement.remove()
//         cartList = cartList.filter(item => item !== id);
//         show()
//     })
// }
function removeFromCart(id) {
    updateStock(id, list[id].cartStock, -list[id].cartStock);
    list[id].cart = false;
    list[id].heart = false;
    cartList = cartList.filter(item => item !== id);
}

function cartRemove(remBtn) {
    remBtn.addEventListener('click', e => {
        let id = e.currentTarget.parentElement.dataset.id;
        removeFromCart(id);
        e.currentTarget.parentElement.remove();
        show();
    });
}


// add cart (장바구니에 담기)
// function add() {
//     $add.forEach(ele => {
//         ele.addEventListener('click', e => {
//             let id = e.currentTarget.parentElement.dataset.id;
//             if (cartList.includes(id)) {
//                 return
//             } else if (list[id].stock !== 0) {
//                 list[id].cart = true;
//                 list[id].stock--;
//                 list[id].cartStock++;
//                 let li = document.createElement('li');
//                 let incBtn = document.createElement('button');
//                 let redBtn = document.createElement('button');
//                 let span = document.createElement('span');
//                 let remBtn = document.createElement('button');
//                 li.dataset.id = list[id].id
//                 li.innerHTML = `
//                 <img src="images/img${list[id].id}-0.jpg" alt="">
//                 `
//                 incBtn.classList.add('incre')
//                 redBtn.classList.add('redu')
//                 span.innerHTML = list[id].cartStock
//                 remBtn.classList.add('remove')

//                 incBtn.innerHTML = `<i class="xi-angle-up"></i>`
//                 redBtn.innerHTML = `<i class="xi-angle-down"></i>`
//                 remBtn.innerHTML = `<i class="xi-cart-remove"></i>`

//                 $cartUl.append(li)
//                 li.append(incBtn)
//                 li.append(redBtn)
//                 li.append(span)
//                 li.append(remBtn)

//                 cartPM(incBtn, redBtn)
//                 cartRemove(remBtn)
//                 cartList.push(id)
//                 show();
//             }
//         })
//     })
// }
function addToCart(id) {
    if (!cartList.includes(id) && list[id].stock !== 0) {
        list[id].cart = true;
        updateStock(id, -1, 1);
        cartList.push(id);
    }
}

function add() {
    $add.forEach(ele => {
        ele.addEventListener('click', e => {
            let id = e.currentTarget.parentElement.dataset.id;
            if (!list[id].cart) {
                addToCart(id);
                let li = document.createElement('li');
                let incBtn = document.createElement('button');
                let redBtn = document.createElement('button');
                let span = document.createElement('span');
                let remBtn = document.createElement('button');

                li.dataset.id = list[id].id;
                li.innerHTML = `<img src="images/img${list[id].id}-0.jpg" alt="">`;
                incBtn.classList.add('incre');
                redBtn.classList.add('redu');
                span.innerHTML = list[id].cartStock;
                remBtn.classList.add('remove');

                incBtn.innerHTML = `<i class="xi-angle-up"></i>`;
                redBtn.innerHTML = `<i class="xi-angle-down"></i>`;
                remBtn.innerHTML = `<i class="xi-cart-remove"></i>`;

                $cartUl.append(li);
                li.append(incBtn);
                li.append(redBtn);
                li.append(span);
                li.append(remBtn);

                cartPM(incBtn, redBtn);
                cartRemove(remBtn);
                show();
            }
        });
    });
}


// total price (총 금액)
function totalPrice() {
    let cartItems = list.filter(item => item.cart === true);
    let prices = cartItems.map(item => item.price);
    let cartStocks = cartItems.map(item => item.cartStock);
    let total = 0;

    for (let i = 0; i < prices.length; i++) {
        total += (prices[i] * 0.9) * cartStocks[i]
    }
    if (prices.length === 0) total = 0;

    $price.innerHTML = `상품 금액 ${priceToString(total)}원 + 배송비 3,000원 = ${priceToString(total + 3000)}원`
}

// order cart +/- (주문하기 장바구니 수량 증감)
function cartPMC(incBtnC, redBtnC) {
    incBtnC.addEventListener('click', e => {
        let id = e.currentTarget.parentElement.parentElement.dataset.id
        if (list[id].stock !== 0) {
            list[id].stock--
            list[id].cartStock++
            e.currentTarget.nextElementSibling.textContent = list[id].cartStock;
            showCart();

        }
    })
    redBtnC.addEventListener('click', e => {
        let id = e.currentTarget.parentElement.parentElement.dataset.id
        if (list[id].cartStock !== 1) {
            list[id].stock++
            list[id].cartStock--
            e.currentTarget.previousElementSibling.textContent = list[id].cartStock;
            showCart()
        }
    })
    $cartUl.innerHTML = '';
    for (let i = 0; i < cartList.length; i++) {
        let li = document.createElement('li');
        let incBtn = document.createElement('button');
        let redBtn = document.createElement('button');
        let span = document.createElement('span');
        let remBtn = document.createElement('button');
        li.dataset.id = cartList[i];
        li.innerHTML = `
            <img src="images/img${cartList[i]}-0.jpg" alt="">
            `
        incBtn.classList.add('incre')
        redBtn.classList.add('redu')
        span.innerHTML = list[i].cartStock
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
    }
    show();
}

// remove order cart (주문하기 장바구니 제거)
function cartRemoveC(remBtnC) {
    remBtnC.addEventListener('click', e => {
        let id = e.currentTarget.parentElement.dataset.id

        list[id].stock += list[id].cartStock;
        list[id].cartStock = 0;
        list[id].cart = false
        list[id].heart = false
        e.currentTarget.parentElement.remove()
        cartList = cartList.filter(item => item !== id);
        totalPrice()
        if (cartList.length === 0) $cartpageUl.innerHTML = '<li class="t"><img class="timg" src="images/T.png" alt="텅"></li>'
    })
}

// check order cart (주문하기 장바구니 체크)
function chkC(chkBtnC) {
    chkBtnC.addEventListener('click', e => {
        e.currentTarget.classList.toggle('on')
    })
}

// order cart show (주문하기 장바구니 출력)
function showCart() {
    $cartpageUl.innerHTML = ''
    if (cartList.length === 0) $cartpageUl.innerHTML = '<li class="t"><img class="timg" src="images/T.png" alt="텅"></li>'
    cartList.forEach((ele, idx) => {
        let liC = document.createElement('li');
        let chkBtnC = document.createElement('i');
        let stock = document.createElement('div');
        let price = document.createElement('div');
        let incBtnC = document.createElement('button');
        let redBtnC = document.createElement('button');
        let spanC = document.createElement('span');
        let remBtnC = document.createElement('i');
        let idC = cartList[idx]


        chkBtnC.classList.add('xi-check-circle-o')
        liC.append(chkBtnC)
        liC.innerHTML = `
        <img src="images/img${list[idC].id}-0.jpg" alt="">
        <p>${list[idC].name}</p>
        `
        incBtnC.classList.add('increB')
        redBtnC.classList.add('reduB')
        spanC.innerHTML = list[idC].cartStock
        remBtnC.classList.add('xi-close')

        incBtnC.innerHTML = `<i class="xi-angle-up"></i>`
        redBtnC.innerHTML = `<i class="xi-angle-down"></i>`
        stock.classList.add('stock')
        stock.append(incBtnC)
        stock.append(spanC)
        stock.append(redBtnC)
        liC.append(stock);

        price.classList.add('price')
        price.innerHTML = `
        <strong class="ori_pB">${priceToString(list[idC].price)}원</strong>
        <strong class="sal_pB">${priceToString(list[idC].price * 0.9)}원</strong>
        `
        liC.append(price)
        liC.append(remBtnC)
        liC.dataset.id = list[idC].id
        liC.insertBefore(chkBtnC, liC.firstChild);
        $cartpageUl.append(liC)

        cartPMC(incBtnC, redBtnC)
        cartRemoveC(remBtnC)
        chkC(chkBtnC)


    })
    totalPrice()
}

// 찜 상품 담기
$jjimCart.addEventListener('click', e => {
    for (let i = 0; i < idList.length; i++) {
        list[idList[i]].heart = true;
    }
    deduList = idList.filter(item => !cartList.includes(item));
    if (deduList.length != 0) {
        for (let i = 0; i < deduList.length; i++) {

            list[deduList[i]].cart = true;
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

// remove cart all (장바구니 비우기)
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
        cartList = []
        show()
    }
})

// order cart (장바구니 주문하기)
$goOrder.addEventListener('click', e => {
    $bg.style.display = 'block'
    $loading.style.display = 'block'

    setTimeout(() => {
        $bg.style.display = 'none'
        $loading.style.display = 'none'
        $wrap.style.display = 'none'
        $wrapC.style.display = 'block'
        showCart();
        window.scrollTo(0, 0);
    }, 1000);
    $chk = getAll('#wrapB #container .cartUl_box ul li .xi-check-circle-o')
})

$ord.addEventListener('click', e => {
    $bg.style.display = 'block'
    $loading.style.display = 'block'

    setTimeout(() => {
        $bg.style.display = 'none'
        $loading.style.display = 'none'
        $wrap.style.display = 'none'
        $wrapC.style.display = 'block'
        showCart();
        window.scrollTo(0, 0);
    }, 1000);
    $chk = getAll('#wrapB #container .cartUl_box ul li .xi-check-circle-o')
})

// more btn (더 보기 버튼)
$more.addEventListener('click', e => {
    uh += 635;
    if (uh === 2520) {
        uh = 2520;
        $more.style.display = 'none'
    }
    $ul_box.style.height = uh + 'px';
});

// logo click (로고 클릭)
$logo.addEventListener('click', e => {
    $wrap.style.display = 'block'
    $wrapC.style.display = 'none'
    $cartUl.innerHTML = '';

    for (let i = 0; i < cartList.length; i++) {
        let li = document.createElement('li');
        let incBtn = document.createElement('button');
        let redBtn = document.createElement('button');
        let span = document.createElement('span');
        let remBtn = document.createElement('button');
        li.dataset.id = cartList[i];
        li.innerHTML = `
            <img src="images/img${cartList[i]}-0.jpg" alt="">
            `
        incBtn.classList.add('incre')
        redBtn.classList.add('redu')
        span.innerHTML = list[cartList[i]].cartStock
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
    }
    show();
    window.scrollTo(0, 0);
})

// today (header 오늘만 특가)
$today.addEventListener('click', e => {
    $wrap.style.display = 'block'
    $wrapC.style.display = 'none'
    $cartUl.innerHTML = '';

    for (let i = 0; i < cartList.length; i++) {
        let li = document.createElement('li');
        let incBtn = document.createElement('button');
        let redBtn = document.createElement('button');
        let span = document.createElement('span');
        let remBtn = document.createElement('button');
        li.dataset.id = cartList[i];
        li.innerHTML = `
            <img src="images/img${cartList[i]}-0.jpg" alt="">
            `
        incBtn.classList.add('incre')
        redBtn.classList.add('redu')
        span.innerHTML = list[cartList[i]].cartStock
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
    }
    show();
    window.scrollTo(0, 0);
})