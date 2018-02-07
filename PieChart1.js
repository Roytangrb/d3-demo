var marginp1 = {top: 20, right: 20, bottom: 20, left:20},
	widthp1 = 500 - marginp1.left - marginp1.right,
	heightp1 = 500 - marginp1.bottom - marginp1.left,
	radius1 = widthp1/2;

var arcColor1 = d3.scaleLinear()
	.range([255, 0]);
	//.range(["#BBDEFB", "#98CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);
var arcMax1;
var arcMin1, data6;
//arc genrator for the pie chart
var arc1 = d3.arc()
	.outerRadius(radius1 - 10)
	.innerRadius(0);

//create the label arc
var labelArc1 = d3.arc()
	.outerRadius(radius1 - 30)
	.innerRadius(radius1 - 30);

//pir generator calculate the angle
var pie1 = d3.pie()
	.sort(null)
	.value(function(d){
		return d.Value;
	});

var pieSvg = d3.select(".pie1")
	.attr("width", widthp1)
	.attr("height", heightp1)
	.append("g")
	.attr("class", "pie1_group")
	.attr("transform", "translate(" + widthp1/2 + ", " + heightp1/2 + ")");

// import the data
d3.csv("pie1.csv", function(error, data){
	if (error){
		throw error;
	}

	data6 = data;

	data.forEach(function(d){
		//convert to number
		d.Value = +d.Value;
		//do nothing, keep the string
		d.District = d.District;
	});

	arcMax1 = Math.max(data.Value);
	arcMin1 = Math.min(data.Value);

	arcColor1.domain([17, 0]);

	//create the arc
	var pie1_g = pieSvg.selectAll(".arc1")
		.data(pie1(data)) // use the pie generatot
		.enter().append("g")
		.attr("class", "arc1");

	//append the path of the arc to the pie1_g
	pie1_g.append("path")
		.attr("d", arc1)
		.style("fill", function(d){
			return "rgba(0, 0, " + arcColor1(d.data.Value)+ ", 0.7)";
		})
		.attr("stroke", "#fff")
		.transition()
		.ease(d3.easeLinear)
		.duration(1000)
		.attrTween("d", pieTween);
		

	//append the text labels, need to create a new arc for labels
	//use arc.centriod to calculate the midpoint

	pie1_g.append("text")
		.attr("class", "label1")
		.transition()
		.ease(d3.easeLinear)
		.duration(1000)
		.attr("transform", function(d){
			return "translate(" + labelArc1.centroid(d) + ")"; // new 
		})
		.attr("dy", "0.55em")
		.text(function(d){
			return "" + d.data.Value;
		});
});

function pieTween(b){
	b.innerRadius = 0;
	var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
	return function(t){
		return arc1(i(t));
	}

}