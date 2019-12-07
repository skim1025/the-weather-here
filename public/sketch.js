    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position => {
            let lat, lon, weather, airq;
            try{
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                document.getElementById('latitude').textContent = lat.toFixed(2);
                document.getElementById('longitude').textContent = lon.toFixed(2);
                //setting up a proxy server for Dark Sky
                const apiURL =`weather/${lat},${lon}`;
                const response = await fetch(apiURL);
                const json = await response.json();
                console.log(json);
                weather = json.weather.currently;
                airq = json.air_quality.results[0].measurements[0];
                document.getElementById('summary').textContent = weather.summary;
                document.getElementById('temperature').textContent = weather.temperature; 
                document.getElementById('aq_parameter').textContent = airq.parameter; 
                document.getElementById('aq_value').textContent = airq.value; 
                document.getElementById('aq_unit').textContent = airq.unit; 
                document.getElementById('aq_date').textContent = airq.lastUpdated; 
            } catch(error){
                console.error(error);
                console.error("No readings");
                airq = {value: -1};
                document.getElementById('aq_value').textContent = 'NO READING'; 
            }     

            const data = {lat, lon, weather, airq};
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const db_resopnse = await fetch('/api', options);
            const db_json = await db_resopnse.json();
            console.log(db_json);
   
        });
    } else {
        console.log('geolocation not available');
    };   
    