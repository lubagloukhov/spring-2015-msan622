/*
############# Whisker CHART ##################
-------------------------------------------
*/


function cleanData2() {
  datasetWhiskChart.forEach(function(d){
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
  console.log(datasetWhiskChart);
  console.log(d3.keys(datasetWhiskChart[0]));
}


function datasetWhiskChosen(group) {
  var ds = [];
  for (x in datasetWhiskChart) {
     if(datasetWhiskChart[x].group==group){
      ds.push(datasetWhiskChart[x]);
     } 
    }
  return ds;
}


function dsWhiskChartBasics() {

    var margin = {top: 0, right: 10, bottom: 20, left: 50},
                  width = 400 - margin.left - margin.right,
                  height = 200 - margin.top - margin.bottom,
                  colorBar = d3.scale.category20(),
                  barPadding = 1;
    return {
      margin : margin, 
      width : width, 
      height : height, 
      colorBar : colorBar, 
      barPadding : barPadding
    };
}

function dsWhiskChart() {


var min = Infinity,
    max = -Infinity;

    var labels = true; // show the text labels beside individual boxplots?

  var firstDatasetWhiskChart = datasetWhiskChosen(group);           
  
  var basics = dsWhiskChartBasics();
  
  var margin = basics.margin, width = basics.width, height = basics.height, colorBar = basics.colorBar, barPadding = basics.barPadding;
  
  var data = [];
  data[0] = [];
  data[1] = [];
  data[2] = [];
  data[3] = [];
  data[4] = [];
  data[5] = [];
  data[6] = [];
  data[7] = [];
  data[8] = [];
  data[9] = [];
  data[10] = [];
  data[11] = [];
  data[12] = [];
  data[13] = [];
  // add more rows if your csv file has more columns

  // add here the header of the csv file
  // data[0][0] = "Q1";
  // data[1][0] = "Q2";
  // data[2][0] = "Q3";
  // data[3][0] = "Q4"; 
  data[0][0] = "sports";
  data[1][0] = "tvsports";
  data[2][0] = "exercise";
  data[3][0] = "dining";
  data[4][0] = "museums";
  data[5][0] = "hiking";
  data[6][0] = "clubbing";
  data[7][0] = "tv";
  data[8][0] = "theater";
  data[9][0] = "movies";
  data[10][0] = "concerts";
  data[11][0] = "music";
  data[12][0] = "shopping";
  data[13][0] = "yoga";
  // add more rows if your csv file has more columns

  data[0][1] = [];
  data[1][1] = [];
  data[2][1] = [];
  data[3][1] = [];
  data[4][1] = [];
  data[5][1] = [];
  data[6][1] = [];
  data[7][1] = [];
  data[8][1] = [];
  data[9][1] = [];
  data[10][1] = [];
  data[11][1] = [];
  data[12][1] = [];
  data[13][1] = [];
  
    datasetWhiskChart.forEach(function(x) {
    var v1 = Math.floor(x.sports),
      v2 = Math.floor(x.tvsports),
      v3 = Math.floor(x.exercise),
      v4 = Math.floor(x.dining),
      v5 = Math.floor(x.museums),
      v6 = Math.floor(x.hiking),
      v7 = Math.floor(x.clubbing),
      v8 = Math.floor(x.tv),
      v9 = Math.floor(x.theater),
      v10 = Math.floor(x.movies)
      v11 = Math.floor(x.concerts),
      v12 = Math.floor(x.music),
      v13 = Math.floor(x.shopping),
      v14 = Math.floor(x.yoga);
      // add more variables if your csv file has more columns
      
    var rowMax = Math.max(v1, 
      Math.max(v2, 
        Math.max(v3,
          Math.max(v4,
            Math.max(v5,
              Math.max(v6,
                Math.max(v7,
                  Math.max(v8,
                    Math.max(v9,
                      Math.max(v10,
                        Math.max(v11,
                          Math.max(v12,
                            Math.max(v13,v14)))))))))))));    
    var rowMin = Math.min(v1, 
      Math.min(v2, 
        Math.min(v3,
          Math.min(v4,
            Math.min(v5,
              Math.min(v6,
                Math.min(v7,
                  Math.min(v8,
                    Math.min(v9,
                      Math.min(v10,
                        Math.min(v11,
                          Math.min(v12,
                            Math.min(v13,v14)))))))))))));

    // var rowMin = Math.min(v1, Math.min(v2, Math.min(v3,v4)));

    data[0][1].push(v1);
    data[1][1].push(v2);
    data[2][1].push(v3);
    data[3][1].push(v4);
    data[4][1].push(v5);
    data[5][1].push(v6);
    data[6][1].push(v7);
    data[7][1].push(v8);
    data[8][1].push(v9);
    data[9][1].push(v10);
    data[10][1].push(v11);
    data[11][1].push(v12);
    data[12][1].push(v13);
    data[13][1].push(v14);

    // console.log("v1",v1);
     // add more rows if your csv file has more columns
     
    if (rowMax > max) max = rowMax;
    if (rowMin < min) min = rowMin; 
  });


  var chart = d3.box()
    .whiskers(iqr(1.5))
    .height(height) 
    .domain([min, max])
    .showLabels(labels);

  

  var svg = d3.select("#whiskChart")
              .append("svg:svg")
              .data(firstDatasetWhiskChart)
              // var svg = d3.select("body").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .attr("class", "box")    
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // the x-axis
  var x = d3.scale.ordinal()     
    .domain( data.map(function(d) { console.log(d); return d[0] } ) )     
    .rangeRoundBands([0 , width], 0.7, 0.3);    

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  // the y-axis
  var y = d3.scale.linear()
    .domain([min, max])
    .range([height + margin.top, 0 + margin.top]);
  
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  // draw the boxplots  
  svg.selectAll(".box")    
      .data(firstDatasetWhiskChart)
    .enter().append("g")
    .attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
      .call(chart.width(x.rangeBand())); 
  
        
  // add a title
  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "18px") 
        //.style("text-decoration", "underline")  
        .text("Personal Interest Rating of Various Activities");
 
   // draw y axis
  svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    .append("text") // and text1
      // .attr("transform", "rotate(-90)")
      .attr("x", 0)
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-size", "16px") 
      .text("Rating");    
  
  // draw x axis  
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
      .call(xAxis)
    .append("text")             // text label for the x axis
        .attr("x", 0)
        .attr("y",  10 )
    .attr("dy", ".71em")
        .style("text-anchor", "end")
    .style("font-size", "16px") 
        .text("Activity"); 
}

// Returns a function to compute the interquartile range.
function iqr(k) {
  return function(d, i) {
    var q1 = d.quartiles[0],
        q3 = d.quartiles[2],
        iqr = (q3 - q1) * k,
        i = -1,
        j = d.length;
    while (d[++i] < q1 - iqr);
    while (d[--j] > q3 + iqr);
    return [i, j];
  };
}




function updateWhiskChart(group, colorChosen) {
  
  var firstDatasetWhiskChart = datasetWhiskChosen(group);           
  
  var basics = dsWhiskChartBasics();
  
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
    
    plot.selectAll("text.yAxis") // target the text element(s) which has a yAxis class defined
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
    

    svg.selectAll("text.title") // target the text element(s) which has a title class defined
      .attr("x", (width + margin.left + margin.right)/2)
      .attr("y", 15)
      .attr("class","title")        
      .attr("text-anchor", "middle")
      .text('Rating Breakdown for '+group + " across rating sources")
    ;


     var svg = d3.select("#barChart2 svg");
        
     var plot = d3.select("#barChartPlot2")
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
    
    plot.selectAll("text.yAxis") // target the text element(s) which has a yAxis class defined
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





