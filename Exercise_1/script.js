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


    return {
        gdpPerCap: (d['GDP per capita, PPP (constant 2011 international $)'] == "..")?undefined:+d['GDP per capita, PPP (constant 2011 international $)'],
        cCode: d['Country Code'],
        cName: d['Country Name'],
        primaryCompletion: (d['Primary completion rate, total (% of relevant age group)'] == "..")?undefined:+d['Primary completion rate, total (% of relevant age group)'],
        Urbanpop: (d['Urban population (% of total)'] == "..")?undefined:+d['Urban population (% of total)']
    };

    //What are some issues we might encounter as we parse this?
}

function dataLoaded(error, rows){
    var minGdpPerCap = d3.min(rows,function(d){return d.gdpPerCap}),
        maxGdpPerCap = d3.max(rows,function(d){return d.gdpPerCap});

    var minPrimComp = d3.min(rows,function(d){return d.primaryCompletion}),
        maxPrimComp = d3.max(rows,function(d){return d.primaryCompletion});

    var ScaleX = d3.scale.linear()
        .domain([minGdpPerCap *.9,maxGdpPerCap*1.1])
        .range([0,width]);

    var ScaleY = d3.scale.linear()
        .domain([0,150])
        .range([height,0]);

    rows.forEach(function(element)
    {
        if (element.gdpPerCap == undefined || element.primaryCompletion == undefined)
        {
            return;
        }
        var countries = plot.append('g')
            .attr('class','country')
            .attr('transform','translate('+ ScaleX(element.gdpPerCap) + ',' + ScaleY(element.primaryCompletion) +')');

        countries.append('circle')
            .attr('r',5)
            .style('stroke','black')
            .style('stroke-width','1px')
            .style('fill','rgba(100,100,100,.5)');

        countries.append('text')
            .text(element.cName);

    })

}
