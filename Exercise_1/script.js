console.log("Exercise 6-1");

//Set up drawing environment with margin conventions
var margin = {t:20,r:20,b:20,l:20};
var width = document.getElementById('plot').clientWidth - margin.l - margin.r,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var plot = d3.select('#plot')
    .append('svg')
    .attr('width',width + margin.l + margin.r)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','plot-area')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//This is just to help you visualize the extent of the <g.plot-area> element
var background = plot.append('rect')
    .attr('width',width)
    .attr('height',height)
    .style('stroke','rgb(100,100,100)')
    .style('stroke-width','2px')
    .style('fill-opacity',.03)

//Start importing data
d3.csv('../data/world_bank_2012.csv', parse, dataLoaded);

function parse(d){
    //For now, return the old row verbatim as the new row
    return d;

    //What are some issues we might encounter as we parse this?
}

function dataLoaded(error, rows){
    console.log(rows);
}
