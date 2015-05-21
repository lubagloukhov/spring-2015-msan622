/*############# BAR CHART ###################*/


function datasetBarChosen(group) {
  var ds = [];
  for (x in datasetBarChart) {
     if(datasetBarChart[x].group==group){
      ds.push(datasetBarChart[x]);
     } 
    }
  console.log("ds",ds);
  return ds;
}


function dsBarChartBasics() {
    var margin = {top: 50, right: 0, bottom: 20, left: 0},
        width = 200 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom,
        colorBar = d3.scale.category20(),
        barPadding = 1
    ;
    
    return {
      margin : margin, 
      width : width, 
      height : height, 
      colorBar : colorBar, 
      barPadding : barPadding
    }     
    ;
}

function dsBarChart1() {

  var firstDatasetBarChart = datasetBarChosen(group);     
  console.log("firstDatasetBarChart",firstDatasetBarChart);      
  
  var basics = dsBarChartBasics();
  
  var margin = basics.margin,
    width = basics.width,
     height = basics.height,
    colorBar = basics.colorBar,
    barPadding = basics.barPadding
    ;
          
  var   xScale = d3.scale.linear()
            .domain([0, firstDatasetBarChart.length])
            .range([0, width])
            ;
             
  var yScale = d3.scale.linear()
       .domain([0, d3.max(firstDatasetBarChart, function(d) { return d.measure; })])
       .range([height, 0])
       ;
  
  var svg = d3.select("#barChart")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id","barChartPlot")
        .selectAll("text")  

        ;
  
  var plot = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;
              
  plot.selectAll("rect")
       .data(firstDatasetBarChart)
       .enter()
       .append("rect")
      .attr("x", function(d, i) {
          return xScale(i);
      })
       .attr("width", width / firstDatasetBarChart.length - barPadding)   
      .attr("y", function(d) {
          return yScale(d.measure);
      })  
      .attr("height", function(d) {
          return height-yScale(d.measure);
      })
      .attr("fill", "lightgrey")
      ;
  
  plot.selectAll("text")
  .data(firstDatasetBarChart)
  .enter()
  .append("text")
  .text(function(d) {
      return formatAsInteger(d3.round(d.measure));
  })
  .attr("text-anchor", "middle")
  .attr("x", function(d, i) {
      return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
  })
  .attr("y", function(d) {
      return yScale(d.measure) + 14;
  })
  .attr("class", "yAxis")
  ;
  
  var xLabels = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + (margin.top + height)  + ")")
        ;
  
  xLabels.selectAll("text.xAxis")
      .data(firstDatasetBarChart)
      .enter()
      .append("text")
      .text(function(d) { return d.category;})
      .attr("transform", function (d) {
        return "rotate(-30)";
    })
      .attr("y", 15)
      .attr("class", "xAxis")
      ; 
   
  
}

function updateBarChart(group, colorChosen) {
  
    var currentDatasetBarChart = datasetBarChosen(group);
    
    var basics = dsBarChartBasics();
  
    var margin = basics.margin,
      width = basics.width,
       height = basics.height,
      colorBar = basics.colorBar,
      barPadding = basics.barPadding
      ;
    
    var   xScale = d3.scale.linear()
      .domain([0, currentDatasetBarChart.length])
      .range([0, width])
      ;
    
      
    var yScale = d3.scale.linear()
        .domain([0, d3.max(currentDatasetBarChart, function(d) { return d.measure; })])
        .range([height,0])
        ;
        
     var svg = d3.select("#barChart svg");
        
     var plot = d3.select("#barChartPlot")
      .datum(currentDatasetBarChart)
       ;
  
        /* Note that here we only have to select the elements - no more appending! */
      plot.selectAll("rect")
        .data(currentDatasetBarChart)
        .transition()
      .duration(750)
      .attr("x", function(d, i) {
          return xScale(i);
      })
       .attr("width", width / currentDatasetBarChart.length - barPadding)   
      .attr("y", function(d) {
          return yScale(d.measure);
      })  
      .attr("height", function(d) {
          return height-yScale(d.measure);
      })
      .attr("fill", colorChosen)
      ;
    
    plot.selectAll("text.yAxis") 
      .data(currentDatasetBarChart)
      .transition()
      .duration(750)
       .attr("text-anchor", "middle")
       .attr("x", function(d, i) {
          return (i * (width / currentDatasetBarChart.length)) + ((width / currentDatasetBarChart.length - barPadding) / 2);
       })
       .attr("y", function(d) {
          return yScale(d.measure) + 14;
       })
       .text(function(d) {
        return formatAsInteger(d3.round(d.measure));
       })
       .attr("class", "yAxis")           
    ;
    

}

