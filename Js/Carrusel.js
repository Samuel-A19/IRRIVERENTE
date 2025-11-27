document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 3000 },
        breakpoints: {
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 }
        }
    });
});
