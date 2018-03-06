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
	console.log(data);
	var bubbles = g.selectAll(".bubbles")
					.data(data)
					.enter()
					.append("circle")
					.attr("cx", function(d){
						return d * 50;
					})
					.attr("cy", 160)
					.attr("r", 20)
					.attr("fill", "red");
	console.log(bubbles);
}