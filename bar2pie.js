var data7 = [
  ["Iceland",14.1],
  ["Egypt",30.4],
  ["Syria",27.6],
  ["Malaysia",17.5],
  ["Japan",8.3],
  ["USA",12.7],
  ["Taiwan",8.5],
  ["India",21.8],
  ["Germany",8.1]
];

var path7 = d3.select(".bar2pie1").selectAll("path")
				.data(data7)
				.enter()
				.append("path")

path7.attr("d", function(d, i){
	//console.log(d);
	var x1 = 100;
	var x2 = 100 + d[1] * 22;
	var y1 = i * 40;
	var y2 = i * 40 + 30;

	return ("M " + x1 + " " + y1 + 
			"L " + x2 + " " + y1 + 
			"L " + x2 + " " + y2 + 
			"L " + x1 + " " + y2 + "Z");
});

var color7 = d3.scaleOrdinal(d3.schemeCategory10);

path7.attr("fill", function(d,i){
	return color7(d[0]);
});

var sum7 = 0;
for (var i = 0; i < data7.length; i++){
	data7[i].push(sum7);
	sum7 += data7[i][1];
}

// create arc
var arc7 = d3.arc()
				.innerRadius(180)
				.outerRadius(200);

path7.transition().duration(2000)
		.attr("transform", "translate(400, 200)")
		.attr("d", function(d, i){
			return arc7.startAngle(Math.PI * 2 * d[2] / sum7)
					.endAngle(Math.PI * 2 * (d[2] + d[1]) / sum7);
		});