var AIRPORTS = [];// Global to store airports
var ROUTES = [];  // Glocal to store all the routes
var PLACES = {};  // Glocal to store all the places
var DATACHANGED = false; //data has changed, recalculate the next steps
var FILESLOADED = false;
var FILESLOADING = false;
//Define the startpoint of your map here;
//BEGIN.center = the coordinate of your BEGIN point {lat,lon}
//BEGIN.airports = array of airport-iata codes you want to associate with your BEGIN point (0 travel time)
var BEGIN = { 
	center: {lat:51.5287352,lon:-0.3817734},
	airportcodes: ['LTN','LGW','LCY','LHR','STN'], //Lutton, Gatwick, City, Heathrow, Stansted
	airports: [
		{iata:'LTN',lat:51.874722,lon:-0.368333,id:492},
	    {iata:'LGW',lat:51.148056,lon:-0.190278,id:502},
	    {iata:'LCY',lat:51.505278,lon:0.055278,id:503},
	    {iata:'LHR',lat:51.4775,lon:-0.461389,id:507}, 
	    {iata:'STN',lat:51.885,lon:0.235,id:548}
    ]
}

var FLIGHTTIMES = [];
var DIJKSTRA = [];