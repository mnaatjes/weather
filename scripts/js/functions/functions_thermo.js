//-------------------------------------------------------------------------------------------------------
// CIS 174: Functions - Thermo
//-------------------------------------------------------------------------------------------------------
// element properties
const fahrenheit    = document.getElementById('fahrenheit');
const tooltip_f     = fahrenheit.querySelector('.mercury__tooltip').querySelector('span');
// count properties
let count_f         = parseFloat(tooltip_f.innerHTML).toFixed(1);
// style properties
let f_style         = getComputedStyle(fahrenheit);
//console.log(tooltip_f);
/*------------------------------------------------------*/
/***
 * @name tempConverter
 * @type {function}
 * @param {float} number        number to convert
 * @param {string} units_in     units converting from
 * @param {string} units_out    units converting to
 */
/*------------------------------------------------------*/
function tempConverter(number, units_in, units_out){
    let result = 0;
    // if --> units in
    switch(units_in){
        // fahrenheit
        case 'fahrenheit':
            if(units_out == 'celsius'){result = (number - 32) * (5/9);}
            else if(units_out == 'kelvin'){result = (number - 32) * (5/9) + 273.15;}
            break;
        // celsius
        case 'celsius':
            if(units_out == 'fahrenheit'){result = (number * (9/5)) + 32;}
            else if(units_out == 'kelvin'){result = number + 273.15;}
            break;
        // kelvin
        case 'kelvin':
            if(units_out == 'fahrenheit'){result = (number - 273.15) * (9/5) + 32;}
            else if(units_out == 'celsius'){result = number - 273.15;}
            break;
        default:
            console.log('ERROR!');
    }
    // set float decimals & return
    return result.toFixed(1);
}
/*------------------------------------------------------*/
/***
 * @name updateCount
 */
/*------------------------------------------------------*/
function updateCount(start, end, target){
    let count = start;
    let interval = setInterval(function(){
        count -= 0.1;
        count = parseFloat(count).toFixed(1)
        target.innerHTML = count;
        if (count == end){
            clearInterval(interval);
        }
    }, 1);
}
/*------------------------------------------------------*/
/***
 * @name thermoController
 */
/*------------------------------------------------------*/
function thermoController(thermo, start, end, tooltip){
    // countdown
    updateCount(start, end, tooltip);
    // set end height
    let end_height = `calc(${end}% + 24px)`;
    thermo.style.setProperty('--mercury-height', `${end_height}`);
    // set end color
    /*
    if(end < 50.0){
        thermo.style.setProperty('--mercury-end-color', `cornflowerblue`);
    }
    */

    // set time


}
let target_num  = 0.0;
//thermoController(fahrenheit, count_f, target_num, tooltip_f);
/*------------------------------------------------------*/
/***
 * @name mapPercentage
 */
/*------------------------------------------------------*/
function mapPercentage(number, units){
    let result = 0;
    // define range map
    let range_map = {
        fahrenheit: {a: 0, b: 100},
        celsius: {a: 17.8, b: 212},
        kelvin: {a: 255.4, b: 310.9}
    };
    // run function
    result = 100 * ((number - range_map[units].a) / (range_map[units].b - range_map[units].a));
    // convert float and return result
    return result.toFixed(1);
}

// Implementation
let test    = new TempConverter(55, 'fahrenheit');
let thermo  = new Thermometer('fahrenheit')
test.setStartNum(thermo.number_current);
console.log(test.number_obj);
thermo.animateThermometer(test.number_obj);