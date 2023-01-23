//Swiper

const swiper = new Swiper('.swiper', {
    
    direction: 'horizontal',
    loop: true,
    
    autoplay: {
        delay: 6000,
    },

    effect: 'fade',
    fadeEffect: {
    crossFade: true
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
});