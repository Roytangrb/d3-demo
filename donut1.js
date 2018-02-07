var marginp2 = {top: 20, right: 20, bottom: 20, left:20},
	widthp2 = 500 - marginp2.left - marginp2.right,
	heightp2 = 500 - marginp2.bottom - marginp2.left,
	radius2 = widthp2/2;

var arcColor2 = d3.scaleLinear()
	.range([255, 0]);
	//.range(["#BBDEFB", "#98CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);
//arc genrator for the pie chart
var arc2 = d3.arc()
	.outerRadius(radius2 - 10)
	.innerRadius(radius2 - 50);

//create the label arc
var labelArc2 = d3.arc()
	.outerRadius(radius1 - 30)
	.innerRadius(radius1 - 30);

//pir generator calculate the angle
var donut1 = d3.pie()
	.sort(null)
	.value(function(d){
		return d.Value;
	});

var donut_svg = d3.select(".donut1")
	.attr("width", widthp2)
	.attr("height", heightp2)
	.append("g")
	.attr("class", "pie1_group")
	.attr("transform", "translate(" + widthp2/2 + ", " + heightp2/2 + ")");

// import the data
d3.csv("pie1.csv", function(error, data){
	if (error){
		throw error;
	}

	data.forEach(function(d){
		//convert to number
		d.Value = +d.Value;
		//do nothing, keep the string
		d.District = d.District;
	});

	arcColor2.domain([17, 0]);

	//create the arc
	var pie1_g = donut_svg.selectAll(".arc2")
		.data(pie1(data)) // use the pie generatot
		.enter().append("g")
		.attr("class", "arc2");

	//append the path of the arc to the pie1_g
	pie1_g.append("path")
		.attr("d", arc2)
		.style("fill", function(d){
			return "rgba(0, " + arcColor1(d.data.Value)+ ", 0, 0.7)";
		})
		.attr("stroke", "#fff")
		.transition()
		.ease(d3.easeLinear)
		.duration(1000)
		.attrTween("d", pieTween2);
		

	//append the text labels, need to create a new arc for labels
	//use arc.centriod to calculate the midpoint

	pie1_g.append("text")
		.attr("class", "label1")
		.transition()
		.ease(d3.easeLinear)
		.duration(1000)
		.attr("transform", function(d){
			return "translate(" + labelArc2.centroid(d) + ")"; // new 
		})
		.attr("dy", "0.55em")
		.text(function(d){
			return "" + d.data.Value;
		});
});

function pieTween2(b){
	b.innerRadius = 0;
	var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
	return function(t){
		return arc2(i(t));
	}

}