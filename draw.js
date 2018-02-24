function drawArc(){
	var canvas = d3.select(".random")
	var g = canvas.append("g").attr("transform", "translate(100, 100)");

	var arc = d3.arc()
				.innerRadius(40)
				.outerRadius(50)
				.startAngle(0)
				.endAngle(Math.PI * 2);

	g.append("path")
		.attr("d", arc);

}