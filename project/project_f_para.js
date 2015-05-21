

function cleanData() {
  datasetParaChart.forEach(function(d){
    d.sports = +d.sports,
    d.group = d.group,
    d.tvsports = +d.tvsports,
    d.exercise = +d.exercise,
    d.dining = +d.dining,
    d.museums = +d.museums,
    d.hiking =  +d.hiking,
    d.clubbing = +d.clubbing,
    d.tv = +d.tv,
    d.theater = +d.theater, 
    d.movies = +d.movies,
    d.concerts = +d.concerts,
    d.music = +d.music,
    d.shopping = +d.shopping,
    d.yoga = +d.yoga
  });   
  console.log(datasetParaChart);
  console.log(d3.keys(datasetParaChart[0]));
}


function dsParaBasics() {

    var margin = {top: 30, right: 0, bottom: 10, left: 50},
    width = 800 - margin.left - margin.right,
     height = 300 - margin.top - margin.bottom,
    colorBar = d3.scale.category20()
    // barPadding = 1
    ;
    
    return {
      margin : margin, 
      width : width, 
      height : height,
      colorBar : colorBar, 
      // barPadding : barPadding
    }     
    ;
}



function createPara() { // svgP


  var firstDatasetParaChart = datasetParaChosen(group);  
  console.log("firstDatasetParaChart",firstDatasetParaChart);   

  var basics = dsParaBasics();
  
  var m = basics.margin,
    w = basics.width,
     h = basics.height,
    colorBar = basics.colorBar
    // barPadding = basics.barPadding
    ;


  console.log(m,w,h);   

  var x = d3.scale.ordinal().rangePoints([0, w], 1),
      y = {},
      dragging = {};

  var line = d3.svg.line(),
      axis = d3.svg.axis().orient("left"),
      background,
      foreground;

  var svg =  d3.select("body").select("svg#PARA")
      .attr("width", w + m.left + m.right)
      .attr("height", h + m.top + m.bottom)
    .append("g")
      .attr("transform", "translate(" + m.right + "," + m.top + ")");

        // Extract the list of dimensions and create a scale for each.
  x.domain(dimensions = d3.keys(firstDatasetParaChart[0]).filter(function(d) {
    return d != "group"  && (y[d] = d3.scale.linear()
        // .domain(d3.extent(firstDatasetParaChart, function(p) { return +p[d]; }))
        .domain([-.75, .75])
        .range([h, 0]));
  }));


  // Add grey background lines for context.
  background = svg.append("g")
      .attr("class", "background")
    .selectAll("path")
      .data(firstDatasetParaChart)
    .enter().append("path")
      .attr("d", path);

  // Add blue foreground lines for focus.
  foreground = svg.append("g")
      .attr("class", "foreground")
    .selectAll("path")
      .data(firstDatasetParaChart)
    .enter().append("path")
      .attr("d", path);

 // Add a group element for each dimension.
  var g = svg.selectAll(".dimension")
      .data(dimensions)
    .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
      .call(d3.behavior.drag()
        .on("dragstart", function(d) {
          dragging[d] = this.__origin__ = x(d);
          background.attr("visibility", "hidden");
        })
        .on("drag", function(d) {
          dragging[d] = Math.min(w, Math.max(0, this.__origin__ += d3.event.dx));
          foreground.attr("d", path);
          dimensions.sort(function(a, b) { return position(a) - position(b); });
          x.domain(dimensions);
          g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
        })
        .on("dragend", function(d) {
          delete this.__origin__;
          delete dragging[d];
          transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
          transition(foreground)
              .attr("d", path);
          background
              .attr("d", path)
              .transition()
              .delay(500)
              .duration(0)
              .attr("visibility", null);
        }));

        // Add an axis and title.
  g.append("g")
      .attr("class", "axis")
      // .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
    .append("text")
      .attr("text-anchor", "middle")
      .attr("y", 75)
      .text(String);

  // Add and store a brush for each axis.
  g.append("g")
      .attr("class", "brush")
      .each(function(d) { d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush)); })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);




      function position(d) {
  var v = dragging[d];
  return v == null ? x(d) : v;
}

