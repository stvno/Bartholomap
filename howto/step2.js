
function stepTwo () {
	showCalc();
	console.log('Step 2');
	var beginLat = document.getElementById('beginLat');
	beginLat.value = BEGIN.center.lat;
	var beginLon = document.getElementById('beginLon');
	beginLon.value = BEGIN.center.lon;
	var beginAirports = document.getElementById('beginAirports');
	beginAirports.value = BEGIN.airportcodes.toString();
	document.getElementById('beginSubmit').onclick = beginSubmit;
	hideCalc();
}

function beginSubmit () {
	showCalc();
	if(beginLat.validity.valid&&beginLon.validity.valid&&beginAirports.validity.valid) {
		BEGIN.center.lat = beginLat.value;
		BEGIN.center.lon = beginLon.value;
		BEGIN.airportcodes = beginAirports.value.split(',');
		document.getElementById('beginCode').style.display = 'none';
		stepOne();
		d3.select("#output2")
        .html(function(d){return 'var BEGIN = '+JSON.stringify(BEGIN)})
        .attr('class','output active');
        DATACHANGED = true;
	}
	else console.warn('invalid');
	hideCalc();
	return false;
}

stepTwo();