function world (){
	var margin = {top: 50, left: 50 , right: 50, bottom: 50},
		height = 400 - margin.top - margin.bottom,
		width = 800 - margin.left - margin.right;

	var canvas = d3.select(".worldMap")
					.attr("height", height + margin.top + margin.bottom)
					.attr("width", width + margin.left + margin.right);

	var g = canvas.append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


	d3.queue()
		.defer(d3.json, "worldMap.topojson")
		//pull in another file
		.defer(d3.csv, "country-capitals.csv")
		.await(ready)

	/*
		create a new projection using Mercator (geoMerator)
		and center it (translate)
		and zoom in a certain amount (scale)
	*/
	var projection = d3.geoMercator()
				.translate([width / 2, height / 2])
				.scale(100);

	/*
		use the projection to convert lon lat to x, y for path 
	*/
	var path = d3.geoPath().projection(projection);

	function ready(error, data, capitals){
		if (error) throw error;

		var countries = topojson.feature(data, data.objects.countries1).features;
		console.log(countries);
		console.log(data);

		g.selectAll(".country")
			.data(countries)
			.enter()
			.append("path")
			.attr("class", "country")
			.attr("d", path)
			.on("click", function(d){
				d3.select(this).classed("selected", true);
			})
			.on("mouseover", function(d){
				d3.select(this).classed("hover", true);
			}).on("mouseout", function(d){
				d3.select(this).classed("hover", false);
			});


		//use the csv to give labels to the capitals
		console.log(capitals);

		var capName = g.append("text")
						.attr("x", width - 250)
						.attr("y", height)
						.attr("font-size", "30px")
						.text("Capital")

		g.selectAll(".country_capital")
			.data(capitals)
			.enter()
			.append("circle")
			.attr("class", "country_capital")
			.attr("cx", function(d){
				console.log(d);
				var coords = projection([d["CapitalLongitude"], d["CapitalLatitude"]])
				return coords[0];
			})
			.attr("cy", function(d){
				var coords = projection([d["CapitalLongitude"], d["CapitalLatitude"]])
				return coords[1];
			})
			.attr("r", 4)
			.attr("fill", "rgba(0, 0, 200, 0.7)")
			.on("mouseover", function(d){
				d3.select(this).attr("r", 8);
				capName.text("Captial:" + d['CapitalName']);
			})
			.on("mouseout", function(){
				d3.select(this).attr("r", 4);
				capName.text("Captial:");
			});


	}
	
}