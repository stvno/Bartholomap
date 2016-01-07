
/* great circle distance per
http://www.movable-type.co.uk/scripts/latlong.html
*/

Number.prototype.toRadians = function() {
   return this * Math.PI / 180;
}

var ArcTime = function(begin,end,speed) {
    var lat1 = begin.lat;
    var lat2 = end.lat;
    var lon1 = begin.lon;
    var lon2 = end.lon;    

    var R = 6371000; // metres
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2-lat1).toRadians();
    var Δλ = (lon2-lon1).toRadians();

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return d/speed;
}

var calculateLength = function(route,timetable){
    route.push("BEGIN"); //graph.shortestPath doesn't give the starting position
    var length = 0;
    for(var i =0; i<route.length-1;i++){
        length += timetable.filter(function(d){
            return (
                (d.end == route[i] && d.start == route[i+1]) ||
                (d.end == route[i+1] && d.start == route[i])
                )
            })[0].flighttime; //we're not picky on the direction of the flight
    }
    return length;
}

function showCalc () {
    var e = document.getElementById('calculating');
    e.style.display = 'flex';
}
function hideCalc () {
    var e = document.getElementById('calculating');
    e.style.display = 'none';
}