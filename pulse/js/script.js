$(document).ready(function(){
    $('.carousel__image').slick({
        dots: true,
        speed: 1500, /* м.с */
        prevArrow:'<button type="button" class="slick-prev"><img src="icon/left.png"></button>',
        nextArrow:'<button type="button" class="slick-next"><img src="icon/right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings:{
                    dots: true,
                    arrows: false
                }
            }
        ]
      });
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function catalogSlide (item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
              e.preventDefault();
              $('.catalog-item__static').eq(i).toggleClass('catalog-item__static_active');
              $('.catalog-item__add').eq(i).toggleClass('catalog-item__add_active');
            });
        });
    }
    catalogSlide('.catalog-item__back');
    catalogSlide('.catalog-item__link');



    // Modal

    $("[data-modal = consultation]").on("click", function(){
        $(".overlay, #consultation").fadeIn();
    });



    $(".modal__close").on("click", function(){
        $(".overlay, #consultation, #order, #thanks").fadeOut();
    });


    $(".button_catalog-item").each(function(i){
        $(this).on("click", function(){
            $("#order .modal__desc").text($(".catalog-item__subtitle").eq(i).text());
            $(".overlay, #order").fadeIn();
        });
        
    });

    function validateForms (form)
    {
        $(form).validate({
            rules:{
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите своё имя",
                phone: "Введите номер телефона",
                email: "Введите email"
            } 
        });
    }
    validateForms("#order form");
    validateForms("#consultation form");
    validateForms("#consultation-form");

    $("input[name=phone]").mask("+7 (999) 999-99-99");

    $("form").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "../mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $("#consultation, #order").fadeOut();
            $(".overlay, #thanks").fadeIn();
            $("form").trigger("reset");
        });
        return false;
    });
    
    // scroll 
    $(window).scroll(function () {
        if ($(this).scrollTop()> 1500) {
            $(".page-up").fadeIn();
        }
        else {
            $(".page-up").fadeOut();
        }
    });

    $(function(){
        $("#up").click(function(){
                const _href = $(this).attr("href");
                $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                return false;
        });

    });

    new WOW().init();
});