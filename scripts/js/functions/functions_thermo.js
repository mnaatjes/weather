//-------------------------------------------------------------------------------------------------------
// CIS 174: Functions - Thermo
//-------------------------------------------------------------------------------------------------------
const fahrenheit = document.getElementById('fahrenheit');
console.log(fahrenheit);
let f_style = getComputedStyle(fahrenheit);
console.log(f_style.getPropertyValue('--thermo-height'));
fahrenheit.style.setProperty('--temp-height', '15%');
/*------------------------------------------------------*/
/***
 * @name thermoController
 */
/*------------------------------------------------------*/
function thermoController(){

}