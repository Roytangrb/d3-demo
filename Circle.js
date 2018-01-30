var margin3 = {"top": 10, "bottom": 10, "left": 30, "right":20};


var width3 = 960 - margin3.left - margin3.right;
var height3 = 160 - margin3.top - margin3.bottom;

var data3 = [20, 30, 40, 50];

var chart3 = d3.select(".chart3")
				.attr("transform", "translate(" + margin3.left + ", " + margin3.top + ")")
				.attr("width", width3)
				.attr("height", height3);

var cirChart = chart3.selectAll("g")
					.data(data3)
					.enter()
					.append("circle")
					.attr("cx", function(d, i){
						return 100 * i + 2*d;
					})
					.attr("cy", 50)
					.attr("r", function(d, i){
						return d ;
					})
					.attr("fill", "steelblue");

var data3_2 = [40, 30, 20, 10];

var data3_join = data3.concat(data3_2);

chart3.selectAll("g")
	.data(data3_join)
	.enter()
	.data(data3_2)
	.append("circle")
	.attr("cx", function(d, i){
		return 100 * i + 4*d + 400;
		})
	.attr("cy", 50)
	.attr("r", function(d, i){
		return d ;
	})
	.attr("fill", function(d){
		return "#" + d * 99 % 1000;
	});

				