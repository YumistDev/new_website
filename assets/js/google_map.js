
(function($) {

    'use strict';

    $(document).ready(function() {
      var minZoomLevel = 7;
      var maxZoomLevel = 16;

      var gurgaon_latitude =  28.4700;
      var gurgaon_longitude = 77.0300;
      var zoomLevel = 12;
      var mapElement = document.getElementById('google-map');
      var mapOptions = {
          // How zoomed in you want the map to start at (always required)
          zoom: zoomLevel,
          disableDefaultUI: true,
          // The latitude and longitude to center the map (always required)
          center: new google.maps.LatLng(latitude, longitude),

          // Map styling
          styles: [{
              featureType: 'water',
              elementType: 'all',
              stylers: [{
                  hue: '#e9ebed'
              }, {
                  saturation: -78
              }, {
                  lightness: 67
              }, {
                  visibility: 'simplified'
              }]
          }, {
              featureType: 'landscape',
              elementType: 'all',
              stylers: [{
                  hue: '#ffffff'
              }, {
                  saturation: -100
              }, {
                  lightness: 100
              }, {
                  visibility: 'simplified'
              }]
          }, {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{
                  hue: '#bbc0c4'
              }, {
                  saturation: -93
              }, {
                  lightness: 31
              }, {
                  visibility: 'simplified'
              }]
          }, {
              featureType: 'poi',
              elementType: 'all',
              stylers: [{
                  hue: '#ffffff'
              }, {
                  saturation: -100
              }, {
                  lightness: 100
              }, {
                  visibility: 'off'
              }]
          }, {
              featureType: 'road.local',
              elementType: 'geometry',
              stylers: [{
                  hue: '#e9ebed'
              }, {
                  saturation: -90
              }, {
                  lightness: -8
              }, {
                  visibility: 'simplified'
              }]
          }, {
              featureType: 'transit',
              elementType: 'all',
              stylers: [{
                  hue: '#e9ebed'
              }, {
                  saturation: 10
              }, {
                  lightness: 69
              }, {
                  visibility: 'on'
              }]
          }, {
              featureType: 'administrative.locality',
              elementType: 'all',
              stylers: [{
                  hue: '#2c2e33'
              }, {
                  saturation: 7
              }, {
                  lightness: 19
              }, {
                  visibility: 'on'
              }]
          }, {
              featureType: 'road',
              elementType: 'labels',
              stylers: [{
                  hue: '#bbc0c4'
              }, {
                  saturation: -93
              }, {
                  lightness: 31
              }, {
                  visibility: 'on'
              }]
          }, {
              featureType: 'road.arterial',
              elementType: 'labels',
              stylers: [{
                  hue: '#bbc0c4'
              }, {
                  saturation: -93
              }, {
                  lightness: -2
              }, {
                  visibility: 'simplified'
              }]
          }]
      };

     var map = new google.maps.Map(mapElement, mapOptions);

        $('#map-zoom-in').click(function() {
            if(maxZoomLevel > zoomLevel)
            map.setZoom(++zoomLevel);
        });

        $('#map-zoom-out').click(function() {
          if(minZoomLevel < zoomLevel)
            map.setZoom(--zoomLevel);
        });

        var  gurgaon_url = 'http://www.yumist.com/Delhi.kml';
        init(map,gurgaon_latitude,gurgaon_longitude,gurgaon_url,zoomLevel);

        $("#GurgaonTabButton").click(function(){
          init(map,gurgaon_latitude,gurgaon_longitude,gurgaon_url);
        })

        $("#DelhiTabButton").click(function(){
          delhi_url = 'http://www.yumist.com/Delhi.kml';
          init(map,28.6139,77.2090);
        })

        $("#BangaloreTabButton").click(function(){
          bangalore_url = 'http://www.yumist.com/Delhi.kml';
          init(map,28.6139,77.2090);
        })
    });

    function init(map, latitude,longitude,url,zoom) {

         var ctaLayer = new google.maps.KmlLayer({
           url: url,
           map: map
         });

        map.setCenter(new google.maps.LatLng(latitude,longitude));
    }

})(window.jQuery);
