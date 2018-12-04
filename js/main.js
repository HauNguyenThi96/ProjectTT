function slide_option(item) {
	if(!item){
		item = 3;
	}
	var result = {
    margin: 10,
    nav: true,
    navText: ['<img class="arrow_left" src="images/arrow-left.png"/>', '<img class="arrow_right" src="images/arrow-right.png"/>'],
    autoplay: true,
	 autoplayTimeout: 6000,
	 autoplayHoverPause: false,
    loop: true,
	 responsiveClass: true,
	 items: item,
    responsive: {
      0: {
        items:1
      },
      400: {
        items: 2
      },
      800: {
        items: 3
      },
      1200: {
        items: item
      }
    }
  }
  return result;
}

$(document).ready(function() {
	// scroll windown
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		if(scroll>70){
			$(".top-header").addClass('fix-header');
		}else{
			$(".top-header").removeClass('fix-header');
		}
	});
	// main-menu
	$("#main-menu>nav>ul>li>a").click(function(e) {
		e.preventDefault();
		$(this).parent().toggleClass("active");
        $(this).find("i").toggleClass('fa-angle-down fa-angle-up');
        
	});

	$(".menu").click(function() {
		$(".main-right .menu-sidebar").toggleClass('active-nav');
	});

	// button search
	$("#clickbtn").click(function() {
		$(".search .fr-search>.input-form").fadeToggle("3000");
	});
	
	// tab-sp 
  var tab_id ="";
	$('.list-product .partition1 ul.tabs li').click(function(e){
		e.preventDefault();
		 $('.list-product ul.tabs li').removeClass('current');
	    $(this).addClass('current'); 

      tab_id = $(this).attr('data-tab');
       $('list-product .tab-content').removeClass('current');
	    $(".list-product #"+tab_id).addClass('current');

    sessionStorage.setItem('view_product', tab_id);
	});

  if(sessionStorage.getItem('view_product')){
    id=sessionStorage.getItem('view_product');

  // tab đó addclass current cả tab và nội dung
      // xóa tất cả tab active
      $('.list-product ul.tabs li').removeClass('current');
      $('.list-product ul.tabs li[data-tab="'+id+'"]').addClass('current');

      
      $('.list-product .tab-content').removeClass('current');
      $(".list-product #"+id).addClass('current');
    }
		$('.fade-Out').owlCarousel({
            items: 1,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: false,
            loop: true,
            margin: 10,
         });
	// hieu ung san pham

		index=$('.owl-product-new .item1').length;
		$('.owl-product-new').owlCarousel(slide_option(index));

		index1=$('.owl-product-sale .item1').length;
		$('.owl-product-sale').owlCarousel(slide_option(index1));

		index2=$('.owl-product-special .item1').length;
		$('.owl-product-special').owlCarousel(slide_option(index2));
	
       $(".sp_pre").click(function () {
	        $(".product-item").trigger('prev.owl.carousel');
	       
	    });
       $(".sp_next").click(function () {
	        $(".product-item").trigger('next.owl.carousel'); 
	    });
               // phần product
               $(".category li a i").click(function(e) {
               	e.preventDefault();
              		//$(this).parent().next("ul").toggleClass('current');
              		$(this).parent().next("ul").slideToggle();
              		$(this).toggleClass('fa-caret-right fa-caret-down');
               });
               // list and grid
               $(".list-icon button i").click(function() {
      					var view="";
               		if($(this).parent().hasClass('list')){
               			$(".products").addClass('list').removeClass('grid');
               			
               			$(this).addClass("active");
               			 $(".list-icon button.grid i").removeClass('active');

               			localStorage.setItem("view","list");
               			
               		}
               		else{
               			$(".products").addClass('grid').removeClass('list');
               			$(this).addClass("active");
               			$(".list-icon button.list i").removeClass('active');
               			localStorage.setItem("view","grid");
               		}
               });
               if(localStorage.getItem("view")=="list"){
               		$(".products").addClass('list').removeClass('grid');
               		 $(".list-icon button.grid i").removeClass('active');
               		 $(".list-icon button.list i").addClass('active');
               }else{
               		$(".products").addClass('grid').removeClass('list');
               		 $(".list-icon button.list i").removeClass('active');
               		 $(".list-icon button.grid i").addClass('active');
               }

});