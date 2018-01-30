var margin = {top:20, right: 30, bottom: 30, left:40};


var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var x = d3.scaleBand()
	.range([0, width])
	.round([.1]);
	// .domain(["A", "B", "C", "D", "E", "F", "G", 
	// 	"H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", 
	// 	"R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);

var y = d3.scaleLinear()
	.range([height, 0]);

var chart2 = d3.select(".chart2")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
	.append("g").attr("transform", "translate(" +margin.left + ", " + margin.top + ")");

var xAxis = d3.axisBottom(x);	
var yAxis = d3.axisLeft(y);

d3.tsv("letterFrequency.tsv", type, function(error, data){
	if (error){
		console.log("error");
	}

	x.domain(data.map(function(d){
		return d.letter;
	}));

	//the y-scale is to reversely map the height of bar according to the data
	y.domain([0, d3.max(data, function(d){return d.value;})]);

	var barWidth = width / data.length;

	var bar = chart2.selectAll("g")
		.data(data)
		.enter()
		.append("g")
		.attr("transform", function(d, i){return "translate(" + x(d.letter)+ ", 0)";});
		// .attr("transform", function(d, i){return "translate(" + i * barWidth + ", 0)";});

	bar.append("rect")
		.attr("y", function(d){return y(d.value);})
		.attr("height", 0)
		.transition()
		.attr("height", function(d){
			return height - y(d.value);
		})
		.attr("width", barWidth - 1);

	bar.append("text")
		.attr("x", 2)
		.attr("y", function(d){
			return y(d.value) + 3;
		})
		.attr("dy", "-0.5em")
		.text(function(d){
			return d.value.toFixed(2) + "%";			
		});

	//selection.call to create the xAxis
	chart2.append("g")
		.attr("class", "x axis2")
		.attr("transform", "translate(0," + height+")")
		.call(xAxis)
		//append a axis name
		.append("text")
		.attr("y", height)
		.attr("dy", "0.71em")
		.style("text-anchor", "end")
		.text("Letter");

	chart2.append("g")
		.attr("class", "y axis2")
		.call(yAxis)
  			.append("text")
    		.attr("transform", "rotate(-90)")
    		.attr("y", 6)
    		.attr("dy", ".71em")
    		.style("text-anchor", "end")
    		.text("Frequency (%)");

});

function type(d){
	d.letter = d.letter.toUpperCase();
	d.value = +d.value;
	return d;
}

console.log("this is to create a bar chart2 in SVG");