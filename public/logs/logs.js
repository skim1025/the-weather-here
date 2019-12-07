
const mymap = L.map('checkinMap').setView([0,0], 1);
const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreepMap</a> contributors';
const tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';  
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);

getLocation();

async function getLocation (){
    const response = await fetch('/api');
    const data = await response.json();

    for(datum of data){
        const marker = L.marker([datum.lat, datum.lon]).addTo(mymap);
        let txt =` The weather here at ${datum.lat}&deg, ${datum.lon}&deg is ${datum.weather.summary} with a temperature of 
        ${datum.weather.temperature}&degC.` ;

        if(datum.airq.value < 0){
            txt += ' No air quality reading is available at this location.'
        } else {
            txt += `The concentration of particulate matter ${datum.airq.parameter} is 
            ${datum.airq.value}${datum.airq.unit} last read on ${datum.airq.lastUpdated}.`;
        }
        marker.bindPopup(txt);
        console.log(datum.airq.value);
    }
        console.log(data);

/*
        const root = document.createElement('p');
        const location = document.createElement('p');
        const timestamp = document.createElement('p');  
      
        location.textContent = `${datum.lat} , ${datum.lon}`;
        const timestampString = new Date(datum.timestamp).toLocaleString();
        timestamp.textContent = timestampString;
        
        root.append(location,timestamp);
        document.body.append(root);
 */ 
};


