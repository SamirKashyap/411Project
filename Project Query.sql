drop table if exists Tract;
drop table if exists County;


CREATE TABLE County (
	CountyId varchar(128) not null,
    State varchar(128) not null,
    CountyName varchar(128) not null,
    Primary Key (CountyId)
);

CREATE TABLE Tract (
	TractId BIGINT(20) not null,
    State varchar(128) not null,
    CountyId varchar(128) not null,
    TotalPopulation int not null,
    NumberOfMen int not null,
    NumberOfWomen int not null,
    PercentHispanic int not null,
    PercentWhite int not null,
    PercentBlack int not null,
    PercentNative int not null,
    PercentAsian int not null,
    PercentPacific int not null,
    NumberOfVotingAgePersons int not null,
    MedianHouseholdIncome int not null,
    MedianIncomeError int not null,
    IncomePerCapita int not null,
    IncomePerCapitaError int not null,
    PercentPoverty int not null,
    PercentChildPoverty int not null,
    PercentProfessionalEmployment int not null,
    PercentServiceEmployment int not null,
    PercentSalesEmployment int not null,
    PercentConstructionEmployment int not null,
    PercentProductionEmployment int not null,
    PercentCommutingAlone int not null,
    PercentCommutingCarpool int not null,
    PercentCommutingPublicTransport int not null,
    PercentCommutingWalk int not null,
    PercentCommutingOther int not null,
    PercentWorkFromHome int not null,
    AverageCommuteTime int not null,
    NumberofEmployedOverAge16 int not null,
    PercentPrivateIndustryEmployment int not null,
    PercentPublicIndustryEmployment int not null,
    PercentSelfEmployment int not null,
    PercentUnpaidFamilyWork int not null,
    PercentUnemployed int not null,
    primary key (TractId)
);

LOAD DATA LOCAL INFILE '/Users/peytontanzillo/Desktop/Website Design/411Project/Dataset/acs2017_county_data.csv' 
IGNORE INTO TABLE County
  FIELDS TERMINATED BY ',' ENCLOSED BY '\"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
(CountyId, State, CountyName, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy, @dummy);

LOAD DATA LOCAL INFILE '/Users/peytontanzillo/Desktop/Website Design/411Project/Dataset/acs2017_census_tract_data.csv' 
IGNORE INTO TABLE Tract
  FIELDS TERMINATED BY ',' ENCLOSED BY '\"'
  LINES TERMINATED BY '\n'
  IGNORE 1 ROWS
(TractId, State, CountyId, TotalPopulation, NumberOfMen, NumberOfWomen, PercentHispanic, PercentWhite, PercentBlack, PercentNative, PercentAsian, PercentPacific, NumberOfVotingAgePersons, MedianHouseHoldIncome, MedianIncomeError,IncomePerCapita, IncomePerCapitaError, PercentPoverty, PercentChildPoverty,PercentProfessionalEmployment,PercentServiceEmployment, PercentSalesEmployment, PercentConstructionEmployment,PercentProductionEmployment, PercentCommutingAlone, PercentCommutingCarpool, PercentCommutingPublicTransport, PercentCommutingWalk, PercentCommutingOther, PercentWorkFromHome, AverageCommuteTime, NumberofEmployedOverAge16, PercentPrivateIndustryEmployment, PercentPublicIndustryEmployment, PercentSelfEmployment, PercentUnpaidFamilyWork, PercentUnemployed);

UPDATE Tract 
	INNER JOIN County ON (Tract.State = County.State and Tract.CountyId = County.CountyName)
    SET Tract.CountyId = County.CountyId;

ALTER table Tract ADD CONSTRAINT foreign key (CountyId) references County(CountyId);
