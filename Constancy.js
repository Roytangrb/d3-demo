var margin5 = {top: 40, bottom: 30, left: 30, right:20};

var width5 = 960 - margin5.left - margin5.right;
var height5 = 500 - margin5.top - margin5.bottom;

var y5 = d3.scaleLinear().range([300, 0]);

var chart5 = d3.select(".chart5")
				.attr("width", 960)
				.attr("height", 500)
				.append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


d3.json("birth.json", function(error, data){

	chart5.selectAll("g")
	.data(data)
	.enter()
	.append("g")
	.attr("transform", "translate(" + function(d, i){
		return 33 * i + 20;
	} + ", " + height5 + ")")
	.attr("x", 0)
	.attr("y", function(d, i){
		return height5 - d["2006"] * 10;
	})
	.attr("height", function(d){
		return d["2006"] * 10;
	})
	.attr("width", 32);
});


