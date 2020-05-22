
/* First, we want to create a Main function to help us organize 
    the logic of our program and to house the functions we will use.
    Plan out how your code will work. Check out that states' geojson and
    the Covid API https://covidtracking.com/api. What work needs to be done?
    I like to think about what functions do I need to do aka what is the big problem
    and how and I break it down into smaller repeatable subproblems.
*/

(async function main(){
    // create map and add states layer
    let[L, mymap] = mapInit()
    // get covid api data and clean and add to geoJSON
    statesData = await covidData(statesData);
    // check data
    console.log(statesData)
    // add color to states based on covid rates
    L.geoJson(statesData, {style: style}).addTo(mymap);
    // legend

})()

// subproblems
function mapInit(){
    // add locate user funcntion geolocation
    let mymap = L.map('map').setView([37.8, -96], 4);
    // api call to mapbox
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your key here'
    }).addTo(mymap);
    // add states to map
    L.geoJson(statesData).addTo(mymap);
    // return map and layer object
    return [L, mymap]
}



function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0'
}

// add color to geojson data
function style(feature) {
    return {
        // change to covid json feature
        fillColor: getColor(feature.properties.covid),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// covid api call
async function covidData(statesData){
    let url = 'https://covidtracking.com/api/states/daily'
    let res = await fetch(url)
    let data = await res.json()
    let newdata = []
    // get only most recent data
    data = data.splice(0,56)
    // cycle through covid data
    for(let i=0; i <56; i++){
        // remove that which is not in geoJSON (ideally would just add these to geoJSON)
        console.log(data[i].state)
        let arr = ['AS','GU', 'MP', 'VI', 'PR']
        if (!arr.includes(data[i].state)){
                newdata.push(data[i])
            }
    }
    for(let i =0; i<50; i++){
        console.log(statesData.features[i].properties.name +":"+ newdata[i].state+ ":"+ newdata[i].positiveIncrease)
        statesData.features[i].properties.covid = newdata[i].positiveIncrease
    }
    return statesData
}


/* Personalize or create your own map!
    add a legend, hover feature, change to symbol map
    to make more ethical.

    Can you use user location to show state data?
    is there an api that shows detailed states' data?

    Don't want to think of cornoa virus? Can you make a
    tracker for Santa, Internation Space Station, Ships, etc?
*/
