

function datasetWhiskChosen(group) {
  var ds = [];
  for (x in datasetBarChart) {
     if(datasetBarChart[x].group==group){
      ds.push(datasetBarChart[x]);
     } 
    }
  return ds;
}


function dsBarWhiskBasics() {

    var margin = {top: 0, right: 0, bottom: 20, left: 0},
    width = 800 - margin.left - margin.right,
     height = 400 - margin.top - margin.bottom //,
    // colorBar = d3.scale.category20(),
    // barPadding = 1
    ;
    
    return {
      margin : margin, 
      width : width, 
      height : height//, 
      // colorBar : colorBar, 
      // barPadding : barPadding
    }     
    ;
}

function dsWhiskChart() {

  var firstDatasetWhiskChart = datasetWhiskChosen(group);           
  
  var basics = dsBarWhiskBasics();
  
  var margin = basics.margin,
    width = basics.width,
     height = basics.height//,
    // colorBar = basics.colorBar,
    // barPadding = basics.barPadding
    ;

var labels = true; // show the text labels beside individual boxplots?

var margin = {top: 30, right: 50, bottom: 200, left: 50};
var  width = 800 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;
  
var min = Infinity,
    max = -Infinity;
  
// parse in the data  



var data = datasetWhiskChart;
  
  var chart = d3.box()
    .whiskers(iqr(1.5))
    .height(height) 
    .domain([min, max])
    .showLabels(labels);

  

      var svg = d3.select("body").select("svg#WHISKY")
  // var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "box")    
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // the x-axis
  var x = d3.scale.ordinal()     
    .domain( data.map(function(d) {  return d[0] } ) )     
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

console.log("THIZZZZ",data[0]);
  // draw the boxplots  
  svg.selectAll(".box")    
      .data(data)
    .enter().append("g")
    .attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
      .call(chart); 

      console.log(x.rangeBand(),"x.rangeBand()");
      console.log(x.rangeBand(),"x.rangeBand()");
  
        
//   // add a title
//   svg.append("text")
//         .attr("x", (width / 2))             
//         .attr("y", 0 + (margin.top / 2))
//         .attr("text-anchor", "middle")  
//         .style("font-size", "18px") 
//         //.style("text-decoration", "underline")  
//         .text("Personal Interest Rating of Various Activities");
 
//    // draw y axis
//   svg.append("g")
//         .attr("class", "y axis")
//         .call(yAxis)
//     .append("text") // and text1
//       // .attr("transform", "rotate(-90)")
//       .attr("x", 0)
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .style("font-size", "16px") 
//       .text("Rating");    
  
//   // draw x axis  
//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
//       .call(xAxis)
//         .selectAll("text")  
//             .style("text-anchor", "end")
//             .attr("dx", "-.8em")
//             .attr("dy", ".15em")
//             .attr("transform", function(d) {
//                 return "rotate(-65)" 
//                 })
//     .append("text")             // text label for the x axis
//         .attr("x", 0)
//         .attr("y",  10 )
//     .attr("dy", ".71em")
//         .style("text-anchor", "end")
//         .style("font-size", "16px") 
//         .text("Activity"); 
// });

// // Returns a function to compute the interquartile range.
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

}