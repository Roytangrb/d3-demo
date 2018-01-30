var data1 = [20, 49, 70, 23, 13, 35 , 45];

var scale1 = d3.scaleLinear()
	.domain([0, d3.max(data1)])
	.range([0, 500])

d3.select("#chart1")
	.selectAll("div")
	.data(data1)
	.enter()
	.append("div")
	.style("width", function(d){
		return scale1(d) + 'px';
	})
	.text(function(d){
		return d;
	});

console.log("this is to create a simple bat chart1");