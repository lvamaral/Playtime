import * as firebase from 'firebase';
var secrets = require('./secrets2');
var request = require('superagent');
var sha1 = require('sha1');
var cloudinary = require('cloudinary');

document.addEventListener('DOMContentLoaded', () => {
  var config = {
    apiKey: secrets.apiKey,
    authDomain: secrets.apiKey,
    databaseURL: secrets.databaseURL,
    projectId: secrets.projectId,
    storageBucket: secrets.storageBucket,
    messagingSenderId: secrets.messagingSenderId
  };

  cloudinary.config({
    cloud_name: 'dfuh8ucrc',
    api_key: secrets.cloudinaryAPIKey,
    api_secret: secrets.cloudinarySecret
  });

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
      for(let i = 0; i < 15; i++) {
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
            let photoUrl = place.photos[0].getUrl({maxHeight: (place.photos[0].height), maxWidth: (place.photos[0].width)});
            //
            // let formData = new FormData();
            // formData.append('file', photoUrl);
            // formData.append('upload_preset', 'wwjtxpa2');

            // fetch('https://api.cloudinary.com/v1_1/dfuh8ucrc/image/upload',
            //   {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //       'Accept': 'application/json',
            //       'Content-Type': 'multipart/form-data'
            //     }
            //   }
            // ).then(
            //   res => {
            //     console.log(res);
            //   }
            // )

            // let signature = sha1(`public_id=` + place.name + '&timestamp=' + Date.now() + secrets.cloudinarySecret);
            //
            // let formData = new FormData();
            // formData.append(`timestamp`, `${Date.now()}`);
            // formData.append(`public_id`, place.name);
            // formData.append(`api_key`, `${secrets.cloudinaryAPIKey}`);
            // formData.append('file', photoUrl);
            // // formData.append(`signature`, signature);
            // formData.append('upload_preset', 'wwjtxpa2');
            //
            // debugger

            // fetch('https://api.cloudinary.com/v1_1/dfuh8ucrc/image/upload', {
            //   method: 'POST',
            //   body: {
            //     upload_preset: 'wwjtxpa2',
            //     file: photoUrl
            //   },
            //   header: {
            //     'content-type': 'multipart/form-data',
            //   }
            // }).then(res => {
            //   debugger
            // });
            let parkId = db.ref().child('parks').push().key;
            db.ref('parks/' + parkId).set({
              name: place.name,
              address: place.formatted_address.slice(0, place.formatted_address.length - 15),
              photoUrl: photoUrl,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              parkId: parkId
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
