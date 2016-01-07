
function stepThree () {
    showCalc();
    console.log('Step 3');
    DATACHANGED = true;
    var speed = parseInt(document.getElementById('flightSpeed').value)*1000;
    var i = ROUTES.length;
    FLIGHTTIMES = ROUTES.map(function(d){
        console.log(i--)
        var a = AIRPORTS.filter(function(e){return e.iata == d.source})
        var t = AIRPORTS.filter(function(e){return e.iata == d.destination})
        if(a.length >0 &&t.length>0){
            return {
                beginlat: a[0].lat,
                beginlon: a[0].lon,
                endlat: t[0].lat,
                endlon: t[0].lon,
                flighttime: ArcTime(a[0],t[0],speed),
                source:d.sourceid,
                dest:d.destinationid,
                start:d.source,
                end:d.destination,
                valid: true
            }
         }
         else { //there are some flights with airports that are not on the airports-list, drop them
            return {
                beginlat: null,
                beginlon: null,
                endlat: null,
                endlon: null,
                flighttime: null,
                source:null,
                dest:null,
                start:null,
                end: null,
                valid: false
                }
            }
       });  
   //The 5 London airports are missing from the list, add them with a traveltime of 0
   BEGIN.airports.forEach(function (d) {
       FLIGHTTIMES.push({
            beginlat: BEGIN.center.lat,
            beginlon: BEGIN.center.lon,
            endlat: d.lat,
            endlon: d.lon,
            flighttime: 0,
            source:-1,
            dest:d.id,
            start:'BEGIN',
            end:d.iata,
            valid: true
        })
    })
    d3.select("#output3")
    .html(function(d){return d3.csv.format(ROUTES)})
    .attr('class','output active');
    hideCalc();
}

document.getElementById('flightSubmit').onclick = function flightSubmit (e) {
    showCalc();
    var flightSpeed = document.getElementById('flightSpeed');
    if(flightSpeed.validity.valid) {
        showCalc();
        window.setTimeout(function(){stepThree()},20);  
    }
    else console.warn('invalid')
    return false;
}