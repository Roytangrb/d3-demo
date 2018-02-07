var margin5 = {top: 40, bottom: 30, left: 30, right:20};

var width5 = 960 - margin5.left - margin5.right;
var height5 = 500 - margin5.top - margin5.bottom;

var y5 = d3.scaleLinear().range([300, 0]);

var chart5 = d3.select(".chart5")
				.attr("width", 960)
				.attr("height", 500)
				.append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
var data5;
var bars;
d3.json("births.json", function(error, data){
	if (error) {
		console.log(error);
		throw error;
	}
	
	data5 = data;

	bars = chart5.selectAll("g")
	.data(data5)
	.enter()
	.append("g")
	.attr("transform", function(d, i){
		return "translate(0, " + 33 * i + ")";
	})
	.append("rect")
	.transition()
	.attr("width", function(d){
		return d[year5[count5 % 3]] * 10;
	})
	.attr("height", 32)
	.attr("fill", "steelblue");
});

var year5 = [2006, 2011, 2016];
var count5 = 0;
/*
d3.interval(function (){
	//2006 2011 2016
	//var year_index = Math.floor(Math.random() * 3);
	// count5 ++;
	// chart5.selectAll("g")
	// .update()
	// .append("g")
	// .attr("transform", function(d, i){
	// 	return "translate(0, " + 33 * i + ")";
	// })
	// .append("rect")
	bars.selectAll("rect").transition()
	.attr("width", function(){
		return data5[year5[count5 % 3]] * 10;
	})
	.attr("height", 32)
	.attr("fill", "steelblue");
}, 2000);

*/


