//-------------------------------------------------------------------------------------------------------
// CIS 174: Class - TempConverter
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/***
 * @name TempConverter
 * @type {Class}
 * @param {float} input_number
 * @property {Object} conversions
 */
/*------------------------------------------------------*/
class TempConverter{
    constructor(input_number, units_from, units_to="fahrenheit", start_number){
        this.number         = input_number;
        this.start          = start_number;
        this.units_from     = units_from;
        this.units_to       = units_to;
        // initialization:
        this.convertTo();
    }
    /*------------------------------------------------------*/
    /***
     * @name convertTo
     * @type {method}
     * @return {float} result = converted float C and K
     */
    /*------------------------------------------------------*/
    convertTo(){
        // units_from
        switch(this.units_from){
            // fahrenheit
            case ('fahrenheit'):
                this.convertFromFahrenheit();
                break;
            // celsius
            case ('celsius'):
                this.convertFromCelsius();
                break;
            // kelvin
            case ('kelvin'):
                this.convertFromKelvin();
                break;
            default:
                console.log('ERROR!');
        }
    }
    /*------------------------------------------------------*/
    /***
     * @name convertFromFahrenheit
     * @type {method}
     * @return {float} result = converted float C and K
     */
    /*------------------------------------------------------*/
    convertFromFahrenheit(){
        // set result property
        let result;
        // run conversion
        if(this.units_to == 'celsius'){
            result = (this.number - 32) * (5/9);
        }
        else if(this.units_to == 'kelvin'){
            result = (this.number - 32) * (5/9) + 273.15;
        }
        // compile number object
        this.buildNumberObject(result);
    }
    /*------------------------------------------------------*/
    /***
     * @name convertFromCelsius
     * @type {method}
     * @return {float} result = converted float C and K
     */
    /*------------------------------------------------------*/
    convertFromCelsius(){
        // set result property
        let result;
        // run conversion
        if(this.units_to == 'fahrenheit'){
            result = (this.number * (9/5)) + 32;
        }
        else if(this.units_to == 'kelvin'){
            result = this.number + 273.15;
        }
        // compile number object
        this.buildNumberObject(result);
    }
    /*------------------------------------------------------*/
    /***
     * @name convertFromKelvin
     * @type {method}
     * @return {float} result = converted float C and K
     */
    /*------------------------------------------------------*/
    convertFromKelvin(){
        // set result property
        let result;
        // run conversion
        if(this.units_to == 'fahrenheit'){
            result = ((this.number - 273.15) * (9/5)) + 32;
        }
        else if(this.units_to == 'celsius'){
            result = this.number - 273.15;
        }
        // compile number object
        this.buildNumberObject(result);
    }
    /*------------------------------------------------------*/
    /***
     * @name buildNumberObject
     * @type {method}
     * @return start, end, counter_state
     */
    /*------------------------------------------------------*/
    buildNumberObject(result){
        // create number object
        this.number_obj = {
            start: null,
            end: parseFloat(result.toFixed(1)),
            units_from: this.units_from,
            units_to: this.units_to,
            percentage: this.getPercentage(result.toFixed(1)),
            counter_state: this.compareNumbers(this.number, result)
        };
    }
    /*------------------------------------------------------*/
    /***
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
    /*------------------------------------------------------*/
    /***
     * @name getPercentage
     * @type {method}
     */
    /*------------------------------------------------------*/
    getPercentage(number){
        let result = 0;
        // define range map
        let range_map = {
            fahrenheit: {a: 0, b: 100},
            celsius: {a: -17.8, b: 212},
            kelvin: {a: 255.4, b: 310.9}
        };
        // run function
        result = 100 * ((number - range_map[this.units_to].a) / (range_map[this.units_to].b - range_map[this.units_to].a));
        // convert float and return result
        return `${result.toFixed(1)}%`;
    }
}