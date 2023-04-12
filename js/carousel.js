setTimeout(() => {
  bulmaCarousel.attach('#carousel-demo', {
      slidesToScroll: 1,
      slidesToShow: 4,
      pagination: false,
      infinite: true
  });
}, 200);
