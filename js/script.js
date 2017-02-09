	/** MAPS **/
	/* Test */
	var map = '';
	function initialize() {
		var mapOptions = {
			center: { lat: 20.59, lng: 78.96},
			zoom: 5
		};
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		//alert ( lat + ":" + lng );
	}

	var myCustomMarkerArray = [];

	function clearMarks () {
		var len = myCustomMarkerArray.length;

		for ( var loop = 0; loop < len; ++ loop	) {
			myCustomMarkerArray[ loop ].setMap ( null );
		}
		myCustomMarkerArray = [];		
	}

	function showMarks ( city, content ) {
		var lat = '';
		var lng = '';

		//var markerImage = "images/car-marker.png";
		var markerImage = "http://www.iamarunkumar.me/syscloud/car-marker.png";
		
		var geoCoder = new google.maps.Geocoder();
		geoCoder.geocode ( {address: city}, function ( results, status ) {
			lat = results[0] .geometry.location.lat();
			lng = results[0] .geometry.location.lng();
			////console.log ( lat );
			////console.log ( lng );

			var prefLatLng = new google.maps.LatLng ( lat, lng );
			var string = '<div id="content" style="width: auto; height: auto; padding: 10px"><p><span style="font-size: 20px; text-transform: UPPERCASE;">' + city + '</span></p><p>Rs. <span style="font-size: 22px;">' + content + '</span></p></div>'; 
			var info = new google.maps.InfoWindow ({
				content: string
			});

			var myCustomMarker = new google.maps.Marker ({
				position: prefLatLng,
				map: map,
				icon: markerImage
			});

			myCustomMarkerArray.push ( myCustomMarker );

			google.maps.event.addListener (myCustomMarker, 'click', function () {
				info.open (map, myCustomMarker );
			});
		});
	}

	google.maps.event.addDomListener(window, 'load', initialize);
	
	/** MAPS **/

