function useImage(){
	var canvas = d3.select(".imageChart");

	var g = canvas.append("g")
				.attr("width", 800 - 30)
				.attr("height", 500 - 30)
				.attr("transform", "translate(400, 250)");

	var bubble = g.append("circle")
					.attr("cx", 0)
					.attr("cy", 0)
					.attr("r", 80)
					//apply definitino in <defs>
					.attr("fill", "url(#neonGradient)");

	var bubble2 = g.append("circle")
					.attr("cx", 160)
					.attr("cy",0)
					.attr("r", 80)
					//apply definitino in <defs>
					.attr("fill", "url(#pattern1)");

	var data = [1, 2, 3, 4, 5, 6];

	//create definitions in d3 
	var defs = canvas.append("defs")

	// <pattern id="pattern1" height="100%" width="100%" patternContentUnits="objectBoundingBox">
	// 				<image height="1" width="1" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="1.png">
	// 				</image>
	// 			</pattern>
	var ImagePattern = defs.append("pattern")
						.attr("id", "pattern1")
						.attr("height", "100%")
						.attr("width", "100%")
						.attr("patternContentUnits", "objectBoundingBox")
						.append("image")
						.attr("height", 1)
						.attr("width", 1)
						.attr("preserveAspectRatio", "none")
						.attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
						.attr("xlink:href", "1.png")

	var bubbles = g.selectAll(".bubbles")
					.data(data)
					.enter()
					.append("circle")
					.attr("cx", function(d){
						return d * 50;
					})
					.attr("cy", 160)
					.attr("r", 20)
					//when using image mapping fill, the id name should not contain space
					// return d.name.toLowerCase().replace(/ /g, "-");
					//replace() only replace once, need to use the regular expresssion
					//and later refer to this id with the same string
					.attr("fill", "url(#pattern1)");










}