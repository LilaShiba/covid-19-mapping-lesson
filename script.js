// get location
let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
(function geoFind(){
    if('geolocation' in navigator){
        document.getElementById("myp").textContent = "Geolocation Enabled"
        navigator.geolocation.getCurrentPosition(success, (error)=>{console.log(error)}, options);
    }
})()


function success(pos){
    let lat =  pos.coords.latitude;
    let lon =  pos.coords.longitude;
    let txt =  `Lat: ${lat.toFixed(2)} Lon: ${lon.toFixed(2)}`
    document.getElementById('myp').textContent = txt
    console.log(lat, lon)
    console.log(`More or less ${pos.coords.accuracy} meters.`);
    // make title
    let mymap = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your key here'
    }).addTo(mymap);
}

// show tools-sensors



// if api key issues
    // show love
    // const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    // // 
    // const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    // const tiles = L.tileLayer(tileUrl, { attribution });
    // tiles.addTo(mymap);


