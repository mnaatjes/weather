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
    constructor(input_number, units_to="fahrenheit"){
        this.number         = parseFloat(input_number).toFixed(1);
        this.units_to       = units_to;
        this.number_obj = {
            start: null,
            end: null,
            units: '',
            percentage: '',
            counter_state: null
        };
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
        // set result property
        let result;
        // run conversion
        if(this.units_to == 'celsius'){
            result = (this.number - 32) * (5/9);
        }
        else if(this.units_to == 'kelvin'){
            result = (this.number - 32) * (5/9) + 273.15;
        } else if (this.units_to == 'fahrenheit'){
            result = parseFloat(this.number);
        }
        // format result and appent to obj
        this.number_obj.end     = parseFloat(result.toFixed(1));
        // append units to object
        this.number_obj.units   = this.units_to
        // get percentage and append
        this.getPercentage(result.toFixed(1));
    }
    /*------------------------------------------------------*/
    /***
     * @name compareNumbers
     * @type {method}
     * @return start, end, counter_state
     */
    /*------------------------------------------------------*/
    compareNumbers(){
        if (this.number_obj.start > this.number_obj.end){
            this.number_obj.counter_state = false;
        } else if (this.number_obj.start < this.number_obj.end){
            this.number_obj.counter_state = true;
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
        this.number_obj.percentage = `${result.toFixed(1)}%`;
    }
    /*------------------------------------------------------*/
    /***
     * @name setStartNum
     * @type {method}
     */
    /*------------------------------------------------------*/
    setStartNum(number){
        // add to conversion obj
        this.number_obj.start = parseFloat(number.toFixed(1));
        // compage numbers to determine incre/decre
        this.compareNumbers();
    }
}