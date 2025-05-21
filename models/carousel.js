document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("cart-carousel");

    window.scrollCarousel = function(direction) {
        let scrollAmount = carousel.offsetWidth * 0.8;
        carousel.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
    };
});
