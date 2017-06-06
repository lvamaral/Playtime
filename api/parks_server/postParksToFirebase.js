import * as firebase from 'firebase';
import secrets from './secrets2';

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
    query: 'dog park'
  };

  const service = new google.maps.places.PlacesService(map);

  service.textSearch(request, (results, status) => {
    if (status === 'OK') {
      debugger
    } else {
      debugger
    }
  });
})
