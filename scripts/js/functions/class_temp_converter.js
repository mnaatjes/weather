//-------------------------------------------------------------------------------------------------------
// CIS 174: Class - TempConverter
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/**
 * @name TempConverter
 * @type {Class}
 * @namespace TempConverter
 * @description This class converts temperatures from x to y
 * @property {Object} temperatures
 */
/*------------------------------------------------------*/
class TempConverter{
    constructor(){
        /**
         * @memberof TempConverter
         * @name temperatures
         * @type {Object}
         * @property {Object} fahrenheit
         * @property {Object} celsius
         * @property {Object} kelvin
         */
        this.temperatures = {
            fahrenheit: {index: 0, abbv: 'F', a: -460.0, b: 212.0},
            celsius: {index: 1, abbv: 'C', a: -273.2, b: 100.0},
            kelvin: {index: 2, abbv: 'K', a: 0.0, b: 373.0}
        };
    }
    /*------------------------------------------------------*/
    /**
     * @name convertTo
     * @type {method}
     * @return {float} result = converted float C and K
     */
    /*------------------------------------------------------*/
    convertTo(units_from, units_to, number){
        // units_from
        switch(units_from){
            // fahrenheit
            case ('fahrenheit'):
                return this.convertFromFahrenheit(units_to, number);
            // celsius
            case ('celsius'):
                return this.convertFromCelsius(units_to, number);
            // kelvin
            case ('kelvin'):
                return this.convertFromKelvin(units_to, number);
            default:
                console.log('ERROR!');
        }
    }
    /*------------------------------------------------------*/
    /**
     * @name convertFromFahrenheit
     * @type {method}
     * @return {float} result = converted float C and K
     */
    /*------------------------------------------------------*/
    convertFromFahrenheit(units_to, number){
        // set result property
        let result;
        // run conversion
        if(units_to == 'celsius'){
            result = (number - 32) * (5/9);
        }
        else if(units_to == 'kelvin'){
            result = (number - 32) * (5/9) + 273.15;
        } else if (units_to == 'fahrenheit'){result = number;}
        // return converted number
        return parseFloat(result.toFixed(1));
    }
    /*------------------------------------------------------*/
    /**
     * @name convertFromCelsius
     * @type {method}
     * @return {float} result = converted float C and K
     */
    /*------------------------------------------------------*/
    convertFromCelsius(units_to, number){
        // set result property
        let result;
        // run conversion
        if(units_to == 'fahrenheit'){
            result = (number * (9/5)) + 32;
        }
        else if(units_to == 'kelvin'){
            result = number + 273.15;
        } else if (units_to == 'celsius'){result = number;}
        // return converted number
        return parseFloat(result.toFixed(1));
    }
    /*------------------------------------------------------*/
    /**
     * @name convertFromKelvin
     * @type {method}
     * @return {float} result = converted float C and K
     */
    /*------------------------------------------------------*/
    convertFromKelvin(units_to, number){
        // set result property
        let result;
        // run conversion
        if(units_to == 'fahrenheit'){
            result = ((number - 273.15) * (9/5)) + 32;
        }
        else if(units_to == 'celsius'){
            result = number - 273.15;
        } else if (units_to == 'kelvin'){result = number;}
        // return converted number
        return parseFloat(result.toFixed(1));
    }
    /*------------------------------------------------------*/
    /**
     * @name buildNumberObject
     * @type {method}
     * @return start, end, counter_state
     */
    /*------------------------------------------------------*/
    buildNumberObject(units, number){
        // create number object
        let number_obj = {
            number: parseFloat(number.toFixed(1)),
            units: units,
            percentage: this.getPercentage(units, number.toFixed(1)),
        };
        return number_obj;
    }
    /*------------------------------------------------------*/
    /**
     * @name getPercentage
     * @type {Method}
     * @param {String} units
     * @param {Number} number float
     */
    /*------------------------------------------------------*/
    getPercentage(units, number){
        let result = 0;
        // define range map
        let min = this.temperatures[units].a;
        let max = this.temperatures[units].b;
        // run function
        result = 100 * ((number - min) / (max - min));
        // convert float and return result
        return `${result.toFixed(1)}%`;
    }
    /*------------------------------------------------------*/
    /**
     * @name compareNumbers
     * @type {method}
     * @return start, end, counter_state
     */
    /*------------------------------------------------------*/
    compareNumbers(start, end){
        if (start > end){
            return false;
        } else if (start < end){
            return true;
        }
    }
}