function transition(g) {
  return g.transition().duration(500);
}

// Returns the path for a given data point.
function path(d) {
  return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
}

// When brushing, don’t trigger axis dragging.
function brushstart() {
  d3.event.sourceEvent.stopPropagation();
}

// Handles a brush event, toggling the display of foreground lines.
function brush() {
  var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
      extents = actives.map(function(p) { return y[p].brush.extent(); });
  foreground.style("display", function(d) {
    return actives.every(function(p, i) {
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    }) ? null : "none";
  });
}


}


function datasetParaChosen(group) {
  var ds = [];
  console.log("group",group);   
  for (x in datasetParaChart) {
     if(datasetParaChart[x].group==group){
      ds.push(datasetParaChart[x]);
     } 
    }
  return ds;
}


function updateParaChart(group, colorChosen) {
  
   var currentdatasetParaChart = datasetParaChosen(group);
   console.log("currentdatasetParaChart",currentdatasetParaChart);   
    
  var basics = dsParaBasics();
  
  var m = basics.margin,
    w = basics.width,
     h = basics.height,
    colorBar = basics.colorBar
    // barPadding = basics.barPadding
    ;


  console.log(m,w,h);   

  var x = d3.scale.ordinal().rangePoints([0, w], 1),
      y = {},
      dragging = {};

  var line = d3.svg.line(),
      axis = d3.svg.axis().orient("left"),
      background,
      foreground;

  var svg =  d3.select("body").select("svg#PARA")
      .attr("width", w + m.left + m.right)
      .attr("height", h + m.top + m.bottom)
    .append("g")
      .attr("transform", "translate(" + m.right + "," + m.top + ")");

  x.domain(dimensions = d3.keys(currentdatasetParaChart[0]).filter(function(d) {
    return d != "group"  && (y[d] = d3.scale.linear()
        .domain([-.75,.75])
        .range([h, 0]));
  }));


  console.log("dim", dimensions);


  // Add grey background lines for context.
  background = svg.append("g")
      .attr("class", "background")
    .selectAll("path")
      .data(currentdatasetParaChart)
    .enter().append("path")
      .attr("d", path)
      .attr("fill", colorChosen);

  // Add blue foreground lines for focus.
  foreground = svg.append("g")
      .attr("class", "foreground")
    .selectAll("path")
      .data(currentdatasetParaChart)
    .enter().append("path")
      .attr("d", path)
      .attr("fill", "none");

 // Add a group element for each dimension.
  var g = svg.selectAll(".dimension")
      .data(dimensions)
    .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
      .call(d3.behavior.drag()
        .on("dragstart", function(d) {
          dragging[d] = this.__origin__ = x(d);
          background.attr("visibility", "hidden");
        })
        .on("drag", function(d) {
          dragging[d] = Math.min(w, Math.max(0, this.__origin__ += d3.event.dx));
          foreground.attr("d", path);
          dimensions.sort(function(a, b) { return position(a) - position(b); });
          x.domain(dimensions);
          g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
        })
        .on("dragend", function(d) {
          delete this.__origin__;
          delete dragging[d];
          transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
          transition(foreground)
              .attr("d", path);
          background
              .attr("d", path)
              .transition()
              .delay(500)
              .duration(0)
              .attr("visibility", null);
        }));

        // Add an axis and title.
  g.append("g")
      .attr("class", "axis")
      // .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
    .append("text")
      .attr("text-anchor", "middle")
      .attr("y", 75)
      .text(String);

  // Add and store a brush for each axis.
  g.append("g")
      .attr("class", "brush")
      .each(function(d) { d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush)); })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);


      function position(d) {
  var v = dragging[d];
  return v == null ? x(d) : v;
}

function transition(g) {
  return g.transition().duration(500);
}

function path(d) {
  return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
}

function brushstart() {
  d3.event.sourceEvent.stopPropagation();
}

function brush() {
  var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
      extents = actives.map(function(p) { return y[p].brush.extent(); });
  foreground.style("display", function(d) {
    return actives.every(function(p, i) {
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    }) ? null : "none";
  });
}

}


