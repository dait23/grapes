// JavaScript for themezinho
(function($) {
$(document).ready(function() {
	"use strict";
	
	
	
	// // Hamburger Menu
	// 	$('.menu-btn').on('click', function(e) {
	// 	$(".menu-btn").toggleClass("active");
	// 	$(".bars .bar").toggleClass("rotated");
	// 	$("main").toggleClass("move-left");
	// 	$("body").toggleClass("overflow-hidden");
	// 	});
		
		
	// Search Form		
		$('.search-icon').on('click', function(e) {
		$(".search-wrapper").toggleClass("active");
		});
		
		
	// // Slider News
	// 	 $('.slider-for').slick({
	// 	  slidesToShow: 1,
	// 	  slidesToScroll: 1,
	// 	  arrows: false,
	// 	  fade: true,
	// 	  asNavFor: '.slider-nav'
	// 	});
	// 	$('.slider-nav').slick({
	// 	  slidesToShow: 4,
	// 	  slidesToScroll: 1,
	// 	  asNavFor: '.slider-for',
	// 	  dots: false,
	// 	  arrows:false,
	// 	  centerMode: false,
	// 	  focusOnSelect: true
	// 	});


	// // Carousel 4 Col
	// 	$('.carousel-4col').slick({
	// 	  infinite: true,
	// 	  slidesToShow: 4,
	// 	  slidesToScroll: 1,
	// 	  responsive: [
 //    {
 //      breakpoint: 1025,
 //      settings: {
 //        slidesToShow: 3,
 //        slidesToScroll: 3,
 //        infinite: true,
 //        dots: true
 //      }
 //    },
 //    {
 //      breakpoint: 769,
 //      settings: {
 //        slidesToShow: 2,
 //        slidesToScroll: 2
 //      }
 //    },
 //    {
 //      breakpoint: 481,
 //      settings: {
 //        slidesToShow: 1,
 //        slidesToScroll: 1
 //      }
 //    }
 //    // You can unslick at a given breakpoint now by adding:
 //    // settings: "unslick"
 //    // instead of a settings object
 //  ]
	// 	});


	// // Carousel Single
	// 	$('.single-item').slick();
		
	// // News Ticker
	// 	$('.news-ticker').slick({
	// 	  	vertical: true,
	// 	  	autoplay: true,
 //  			autoplaySpeed: 3000
	// 	});
		
	// // Circle Progress
	// 	$('.circle').circleProgress({
	// 		value: 0.9
	// 	}).on('circle-animation-progress', function(event, progress) {
	// 		$(this).find('strong').html(parseInt(90 * progress) + '<i>%</i>');
	// 	});
		
		
		
		}); 
	
	// // Instagram
	// 	var feed = new Instafeed({
	// 		target: 'instagram-feed',
	// 		get: 'user',
	// 		limit:'8',
	// 		resolution:'standard_resolution',
	// 		userId: 2159343205,
	// 		accessToken: '2159343205.745c638.c0db721c61724a52a1f48eebba50ab67',
	// 		template: '<li><a href="{{image}}"><img src="{{image}}" /></a></li>'
	// 	});
	// 	feed.run();
	
	
	
	// // Masonry
	// 	$(window).load(function(){
	// 	var $container = $('.masonry');
	// 	$container.masonry({
	// 	  columnWidth: 0,
	// 	  itemSelector: '.masonry li'
	// 	});
	// 	});
	
	
	
	// Sticky Sidebar	
		jQuery(document).ready(function($) {
		$( '.sidebar' ).wrap( '<div class="wrap"></div>' ); // wrap it up
		$( '<div class="sticky-stop"></div>' ).insertAfter( '.candy-wrapper' );// stop it!
		var sidebarheight, mainheight;
		var cushion = 0; // cushion for spapping to the bottom 
		
		
		});

})(jQuery);