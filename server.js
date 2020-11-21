const express = require('express');
const app = express();
const util = require('util');
var http = require('http');
var path = require('path');
var router = express(router);

var County = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


app.use( express.static( __dirname + '/stuff'));

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'csce411database'
});

const query = util.promisify(connection.query).bind(connection);

SUM_COLS = ["TotalPopulation", "NumberOfMen", "NumberOfWomen", "NumberOfVotingAgePersons", "NumberofEmployedOverAge16"];
PCT_COLS = ["PercentHispanic", "PercentWhite", "PercentBlack", "PercentNative", "PercentAsian", "PercentPacific",
"IncomePerCapita", "PercentPoverty", "PercentChildPoverty", "PercentProfessionalEmployment",
"PercentServiceEmployment", "PercentSalesEmployment", "PercentConstructionEmployment", "PercentProductionEmployment", 
"PercentCommutingAlone", "PercentCommutingCarpool", "PercentCommutingPublicTransport", "PercentCommutingWalk", "PercentCommutingOther",
"PercentWorkFromHome", "PercentPrivateIndustryEmployment", "PercentPublicIndustryEmployment", "PercentSelfEmployment", "PercentUnpaidFamilyWork",
"PercentUnemployed"];
OTHER_COLS = ["CountyId", "State", "CountyName"];


app.get('/about', async (req, res) => {
    await connection.query(`select * from County inner join Tract on Tract.CountyId = County.CountyId`, async function(err, result, fields){
        full_list = []
        if (err) throw err;
        new_obj = {}

        for(tract of result){
            if (!(tract.CountyId in new_obj)){
                new_obj[tract.CountyId] = {County: tract.CountyName, State: tract.State, CountyId: tract.CountyId};
            }
            for (col of SUM_COLS){
                if (!(col in new_obj[tract.CountyId])){
                    new_obj[tract.CountyId][col] = 0;
                }
                new_obj[tract.CountyId][col] += tract[col]
            }
            for (col of PCT_COLS){
                if (!(col in new_obj[tract.CountyId])){
                    new_obj[tract.CountyId][col] = 0;
                }
                new_obj[tract.CountyId][col] += (tract.TotalPopulation * (tract[col]/ 100))
            }
        }
                
        for(key in new_obj){
            for (col of PCT_COLS){
                new_obj[key][col] = (new_obj[key][col] / new_obj[key].TotalPopulation) * 100;
            }
            full_list.push(new_obj[key])
        }
        res.json({"result": full_list})
        // connection.end();
        // console.log("Disconnected from database");
    }); 
});

connection.connect((err) => {
    if (err){
        console.log("Error connecting to database");
        return;
    };
    console.log('Connected!');
});







const webserver = app.listen(8080, function(){
    console.log("Node web server is running on port 8080");
});