//-------------------------------------------------------------------------------------------------------
// CIS 174: Implementation - JSON
//-------------------------------------------------------------------------------------------------------
// json: weather conditions
let storage_conditions = 'conditions';
fetchJSON('assets/csv/openweather_weather_codes.csv', function(xhttp){
    let json_arr = csvToJSON(xhttp.responseText);
    sessionStorage.setItem(storage_conditions, json_arr);
});

let test = JSON.parse(sessionStorage.getItem(storage_conditions));
console.log(test);