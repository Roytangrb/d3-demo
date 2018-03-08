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
		//.defer(d3.csv, "capitals.csv")
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

	function ready(error, data){
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

	}
	
}