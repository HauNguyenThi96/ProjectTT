

function slide_option(item) {
	if(!item){
		item = 3;
	}
	var result = {
    margin: 10,
    dots:false,
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
var NumberPrice = (value) => {
 	return(Intl.NumberFormat('de-De').format(value));
 }
 
 // tính tổng giá từng cái
var price_each_item = (item)=> {
	var price = parseFloat(item.find(".price--val").attr("data-price"));
	var quantity = parseInt(item.find(".btn--number-cart").val());
	var total = price*quantity;

	//SHOW THIS PRICE IN HTML
	//var number_to_currency = total.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");
	var number_to_currency = NumberPrice(total);
	item.find(".curency_price").html(number_to_currency);

	return total;
}

var price_all_item = (target)=>{
	var total = 0;
	target.find('.item').each(function() {
		total = total + price_each_item(jQuery(this));
	});

	//SHOW THIS PRICE IN HTML
	var number_to_currency = NumberPrice(total);
	target.find(".add-total--val .curency_price").html(number_to_currency);

	return total;
}
var validate = (evt) =>{
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	var regex = /[0-9]|\./;
	if( !regex.test(key) ) {
	theEvent.returnValue = false;
	if(theEvent.preventDefault) theEvent.preventDefault();
	}
}
var footerSticky = ()=> {
		var footerHeight = $('footer').outerHeight(); 
		$('main').css('padding-bottom', footerHeight);
	}
var autoHeight = () =>{
   // $('main').css('min-height', 0);
   $('main').css('min-height', ($(document).height() - $('header').height() - $('footer').height()));
 }
 

// slide product
$(document).ready(function() {
	// -------------stcky footer-----------
	 //    autoHeight();
		// $(window).resize(function() {
		//    autoHeight();
		//  });
        new WOW().init();
	// -------------------scroll menu------------------ 
	$(window).scroll(function(){
		if($(window).scrollTop()>100){
			$(".top-header").addClass('fix--header');
		}else{
			$(".top-header").removeClass('fix--header');
		}
	});
	// -----------------main-menu---------------------
	$(".main-menu>ul >li >a").click(function(){
		$(this).parent().toggleClass('active');
		$(this).find('i').toggleClass('fa-angle-down fa-angle-up');
	})
	$(".main--moblie .main-menu ul li a i").click(function(e){
		e.preventDefault();
		 $(this).parent().next('ul').slideToggle();
		 $(this).toggleClass('fa-angle-down fa-angle-up');
	});
	$('.header-main .search #btn-cart').click(function(e){
		$('.header-main .search .top-cart-content').show();
		
	});
	$(".toggle").click(function(){	
		$(this).toggleClass('active');
		$('.main--moblie').toggleClass('active')
	});


	//------------------click button-------------------
	$('.search #btnSearch').click(function(e) {
		e.preventDefault();
		$(".top-header .searchbar").fadeToggle();
	});
	//---------------key up text of button --------
	
	$('.header-main .searchbar #input-search').keyup(function(){
		
		

	});

	// --------------------sản phẩm-------------------------
	index=$('.owl-product-new .thumbnail').length;
	$('.owl-product-new').owlCarousel(slide_option(index));

	index1=$('.owl-product-hot .thumbnail').length;
	$('.owl-product-hot').owlCarousel(slide_option(index1));

	index2=$('.owl-product-special .thumbnail').length;
	$('.owl-product-special').owlCarousel(slide_option(index2));
	$('.slider .owl-carousel').owlCarousel({
	     dots:false,
	      slideSpeed : 500,
	      margin:10,
	      paginationSpeed : 400,
	      autoplay:true,
	      items : 1, 
	      itemsDesktop : false,
	      itemsDesktopSmall : false,
	      itemsTablet: false,
	      itemsMobile : false,
	      loop:true,
	      nav:true,
		 responsiveClass: true,
	  });
	// --------------------tab-------------------------------
	$(".tab-product a[data-toggle='tab']").on('shown.bs.tab',function(e){
		 //e.target // newly activated tab
  		//e.relatedTarget // previous active tab
		//value=$(e.target).attr('href');
		// console.log(value);
		localStorage.setItem('key',$(e.target).attr('href'));
	});
		id=localStorage.getItem('key');
		if(id){
			$('.tab-product a[href="'+id+'"').tab('show');
		}
	// ------------------------back-to-top---------------------
	$(window).scroll(function(){
		if($(this).scrollTop()>2600){
			$(".top-back #top").fadeIn();
		}else{
			$(".top-back #top").fadeOut();
		}
	});
	$(".top-back #top").click(function(){
		$('html,body').animate({
			scrollTop:0,
		},400);
		return false;
	});
	// ----------------get modal product in each item---------
	$(".thumbnail .add-item .btn-customer").click(function(){
		

	});
	// -----------------add number product----------------
	price_all_item(jQuery(".mini-cart-product"));

	jQuery(document).on('click', '.quantity-select [class*="btn--number-cart-"]', function(){
		var input = $(this).parents(".input-group").children(".btn--number-cart");
		var quantity = parseInt(input.val());
		var min = input.attr("min");
		var max = input.attr("max");

	    if($(this).hasClass("btn--number-cart-add")){
			quantity < max ? quantity = quantity + 1 : max;
	    }else{
	    	quantity > min ? quantity = quantity - 1 : min;
	    }
	    input.val(quantity);
	    price_all_item(jQuery(".mini-cart-product"));
	});
	//Sự kiện dùng với keyup
	$('.quantity-select .btn--number-cart').keyup(function(e) {
		//chỉ cho nhập số
		this.value = this.value.replace(/[^0-9\.]/g,'');
		//validate(e);
		var quantity=parseInt(this.value);
		console.log(quantity);
		var min = parseInt($(this).attr("min"));
	 	var max = parseInt($(this).attr("max"));
	 	
		if(quantity > max){
			$(this).val(max);
		}
		if(isNaN(quantity) || quantity < min){			
			$(this).val(min);
		}
		price_all_item(jQuery(".mini-cart-product"));
	});
	// xóa từng item
	$(".remove-item-cart").click(function(){
		var result = confirm("Bạn có chắc chắn muốn xóa không?")
		if(result){
			$(".mini-cart-product .item").each(function(i) {
				$(this).remove(i);
				price_all_item(jQuery(".mini-cart-product"));
			});	
		}
		
		if(isNaN(parseInt($('.add-total .curency_price').val()))){
			$(".top-cart-content .mini-cart-product").remove();
			$(".top-cart-content ").append("<div class='cart-empty'>Gỉo hàng đang trống</div>");

			}
	});
	
	// ----------------sub number product-----------------
	//-------------PRODUCT---- menu---------------------
	$("a[data-toggle='collapse'] #show--menu-aside").click(function(e){
		e.preventDefault();
		$(this).toggleClass('fa-caret-right fa-caret-down')
	});
	$(".common-side .category li a").click(function(){
		$(this).parent().toggleClass('active');
	});
	// -------------------list and grid---------------
	$(".list-icon button i").click(function(){
		var view="";
		if($(this).parent().hasClass('list')){
			$('.products .product--item').addClass("list-group-item").removeClass("grid-group-item");
			$(this).addClass("active");
            $(".list-icon button.grid i").removeClass('active');
            localStorage.setItem('view','list');
		}else{
			$('.products .product--item').addClass("grid-group-item").removeClass("list-group-item");
			$(this).addClass("active");
            $(".list-icon button.list i").removeClass('active');
            localStorage.setItem('view','grid');
		}
	});
	if(localStorage.getItem("view")=="list"){
   		$(".products .product--item").addClass('list-group-item').removeClass('grid-group-item');
   		 $(".list-icon button.grid i").removeClass('active');
   		 $(".list-icon button.list i").addClass('active');
    }else{
   		$(".products .product--item").addClass('grid-group-item').removeClass('list-group-item');
   		 $(".list-icon button.list i").removeClass('active');
   		 $(".list-icon button.grid i").addClass('active');
    }   	
	// ----------------footer-------------------
	$(".footer-item h3 i").click(function(){
		$(this).parents().next().slideToggle();
		$(this).toggleClass('fa-chevron-right fa-chevron-down');
	});
	// thay thế ảnh lồi bằng ảnh mặc định
	// $('img').error(function() {
	// 	$(this).attr("src","http://i1.wp.com/webfaver.com/wp-content/uploads/2015/11/noIMG.png")
	// });
	
});