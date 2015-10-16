console.log("Exercise 6-2");

//Set up drawing environment with margin conventions
var margin = {t:20,r:20,b:50,l:50};
var width = document.getElementById('plot').clientWidth - margin.l - margin.r,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var plot = d3.select('#plot')
    .append('svg')
    .attr('width',width + margin.l + margin.r)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','plot-area')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Initialize axes
//Consult documentation here https://github.com/mbostock/d3/wiki/SVG-Axes
var scaleX,scaleY;

var axisX = d3.svg.axis()
    .orient('bottom')
    .tickSize(-height)
    .tickValues([10000,50000,100000]);
var axisY = d3.svg.axis()
    .orient('left')
    .tickSize(-width)
    .tickValues([0,25,50,75,100]);


//Start importing data
d3.csv('../data/world_bank_2012.csv', parse, dataLoaded);

function parse(d){

    //Eliminate records for which gdp per capita isn't available
    if(d['GDP per capita, PPP (constant 2011 international $)']=='..'){
        return;
    }

    return {
        cName: d['Country Name'],
        cCode: d['Country Code'],
        gdpPerCap: +d['GDP per capita, PPP (constant 2011 international $)'],
        primaryCompletion: d['Primary completion rate, total (% of relevant age group)']!='..'?+d['Primary completion rate, total (% of relevant age group)']:undefined,
        urbanPop: d['Urban population (% of total)']!='..'?+d['Urban population (% of total)']:undefined
    }
}

function dataLoaded(error, rows){
    //with data loaded, we can now mine the data
    var gdpPerCapMin = d3.min(rows, function(d){return d.gdpPerCap}),
        gdpPerCapMax = d3.max(rows, function(d){return d.gdpPerCap});

    //with mined information, we can now set up the scales
    scaleX = d3.scale.log().domain([gdpPerCapMin,gdpPerCapMax]).range([0,width]),
    scaleY = d3.scale.linear().domain([0,100]).range([height,0]);

    //Once we know the scales, we can represent the scales with axes
    axisX.scale(scaleX);
    axisY.scale(scaleY);

    plot.append('g')
        .attr('class','axis axis-x')
        .attr('transform','translate(0,'+height+')')
        .call(axisX);

    plot.append('g')
        .attr('class','axis axis-y')
        .call(axisY);

    //draw
    /*rows.forEach(function(element)
        {
            ...creat circle
        }
        )*/
    plot.selectAll('circle')//this return as  empty selection
        .data(rows)//we are creating one to one relationship between <circle> and an element in array
        .enter()
        .append('circle')
        .attr('cx',function(d)
        {
            return scaleX(d.gdpPerCap)
        })
        .attr('cy',function(d)
        {
            return scaleY(d.primaryCompletion)
        })
        .attr('r',4)
        .on('click',function(d)
        {
            console.log(d);
        })
}

