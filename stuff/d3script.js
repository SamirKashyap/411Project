// fetch('http://localhost:8080/about')
// .then(response => response.json())
// .then(data => startd3(data))


function displayGraph(column, high, low = 0){
    const selected = document.getElementsByClassName('selected')
    console.log(selected)
    if (selected[0]) {
        selected[0].className = ''
    }
    document.getElementById(column).className = 'selected'
    svg.selectAll(".county")
    .style("fill", function(d) {
        try {
            return getFill(rateById[d.id - 0][column], high, low);
        } catch(e) {
            return undefined
        }
        
    })
    .on("mouseout", function(){
        d3.select(this).style("fill", function(d) {
            try {
                return getFill(rateById[d.id - 0][column], high, low);
            } catch(e) {
                return undefined
            }
        }
        );
        getText(undefined);})
    
}

let rateById = {}; 
var width = 1500,
height = 700;
var svg = d3.select("body").append("svg")
        .attr("class", "application")
        .attr("width", width)
        .attr("height", height);
// Text for displaying information
var countyText = svg.append("text").attr("x", 1300).attr("y", 100);
var stateText = svg.append("text").attr("x", 1300).attr("y", 120);
var popText = svg.append("text").attr("x", 1300).attr("y", 140);
var menPopText = svg.append("text").attr("x", 1300).attr("y", 160);
var womenPopText = svg.append("text").attr("x", 1300).attr("y", 180);
var hispanicProportionText = svg.append("text").attr("x", 1300).attr("y", 200);
var whiteProportionText = svg.append("text").attr("x", 1300).attr("y", 220);
var blackProportionText = svg.append("text").attr("x", 1300).attr("y", 240);
var nativeProportionText = svg.append("text").attr("x", 1300).attr("y", 260);
var asianProportionText = svg.append("text").attr("x", 1300).attr("y", 280);
var pacificProportionText = svg.append("text").attr("x", 1300).attr("y", 300);
var votingPopText = svg.append("text").attr("x", 1300).attr("y", 320);
// var avgIncomeText = svg.append("text").attr("x", 1300).attr("y", 340);
// var avgIncomeErrText = svg.append("text").attr("x", 1300).attr("y", 360);
var incomePerCapText = svg.append("text").attr("x", 1300).attr("y", 340);
// var incomePerCapErrText = svg.append("text").attr("x", 1300).attr("y", 400);
var povertyRateText = svg.append("text").attr("x", 1300).attr("y", 360);
var childPovertyRateText = svg.append("text").attr("x", 1300).attr("y", 380);

// Update text information
function getText(data) {
    countyText.text("County: " + (data ? data.County : ""));
    stateText.text("State: " + (data ? data.State : ""));
    popText.text("Total Population: " + (data ? data.TotalPopulation : ""));
    menPopText.text("Male Population: " + (data ? data.NumberOfMen : ""));
    womenPopText.text("Female Population: " + (data ? data.NumberOfWomen : ""));
    hispanicProportionText.text("Hispanic: " + (data ? data.PercentHispanic + "%": ""));
    whiteProportionText.text("White: " + (data ? data.PercentWhite + "%": ""));
    blackProportionText.text("Black: " + (data ? data.PercentBlack + "%": ""));
    nativeProportionText.text("Native: " + (data ? data.PercentNative + "%": ""));
    asianProportionText.text("Asian: " + (data ? data.PercentAsian + "%": ""));
    pacificProportionText.text("Pacific: " + (data ? data.PercentPacific + "%": ""));
    votingPopText.text("Voting Age Citizens: " + (data ? data.NumberOfVotingAgePersons : ""));
    // avgIncomeText.text("Average Income: " + (data ? "$" + data.MedianIncome : ""));
    // avgIncomeErrText.text("Average Income Error: " + (data ? "$" + data.IncomeErr : ""));
    incomePerCapText.text("Income per Capita: " + (data ? "$" + data.IncomePerCapita : ""));
    // incomePerCapErrText.text("Income per Capita Error: " + (data ? "$" + data.IncomePerCapitaError : ""));
    povertyRateText.text("Poverty Rate: " + (data ? data.PercentPoverty + "%" : ""));
    childPovertyRateText.text("Child Poverty Rate: " + (data ? data.PercentChildPoverty + "%" : ""));
}


function getFill(data, high, low) {
    // var color = d3.scaleThreshold()
    // .domain([0, 10000, 50000, 200000, 500000, 1000000, 10000000])
    // .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);
    var color = d3.scaleLinear()
    .domain([low, high])
    .range(["#CCC", "#00F"]);
    return color(data);
}
    
startd3();

function startd3(){
   

    var projection = d3.geoAlbersUsa()
        .scale(1300)
        .translate([487.5, 305]);

    var path = d3.geoPath()
        .projection(projection);

    

    

    // Queue up datasets
    d3.queue()
        .defer(d3.json, "counties-10m.json") 
        .await(ready); 

    // Ready Function, runs when data is loaded
    function ready(error, us) {
        if (error) throw error;

        // Read data
        d3.json("data", function (error, data) {
            if (error) throw error;
            console.log(data.result)
            data = data.result;
            // Store data
            
            data.forEach(function (d) {
                rateById[d.CountyId] = d; 
            });
            console.log(rateById)

            // Define counties
            svg.append("g")
                .attr("class", "counties")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.counties).features) 
                .enter().append("path")
                .attr("class", "county")
                .attr("d", path)
                .on("mouseover", function(d, i){
                    d3.select(this).style("fill", "orange");
                    getText(rateById[d.id - 0]);})

                // Define states
                svg.append("path")
                    .datum(topojson.mesh(us, us.objects.states, function (a, b) {
                        return a.id !== b.id;
                    }))
                    .attr("class", "states")
                    .attr("d", path);

                // Define nation
                svg.append("path")
                    .datum(topojson.mesh(us, us.objects.nation))
                    .attr("class", "nation")
                    .attr("d", path);

                displayGraph("TotalPopulation", 1000000)

                getText(undefined);
        });
    }

    // Define color scale
    
    

}
