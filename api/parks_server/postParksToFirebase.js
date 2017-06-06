import * as firebase from 'firebase';
import secrets from './secrets2';
var request = require('superagent');

document.addEventListener('DOMContentLoaded', () => {
  var config = {
    apiKey: secrets.apiKey,
    authDomain: secrets.apiKey,
    databaseURL: secrets.databaseURL,
    projectId: secrets.projectId,
    storageBucket: secrets.storageBucket,
    messagingSenderId: secrets.messagingSenderId
  };
  const db = firebase.initializeApp(config).database();

  const sf = new google.maps.LatLng(37.757693, -122.437797);

  const map = new google.maps.Map(document.getElementById('map'), {
    center: sf,
    zoom: 15
  });

  const request = {
    location: sf,
    radius: '5000',
    keyword: 'dog park'
  };

  const service = new google.maps.places.PlacesService(map);

  service.radarSearch(request, (results, status) => {
    if (status === 'OK') {
      for(let i = 0; i < 1; i++) {
        (function (j) {
          let request = {
            placeId: results[i]['place_id']
          };

          var service = new google.maps.places.PlacesService(map);
          setTimeout(function() {
            service.getDetails(request, callback)
          }, j * 1000);
        })(i);

        function callback(place, status) {
          if(status === 'OK') {
            let photoUrl = place.photos[0].getUrl({maxHeight: place.photos[0].height, maxWidth: place.photos[0].width});
            let parkId = db.ref().child('parks').push().key;
            db.ref('parks/' + parkId).set({
              name: place.name,
              address: place.formatted_address.slice(0, place.formatted_address.length - 15),
              photoUrl: photoUrl,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            });
          } else {
            console.log(status);
          }
        }
      }
    } else {
      console.log(status);
    }
  });
})
