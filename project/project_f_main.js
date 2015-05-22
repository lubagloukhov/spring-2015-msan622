/*
############# BAR_large CHART ###################
-------------------------------------------
*/

function dsBAR_large_Chart(data){

var   width = 500,
       height = 300;

var color = color = d3.scale.category20() ;

  var margin = {top: 50, right: 0, bottom: 50, left: 50};
    var svg = d3.select("#BAR_large_Chart")
       .append("svg")             
       .data([data])              
           .attr("width", width)  
           .attr("height", height)
          .append("g")            
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
    var   width = width  - margin.left - margin.right,
        height = height - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(data.length+1);

    var formatxAxis = d3.format(",");


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatxAxis)
        .ticks(5);
      
    svg.append("svg:text")
        .attr("dy", ".35em")
        .attr("x", (width / 2))             
        .attr("y", -30 )
        .attr("text-anchor", "middle")
        .style("font-size", "18px") 
        .text("Daters' Ratings and Perceived Ratings")
        // .attr("class","title")
        ;       

      svg.append("svg:text")
        .attr("dy", ".35em")
        .attr("x", (width / 2))             
        .attr("y", -10 )
        .attr("text-anchor", "middle")
        .style("font-size", "16px") 
        .text("by Attractiveness Range")
        // .attr("class","title")
        ;       


      x.domain(data.map(function(d) { return d.category; }));
      y.domain([0, d3.max(data, function(d) { 
        return d.measure; 
      })]);

      var gx=svg.append("g")
          .attr("class", "x axis")
          .style("fill","black")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .selectAll("text")  
            .style("text-anchor", "end")
            .style("font-size",12)
            .attr("dx", ".33em")
            .attr("dy", ".15em")
            ;




    var rect=svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
    .attr("fill", function(d, i) { return color(i); } ) 
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.category); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.measure); })
      .attr("height", function(d) { return height - y(d.measure); });

    rect.on("click", up);



  function up(d, i) {
        updateBarChart(d.category, color(i));
        updateBarChart2(d.category, color(i));
        updateParaChart(d.category, color(i));
        
       
  }
  }

  
