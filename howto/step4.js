function stepFour () {
	showCalc();
	console.log('Step 4')
	var mynodes = {};
	var graph = new Graph(); //The graph for dijkstra
	//check if data is loaded
	if(!DATACHANGED) {
		queue(1)
	    .defer(d3.csv, "./data/time.csv")
	    .await(ready)
	}
	else if( FLIGHTTIMES.length ==0) {
		showCalc();
		stepThree();
		stepFour();
	}
	else {
		calculateRoute();
	}

    function ready(error,time) {
    	FLIGHTTIMES = time;
    	calculateRoute();
	    }

	function calculateRoute () {
		DATACHANGED = true;
		var cnt = FLIGHTTIMES.length;
    	FLIGHTTIMES.forEach(function(a){
	        if(JSON.parse(a.valid)) {
	            if(mynodes[a.start]===undefined) mynodes[a.start] = {};
	            mynodes[a.start][a.end] = parseFloat(a.flighttime);
	            if(mynodes[a.end]===undefined) mynodes[a.end] = {};
	            mynodes[a.end][a.start] = parseFloat(a.flighttime);
	        }
	    })
	    for(var key in mynodes) {
	        graph.addVertex(key, mynodes[key]);
	        cnt++;
	    }
	    for(var key in mynodes) {
	        console.log(cnt); //this process takes ages, the console.log is to give you a hint of progress
	        var p = graph.shortestPath('BEGIN',key)
	        var length = calculateLength(p,FLIGHTTIMES)
	        if(p.length>0) {
	            DIJKSTRA.push({
	                destination:key,route:p.toString(),length:length,stops:p.length
	            })
	        }
	        cnt--;
		}
	    //print the CSV on the screen
	d3.select("#output4")
	.html(function(d){return d3.csv.format(DIJKSTRA)})
	.attr('class','output active');	
	hideCalc();

    }	
}

document.getElementById('dijkstraSubmit').onclick = function flightSubmit (e) {
	showCalc()
    stepFour();
    return false;
}