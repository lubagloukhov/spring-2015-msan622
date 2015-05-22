/*
############# BAR CHART 2 ##################
-------------------------------------------
*/

function datasetBarChosen3(group) {
  var ds = [];
  for (x in datasetBarChart3) {
     if(datasetBarChart3[x].group==group){
      ds.push(datasetBarChart3[x]);
     } 
    }
  return ds;
}


function dsBarChartBasics2() {
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


function dsBarChart3() {

  var firstDatasetBarChart2 = datasetBarChosen3(group);       
  
  var basics = dsBarChartBasics2();
  
  var margin = basics.margin,
    width = basics.width,
     height = basics.height,
    colorBar = basics.colorBar,
    barPadding = basics.barPadding
    ;
          
  var   xScale = d3.scale.linear()
            .domain([0, firstDatasetBarChart2.length])
            .range([0, width])
            ;
            
  var yScale = d3.scale.linear()
       .domain([0, d3.max(firstDatasetBarChart2, function(d) { return d.measure; })])
       .range([height, 0])
       ;
  
  var svg = d3.select("#barChart")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id","barChartPlot")
        ;
  
  var plot = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;
              
  plot.selectAll("rect")
       .data(firstDatasetBarChart2)
       .enter()
       .append("rect")
      .attr("x", function(d, i) {
          return xScale(i);
      })
       .attr("width", width / firstDatasetBarChart2.length - barPadding)   
      .attr("y", function(d) {
          return yScale(d.measure);
      })  
      .attr("height", function(d) {
          return height-yScale(d.measure);
      })
      .attr("fill", "lightgrey")
      ;
  
  plot.selectAll("text")
  .data(firstDatasetBarChart2)
  .enter()
  .append("text")
  .text(function(d) {
      return formatAsInteger(d3.round(d.measure));
  })
  .attr("text-anchor", "middle")
  .attr("x", function(d, i) {
      return (i * (width / firstDatasetBarChart2.length)) + ((width / firstDatasetBarChart2.length - barPadding) / 2);
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
      .data(firstDatasetBarChart2)
      .enter()
      .append("text")
      .text(function(d) { return d.category;})
      .attr("text-anchor", "middle")
               .attr("x", function(d, i) {
                  return (i * (width / firstDatasetBarChart2.length)) + ((width / firstDatasetBarChart2.length - barPadding) / 2);
               })
      .attr("y", 10)
      .attr("class", "xAxis")
      ;     
   
}


function updateBarChart(group, colorChosen) {
  
    var currentDatasetBarChart2 = datasetBarChosen3(group);
    
    var basics = dsBarChartBasics2();
  
    var margin = basics.margin,
      width = basics.width,
       height = basics.height,
      colorBar = basics.colorBar,
      barPadding = basics.barPadding
      ;
    
    var   xScale = d3.scale.linear()
      .domain([0, currentDatasetBarChart2.length])
      .range([0, width])
      ;
    
      
    var yScale = d3.scale.linear()
        .domain([0, d3.max(currentDatasetBarChart2, function(d) { return d.measure; })])
        .range([height,0])
        ;
        
     var svg = d3.select("#barChart svg");
        
     var plot = d3.select("#barChartPlot")
      .datum(currentDatasetBarChart2)
       ;
  
      plot.selectAll("rect")
        .data(currentDatasetBarChart2)
        .transition()
      .duration(750)
      .attr("x", function(d, i) {
          return xScale(i);
      })
       .attr("width", width / currentDatasetBarChart2.length - barPadding)   
      .attr("y", function(d) {
          return yScale(d.measure);
      })  
      .attr("height", function(d) {
          return height-yScale(d.measure);
      })
      .attr("fill", colorChosen)
      ;
    
    plot.selectAll("text.yAxis")
      .data(currentDatasetBarChart2)
      .transition()
      .duration(750)
       .attr("text-anchor", "middle")
       .attr("x", function(d, i) {
          return (i * (width / currentDatasetBarChart2.length)) + ((width / currentDatasetBarChart2.length - barPadding) / 2);
       })
       .attr("y", function(d) {
          return yScale(d.measure) + 14;
       })
       .text(function(d) {
        return formatAsInteger(d3.round(d.measure));
       })
       .attr("class", "yAxis")           
    ;
    

    svg.selectAll("text.title") 
      .attr("x", (width + margin.left + margin.right)/2)
      .attr("y", 15)
      .attr("class","title")        
      .attr("text-anchor", "middle")
      .text('Rating Breakdown for '+group + " across rating sources")
    ;


     var svg = d3.select("#barChart svg");
        
     var plot = d3.select("#barChartPlot")
      .datum(currentDatasetBarChart2)
       ;

      plot.selectAll("rect")
        .data(currentDatasetBarChart2)
        .transition()
      .duration(750)
      .attr("x", function(d, i) {
          return xScale(i);
      })
       .attr("width", width / currentDatasetBarChart2.length - barPadding)   
      .attr("y", function(d) {
          return yScale(d.measure);
      })  
      .attr("height", function(d) {
          return height-yScale(d.measure);
      })
      .attr("fill", colorChosen)
      ;
    
    plot.selectAll("text.yAxis") 
      .data(currentDatasetBarChart2)
      .transition()
      .duration(750)
       .attr("text-anchor", "middle")
       .attr("x", function(d, i) {
          return (i * (width / currentDatasetBarChart2.length)) + ((width / currentDatasetBarChart2.length - barPadding) / 2);
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

