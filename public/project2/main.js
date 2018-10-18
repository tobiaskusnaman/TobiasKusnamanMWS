var mymap = L.map('mapid').setView([-6.1952697716, 106.8197515234], 13);

var foodResult = []

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidG9iaWFza3VzbmFtYW4iLCJhIjoiY2pkZTl0bWliMDhtdDMzam95bmY2NHMwcCJ9.JPWTQAjVSRabl5xrm_eexw'
}).addTo(mymap);

function onClickMarker(data, e) {
  let popup = L.popup()
  popup
    .setLatLng(e.latlng)
    .setContent(`${data.restaurant.name} | ${data.restaurant.location.locality}`)
    .openOn(mymap);
  mymap.setView(e.latlng, 14)
}

function searchFood() {
  let searchedFood = document.getElementById('food-input').value
  if (searchedFood) {
    fetch(`https://developers.zomato.com/api/v2.1/search?q=${searchedFood}`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        'user-key': '330e4c80b5708e65437f228f961b2758'
      }
    })
    .then(response => response.json())
    .then(responseJson => {
      // console.log('coba error', responseJson)
      foodResult = responseJson.restaurants

      for (m of foodResult) {
        let restaurantLocation =  [m.restaurant.location.latitude, m.restaurant.location.longitude]
        L.marker(restaurantLocation)
          .addTo(mymap)
          .on('click', onClickMarker.bind(null, m))
      }
    })
    .catch(err => {
      alert('get data error', err)
      console.log('coba error bawah', err)
    })
  } else {
    alert('Input makanannya dulu ya')
  }
}