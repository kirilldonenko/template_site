//    Отображение и скрытие меню mobile-nav в мобильной версии

$(".mobile-nav__btn").click(function () {
  $(".main-nav__list").toggle();
});

//    Отображение и скрытие меню main-nav__list-sub в 
//    десктопной и планшетной версии

$("#catalog").click(function (event) {
  event.preventDefault();
  event.stopPropagation();
  $(".main-nav__list-sub").toggle();
});

//    Отображение и скрытие меню main-nav__list-sub2-1 в 
//    десктопной и планшетной версии

$("#link-sub2-1").click(function (event) {
  event.preventDefault();
  event.stopPropagation();
  $("#list-sub2-1").toggle();
});

//    Отображение и скрытие меню main-nav__list-sub2-2 в 
//    десктопной и планшетной версии

$("#link-sub2-2").click(function (event) {
  event.preventDefault();
  event.stopPropagation();
  $("#list-sub2-2").toggle();
});


