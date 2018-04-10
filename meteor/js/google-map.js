 function initMap() {
        var uluru = {lat: 50.4184144, lng: 30.5796313};
        var map = new google.maps.Map(document.querySelector('.map'), {
          zoom: 10,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }