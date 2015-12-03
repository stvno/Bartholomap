# Bartholomap
A project to create a modern version of the 1914 travel map by John George Bartholomew see [this](http://www.telegraph.co.uk/travel/travelnews/12027166/What-travelling-was-like-100-years-ago.html)

The goal is to create a modern day (slippy) map with the isochrones from London, taking into account the fastest mode of travel if possible. Initially it is not important to take into account transfer times, actual timetables etc.

I've started discussing this on the Spatial Community Slack and I figured it would be nice to have a central place where all the ideas are being stored, so this is it.

 * using selected cities (bigger ones with airports) and estimate flight duration with the length of the great circle distance? http://dbsgeo.com/arc.js/
 * use OSRM for actual routing together with data from: http://openflights.org/data.html or https://github.com/jpatokal/openflights they provide a lat/lon, but you'd need to identify an actual node in OSM to create the link OSRM has a nearest-neighbour search you might be able to make use of.  With a wee bit of C++ hackery, you could have it return the OSM nodeID of the nearest node on a routable road.
 
Links of note:

 * http://seenthis.net/messages/391490
 * http://geo.gob.bo/blog/spip.php?article119
 * http://forobs.jrc.ec.europa.eu/products/gam
 * http://rocs.hu-berlin.de/