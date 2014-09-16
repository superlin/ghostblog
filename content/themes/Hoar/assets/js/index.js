/**
 * Main JS file for Ghost */

/*globals jQuery, document */
(function ($) {

	$(document).ready(function(){

		var docBody = $('html, body');

		if($('.menu_top').length > 0) {
			//toggle mobile menu
			$('.toggle-mobile-menu').click(function( event ) {
				event.preventDefault();
				$('#menu ul').slideToggle("slow");
				$(this).toggleClass("open");
			});

			//add active style for current page
			$('#menu a[href="'+ location.pathname +'"]').addClass("active");
		}

		//scroll page on top
		$('.post-template .to_top a').click(function( event ) {
			event.preventDefault();
			docBody.animate({ scrollTop: 0 });
		});

	});

}(jQuery));


/**
 * ===== custom js map stuff =====
 * version: 0.1
 * author: anton repjov
 * created: Jun 18, 2014
 * ========== example of use in blog =========
 <mapper>
 {
 "lat": 47.221860,
 "lng": 38.922286,
 "width": "100%",
 "height": "200px",
 "zoom": "16",
 "markerTitle": "any text here",
 "mapDraggable": false,
 "scrollwheel": false
}
 </mapper>
 * ============ end of example ===========
 **/
var config = {
	width: '100%',
	height: '200px',
	lat: -34.397,
	lng: 150.644,
	zoom: 8,
	markerTitle: "We are here",
	mapDraggable: false,
	scrollwheel: false
};

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

//map initializer
function initialize() {
	var position = new google.maps.LatLng(typeof(config.lat)== 'number' ? config.lat : parseInt(config.lat), typeof(config.lng)== 'number' ? config.lng : parseInt(config.lng));
	var mapOptions = {
		zoom: typeof(config.zoom)== 'number' ? config.zoom : parseInt(config.zoom),
		center: position,
		draggable: config.mapDraggable,
		scrollwheel: config.scrollwheel,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false
	};

	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


	marker = new google.maps.Marker({
		position: position,
		title: config.markerTitle,
		icon: '/assets/img/pin.png'
	});

	//drop pin
	marker.setMap(map);


}

var mapper = {

	init: function() {
		this.renderMap();
	},

	renderMap: function() {
		var gph_containers = $("mapper");

		//added class .map_wrapper for wrapper container
		gph_containers.parent().addClass('map_wrapper');

		if(gph_containers.length > 0) {

			var data = JSON.parse( gph_containers.text().replace(/(\r\n|\n|\r)/gm,"") );
			if(data) {
				$.extend(config, data);
			}

			//append google API
			$('head').append('<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initialize" style=""></script>');
			var map_container = $('<div id="map-canvas"></div>');
			map_container.css({
				width: config.width,
				height: config.height
			});
			gph_containers.html(map_container);

		}
	}
}

$(function() {
	mapper.init();
})

function cutname(con, len){
	var tmp;
	if(con.length > len){
		tmp = con.substring(0, len)+"..";
	} else {
		tmp = con;
	}
	return tmp;
}