jQuery ( document ).ready(function() {

	var cars = new Object ();
	
	//var cities = ["Agra", "Ahmedabad", "Alappuzha", "Alwar", "Amritsar", "Aurangabad", "Bangalore", "Bharatpur", "Bhavnagar", "Bhikaner", "Bhopal", "Bhubaneshwar", "Bodh Gaya", "Calangute", "Chandigarh", "Chennai", "Chittaurgarh", "Coimbatore", "Cuttack", "Dalhousie", "Dehradun", "Delhi", "Diu-Island", "Ernakulam", "Faridabad", "Gaya", "Gangtok", "Ghaziabad", "Gurgaon", "Guwahati", "Gwalior", "Haridwar", "Hyderabad", "Imphal", "Indore", "Jabalpur", "Jaipur", "Jaisalmer", "Jalandhar", "Jamshedpur", "Jodhpur", "Junagadh", "Kanpur", "Kanyakumari", "Khajuraho", "Khandala", "Kochi", "Kodaikanal", "Kolkata", "Kota", "Kottayam", "Kovalam", "Lucknow", "Ludhiana", "Madurai", "Manali", "Mangalore", "Margao", "Mathura", "Mountabu", "Mumbai", "Mussoorie", "Mysore", "Manali", "Nagpur", "Nainital", "Noida", "Ooty", "Orchha", "Panaji", "Patna", "Pondicherry", "Porbandar", "Portblair", "Pune", "Puri", "Pushkar", "Rajkot", "Rameswaram", "Ranchi", "Sanchi", "Secunderabad", "Shimla", "Surat", "Thanjavur", "Thiruchchirapalli", "Thrissur", "Tirumala", "Udaipur", "Vadodra", "Varanasi", "Vasco-Da-Gama", "Vijayawada", "Visakhapatnam"];
	showLoader = function () {
		//jQuery ( ".overlay-screen" )	.addClass ( "show-me" );
		if ( jQuery ( ".overlay-screen" )	.length == 0 )
			jQuery ( '<div class="overlay-screen show-me"><img src="http://www.iamarunkumar.me/syscloud/loading.gif" class="loading" /></div>' )	.appendTo ( "body" );
	};
	
	hideLoader = function () {
		jQuery ( ".overlay-screen" )	.remove ();
	};
	
	showLoader ();
	
	var iVar = 0;
	searchPrice = function ( make, model, variant, cities ) {
	//console.log ( iVar );
	if ( iVar == 0 ) clearMarks ();
		if ( iVar < 4 ) {
			//console.log ( make + ":" + model + ":" + variant + ":" + cities );
			jQuery.ajax ({
				type: 'GET',
				url: 'http://www.hackerearth.com/dataweave/v1/carPricesIndia/findByMake/',
				data: { api_key: '798ee4545240fe84935448f5e588be243f1ef4aa', make: make, model: model, variant: variant, city: cities[iVar], page: '1', per_page: '10' },
				jsonpCallback: 'jsonp',
				dataType: 'jsonp',
				success: function(results){
					if ( parseInt(results.count) > 0 ) {
					var resArr = results.data;
					//console.log ( resArr [0] );
					//for ( var i in resArr ) {
					//jQuery ( "<p>" + resArr[i].city + " : " + resArr[i].crawl_date + ":" + resArr[i].price + ":" + resArr[i].make + ":" + resArr[i].model + ":" + resArr[i].variant + "</p>" )	.appendTo ( "body" );
					////console.log ( resArr [i] );
					//}
							showMarks ( resArr[0].city, resArr[0].price );
						//	//console.log ( iVar );
						
						//console.log ( resArr[0].city + ":" + resArr[0].price );
							
							}
							++ iVar;
							searchPrice ( make, model, variant, cities );
				}
			});
		}
		else 
			hideLoader ();
	};
	
	
	// Gets Unique Make
	
	jQuery.ajax ({
		type: 'GET',
		url: 'http://www.hackerearth.com/dataweave/v1/car_prices/listUniqMakes/',
		data: { api_key: '798ee4545240fe84935448f5e588be243f1ef4aa' },
		jsonpCallback: 'jsonp',
		dataType: 'jsonp',
		success: function(results){
			var resArr = results.data;
			//console.log ( resArr [0] );
			for ( var i in resArr ) {
			//jQuery ( "<p>" + resArr[i].city + " : " + resArr[i].crawl_date + ":" + resArr[i].price + ":" + resArr[i].make + ":" + resArr[i].model + ":" + resArr[i].variant + "</p>" )	.appendTo ( "body" );
			jQuery ( "<option class='make_opt'>" + resArr[i].brand + "</option>" )	.appendTo ( "#make" );
			}
			jQuery ( "#make" ).change();
		}
	});
	
	jQuery ( "#make" )	.on ( 'change', function () {
			showLoader ();
			clearMarks();
							jQuery ( "#model" )	.children ()
												.remove ();
												//alert ( jQuery ( ".overlay-screen" ).length);
							var mak = jQuery ( this )	.val ();
							jQuery.ajax ({
								type: 'GET',
								url: 'http://www.hackerearth.com/dataweave/v1/car_prices/listUniqModels/',
								data: { api_key: '798ee4545240fe84935448f5e588be243f1ef4aa', brand: mak },
								jsonpCallback: 'jsonp',
								dataType: 'jsonp',
								success: function(results){
									var resArr = results.data;
									//console.log ( resArr [0] );
									//jQuery ( "<option>Models</option>" )	.appendTo ( "#model" );
									for ( var i in resArr ) {
									//jQuery ( "<p>" + resArr[i].city + " : " + resArr[i].crawl_date + ":" + resArr[i].price + ":" + resArr[i].make + ":" + resArr[i].model + ":" + resArr[i].variant + "</p>" )	.appendTo ( "body" );
									jQuery ( "<option>" + resArr[i].car + "</option>" )	.appendTo ( "#model" );
									}
									jQuery ( "#model" ).change();
								}
							});
						});
						
	
	jQuery ( "#model" )	.on ( 'change', function () {
	showLoader ();
	clearMarks();
							var mak = jQuery ( "#make" )	.val ();
							jQuery ( "#variant" )	.children ()
												.remove ();
							var model = jQuery ( this )	.val ();
							jQuery.ajax ({
								type: 'GET',
								url: 'http://www.hackerearth.com/dataweave/v1/car_prices/listUniqVariants/',
								data: { api_key: '798ee4545240fe84935448f5e588be243f1ef4aa', brand: mak, car: model },
								jsonpCallback: 'jsonp',
								dataType: 'jsonp',
								success: function(results){
									var resArr = results.data;
									//console.log ( resArr [0] );
									//jQuery ( "<option>Variants</option>" )	.appendTo ( "#variant" );
									for ( var i in resArr ) {
									//jQuery ( "<p>" + resArr[i].city + " : " + resArr[i].crawl_date + ":" + resArr[i].price + ":" + resArr[i].make + ":" + resArr[i].model + ":" + resArr[i].variant + "</p>" )	.appendTo ( "body" );
									jQuery ( "<option>" + resArr[i].model + "</option>" )	.appendTo ( "#variant" );
									}
									hideLoader();
								}
							});
						});
						
	jQuery ( "#search" )	.click ( function () {
		showLoader ();
		
		iVar = 0;
		var make = jQuery ( "#make" ).val ();
		var model = jQuery ( "#model" ).val ();
		var variant = jQuery ( "#variant" ).val ();
		
		var city1 = jQuery ( "#city1" ).val ();
		var city2 = jQuery ( "#city2" ).val ();
		var city3 = jQuery ( "#city3" ).val ();
		var city4 = jQuery ( "#city4" ).val ();
		
		var cities = [city1, city2, city3, city4];
		searchPrice ( make, model, variant, cities );
	});
						
	
	
});