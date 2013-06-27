measure = {};
measure.property = new Array();
measure.unit = new Array();
measure.factor = new Array();

measure.property[0] = "Length";
measure.unit[0] = new Array("Meter (m)", "Angstrom (A')", "Astronomical measure.unit (AU)", "Caliber (cal)", "Centimeter (cm)", "Kilometer (km)", "Ell", "Em", "Fathom", "Furlong", "Fermi (fm)", "Foot (ft)", "Inch (in)", "League (int'l)", "League (UK)", "Light year (LY)", "Micrometer (mu-m)", "Mil", "Millimeter (mm)", "Nanometer (nm)", "Mile (int'l nautical)", "Mile (UK nautical)", "Mile (US nautical)", "Mile (US statute)", "Parsec", "Pica (printer)", "Picometer (pm)", "Point (pt)", "Rod", "Yard (yd)");
measure.factor[0] = new Array(1, 1E-10, 1.49598E11, .000254, .01, 1000, 1.143, 4.2323E-03, 1.8288, 201.168, 1E-15, .3048, .0254, 5556, 5556, 9.46055E+15, .000001, .0000254, .001, 1E-9, 1852, 1853.184, 1852, 1609.344, 3.08374E+16, 4.217518E-03, 1E-12, .0003514598, 5.0292, .9144);

measure.property[1] = "Mass";
measure.unit[1] = new Array("Kilogram (kg)", "Gram (g)", "Milligram (mg)", "Microgram (mu-gr)", "Carat (metric)(ct)", "Hundredweight (long)", "Hundredweight (short)", "Pound(lb)", "Pound(troy)", "Ounce(oz)", "Ounce(troy)", "Slug", "Ton (assay)", "Ton (long)", "Ton (short)", "Ton (metric)", "Tonne");
measure.factor[1] = new Array(1, .001, 1e-6, .000000001, .0002, 50.80235, 45.35924, .4535924, .3732417, .02834952, .03110348, 14.5939, .02916667, 1016.047, 907.1847, 1000, 1000);

measure.property[2] = "Temperature";
measure.unit[2] = new Array("Celsius ('C)", "Fahrenheit ('F)", "Kelvin ('K)", "Rankine ('R)");
measure.factor[2] = new Array(1,  0.555555555555, 1, 0.555555555555);
tempIncrement = new Array(0, -32, -273.15, -491.67);

measure.property[3] = "Time";
measure.unit[3] = new Array("Second (sec)", "Day (mean solar)", "Day (sidereal)", "Hour (mean solar)", "Hour (sidereal)", "Minute (mean solar)", "Minute (sidereal)", "Month (mean calendar)", "Second (sidereal)", "Year (calendar)", "Year (tropical)", "Year (sidereal)");
measure.factor[3] = new Array(1, 8.640E4, 86164.09, 3600, 3590.17, 60, 60, 2628000, .9972696, 31536000, 31556930, 31558150);

measure.property[4] = "Velocity & Speed";
measure.unit[4] = new Array("Meter/second (m/sec)", "Foot/minute (ft/min)", "Foot/second (ft/sec)", "Kilometer/hour (kph)", "Knot (int'l)", "Mile (US)/hour (mph)", "Mile (nautical)/hour", "Mile (US)/minute", "Mile (US)/second", "Speed of light (c)", "Mach (STP)(a)");
measure.factor[4] = new Array(1, 5.08E-03, .3048, .2777778, .5144444, .44707, .514444, 26.8224, 1609.344, 299792458, 340.0068750);

measure.property[5] = "Volume";
measure.unit[5] = new Array("Cubic Meter (m&sup3;)", "Cubic centimeter", "Cubic millimeter", "Acre-foot", "Barrel (oil)", "Board foot", "Bushel (US)", "Cup", "Fluid ounce (US)", "Cubic foot", "Gallon (UK)", "Gallon (US,dry)", "Gallon (US,liq)", "Gill (UK)", "Gill (US)", "Cubic inch (in&sup3;)", "Liter (new)", "Liter (old)", "Ounce (UK,fluid)", "Ounce (US,fluid)", "Peck (US)", "Pint (US,dry)", "Pint (US,liq)", "Quart (US,dry)", "Quart (US,liq)", "Stere", "Tablespoon", "Teaspoon", "Ton (register)", "Cubic yard");
measure.factor[5] = new Array(1, .000001, .000000001, 1233.482, .1589873, .002359737, .03523907, .0002365882, .00002957353, .02831685, .004546087, .004404884, .003785412, .0001420652, .0001182941, .00001638706, .001, .001000028, .00002841305, .00002957353, 8.8097680E-03, .0005506105, 4.7317650E-04, .001101221, 9.46353E-04, 1, .00001478676, .000004928922, 2.831685, .7645549);


measure.insertlist = function(listno,propIndex)
{
    var listtype = propIndex+'choice'+listno;
    var list = '<input type="number" id="'+propIndex+'input'+listno+'" data-theme="a" data-clear-btn="true" onkeyup=convert('+propIndex+','+(((listno==='1')?'true':'false'))+'); /> <select name="'+ listtype+'" id="'+listtype+'" data-theme="a" onChange=convert('+propIndex+','+(((listno==='1')?'true':'false'))+');>';
    for(var i=0,tot=measure.unit[propIndex].length;i<tot;++i)
            list = list + '<option>'+measure.unit[propIndex][i]+'</option>';
    list=list+'</select>';
    return list;
};

function convert(propIndex,convert1to2){
	var sourceFactor;
        var sourceIndex;
	var targetFactor;
        var targetIndex;
	var result;
        sourceIndex = document.getElementById(propIndex+"choice"+(convert1to2?'1':'2')).selectedIndex;
	sourceFactor = measure.factor[propIndex][sourceIndex];
        targetIndex = document.getElementById(propIndex+"choice"+(convert1to2?'2':'1')).selectedIndex;
	targetFactor = measure.factor[propIndex][targetIndex];
	result = document.getElementById(propIndex+"input"+(convert1to2?'1':'2')).value;
	if (measure.property[propIndex] === "Temperature"){
		result = parseFloat(result) + tempIncrement[sourceIndex];
	}
	result = result * sourceFactor;
	result = result / targetFactor;
	if (measure.property[propIndex] === "Temperature"){
		result = parseFloat(result) - tempIncrement[targetIndex];
	}
	document.getElementById(propIndex+"input"+(convert1to2?'2':'1')).value = Math.round(result*1000000)/1000000;
}

$(document).ready(function(){
  var node = document.getElementsByClassName('list');
    for(var i=0,tot=node.length;i<tot;++i)
            node[i].innerHTML=measure.insertlist(node[i].dataset.listno,parseInt(node[i].dataset.propindex));
    });