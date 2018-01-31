var string4 = "你站在橋上看風景\n看風景人在樓上看你\n明月裝飾了你的窗子\n你裝飾了別人的夢\n".split("");

var textChart = d3.select(".textUpdate");
var width4 = +textChart.attr("width");
var height4 = +textChart.attr("height");
var g4 = textChart.append("g").attr("transform", "translate(32, " + height / 2 + ")");

//set timing of transition
var t4 = d3.transition().duration(1500);


function textUpdate(data){
	
  // DATA JOIN
  // Join new data with old elements, if any.
  var text4 = g4.selectAll("text")
    .data(data, function(d){return d;});

  // exit old elements not presetn in new data
  text4.exit()
    .attr("class", "exit")
    .attr("fill", "brown")
    .transition(t4)
    .attr("y", 60)
    .style("fill-opacity", 1e-6)
    .remove();

  // UPDATE
  // Update old elements as needed.
  text4.attr("class", "update")
        .attr("y", 0)
        .style("fill-opacity", 1)
        .transition(t4)
        .attr("x", function(d, i){
          return i * 45;
        });
  // ENTER
  // Create new elements as needed.
  //
  // ENTER + UPDATE
  // After merging the entered elements with the update selection,
  // apply operations to both.
  text4.enter().append("text")
      .attr("class", "enter")
      .attr("dy", ".35em")
      .attr("y", -60)
      .attr("x", function(d, i){
        return i * 45;
      })
      .style("fill-opacity", 1e-6)
      .text(function(d) { return d; })
      .transition(t4)
    //.merge(text4)
      .attr("y", 0)
      .style("fill-opacity", 1);
        
  // EXIT
  // Remove old elements as needed.
  //text4.exit().remove();
}

textUpdate(string4);

d3.interval(function(){
	textUpdate(d3.shuffle(string4).slice(0, Math.random() * string4.length));
}, 2000);
