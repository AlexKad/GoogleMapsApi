var geocoder, holder;
var mapsHolders = [
{
	holderId:'map_holder1',
	address:"USA, New York",
	zoom:13
}, {
	holderId:'map_holder2',
    address: "Russia, Saint-Peterburg"
 }];

function initMap () {
	geocoder = new google.maps.Geocoder();	
	mapsHolders.forEach(function(el){
	 	var map = createMap(el.holderId, el.zoom);
	 	codeAddress(el.address, map);
	});
};
function createMap(el, zoom){
    holder = document.getElementById(el);
    var startConifg = {
    	center: {lat: -34.397, lng: 150.644},
		zoom: zoom || 8};

    var config = jQuery.extend(startConifg, getMapConfig());
	return new google.maps.Map(holder, config);
};
function getMapConfig(){
	return {
		zoomControl: document.getElementById('showZoomChk').checked,
		scaleControl: document.getElementById('showScaleChk').checked,
		streetViewControl: document.getElementById('showStreetViewChk').checked,
		rotateControl: document.getElementById('showRotateChk').checked
	}
};
function codeAddress(address, map) {  
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

