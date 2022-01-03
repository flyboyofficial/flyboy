$(".introSlider").slick({
  dots: true,
  infinite: true,
  arrows: false,
  speed: 500,
  fade: true,
  cssEase: "linear",
});
$(".welcomeSlider").slick({
  centerMode: true,
  slidesToShow: 3,
  prevArrow: $(".prev"),
  nextArrow: $(".next"),
  centerPadding: "0",
  // responsive: [
  //   {
  //     breakpoint: 768,
  //     settings: {
  //       arrows: false,
  //       centerMode: true,
  //       centerPadding: "40px",
  //       slidesToShow: 3,
  //     },
  //   },
  //   {
  //     breakpoint: 480,
  //     settings: {
  //       arrows: false,
  //       centerMode: true,
  //       centerPadding: "40px",
  //       slidesToShow: 1,
  //     },
  //   },
  // ],
});
$(".roadmapSlider").slick({
  slidesToShow: 3,
  infinite: false,
  prevArrow: $(".roadPrev"),
  nextArrow: $(".roadNext"),
  responsive: [
    {
      breakpoint: 1340,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});
var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menuBtn");
var body = document.body;
menuBtn.onclick = function () {
  menu.classList.toggle("active");
  menuBtn.classList.toggle("active");
  body.classList.toggle("active");
};
window.onclick = function (event) {
  if (event.target == menu) {
    menu.classList.remove("active");
    menuBtn.classList.remove("active");
    body.classList.remove("active");
  }
};
