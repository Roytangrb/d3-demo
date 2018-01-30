var string4 = "你站在橋上看風景\n看風景人在樓上看你\n明月裝飾了你的窗子\n你裝飾了別人的夢\n".split("");

var textChart = d3.select(".textUpdate");
var width4 = +textChart.attr("width");
var height4 = +textChart.attr("height");
var g4 = textChart.append("g").attr("transform", "translate(32, " + height / 2 + ")");

function textUpdate(data){
	
  // DATA JOIN
  // Join new data with old elements, if any.
  var text4 = g4.selectAll("text")
    .data(data);

  // UPDATE
  // Update old elements as needed.
  text4.attr("class", "update");

  // ENTER
  // Create new elements as needed.
  //
  // ENTER + UPDATE
  // After merging the entered elements with the update selection,
  // apply operations to both.
  text4.enter().append("text")
      .attr("class", "enter")
      .attr("x", function(d, i) { return i * 45; })
      .attr("dy", ".35em")
    .merge(text4)
      .text(function(d) { return d; });

  // EXIT
  // Remove old elements as needed.
  text4.exit().remove();
}

textUpdate(string4);

d3.interval(function(){
	textUpdate(d3.shuffle(string4).slice(0, Math.random() * string4.length));
}, 2000);
