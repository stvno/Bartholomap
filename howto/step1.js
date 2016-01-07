function stepOne () {
  showCalc(); 
  console.log('Step 1');
  FILESLOADED = false;
  FILESLOADING = true;
  queue(2)
    .defer(d3.text, "data/airports.txt")               //open flight airport csv file
    .defer(d3.text, "data/routes.txt")                 //open flight routes csv file
    .defer(d3.json, "data/populated_places.geojson")   //natural earth popoluated places geojson 
    .await(loaded)
  }

function loaded (error,airports,routes,places) {
    //read airports.dat and store it in airports
    //airport id (ofl), name, city, country, iata/faa, icao, lat, long, altitude, timezone, dst, tz
    AIRPORTS = d3.csv.parseRows(airports).map(function(row) {
        //we want 1 begin, so all begin airports are mapped to the center 
        if (BEGIN.airportcodes.indexOf(parseInt(row[4]))>-1) {
            return {
                airport: -1,
                name: "Central airports",
                iata: "BEGIN",
                lat: BEGIN.center.lat,
                lon: BEGIN.center.lon,
                height: parseFloat(row[8])
            }
        }
        else {
            return {
                airport: parseInt(row[0]),
                name: row[1],
                iata: row[4],
                lat: parseFloat(row[6]),
                lon: parseFloat(row[7]),
                height: parseFloat(row[8])
            }
        }
    });
    //read routes.dat, join it with airports and store it in routes
    //airline, airline id, source airport (iata), source airport id (ofl), destination airport (iata), destination airport id (ofl), codeshare, stops, equipment

    ROUTES = d3.csv.parseRows(routes).map(function(row) {    
        var rij = {
            source: row[2],
            sourceid: parseInt(row[3]),     
            destination: row[4],
            destinationid: parseInt(row[5])
        }
        //we want 1 london, so all london airports are remapped to the center of london
        if (BEGIN.airports.indexOf(row[2])>-1) {
            rij.sourceid = -1;
            rij.source = "BEGIN";
        }
        if (BEGIN.airports.indexOf(row[2])>-1) {
            rij.destinationid = -1;
            rij.destination = "BEGIN";
        }
        return rij;
    });
   PLACES = places;
   FILESLOADED = true;
   FILESLOADING = false;
   hideCalc();
}

document.getElementById('filesChanged').onchange = function filesChanged (e) {
    NEWFILES = e.target.checked;
}

stepOne();