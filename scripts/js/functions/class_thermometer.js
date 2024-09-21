//-------------------------------------------------------------------------------------------------------
// CIS 174: Class - Thermometer
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/***
 * @name Thermometer
 * @type {Class}
 * @param {string} thermo_id thermometer id type
 * @property {HTMLElement} thermo
 * @property {HTMLElement} mercury
 * @property {HTMLElement} tooltip
 * @property {HTMLAttribute} number_current
 * @property {Object} conversions
 */
/*------------------------------------------------------*/
class Thermometer{
    constructor(thermo_id){
        // HTML Element Properties
        this.thermometer        = document.getElementById(thermo_id);
        this.mercury            = this.thermometer.querySelector('.thermo__mercury');
        this.tooltip            = this.mercury.querySelector('.mercury__tooltip');
        this.target             = this.tooltip.querySelector('span');
        // Number Properties
        this.number_current     = parseFloat(this.tooltip.getAttribute('data-current'));
    }
    /*------------------------------------------------------*/
    /***
     * @name animateThermometer
     * @type {method}
     */
    /*------------------------------------------------------*/
    animateThermometer(number_obj){
        // set percentage mercury
        this.thermometer.style.setProperty('--mercury-height', number_obj.percentage);
        // set color variable
        // set timing
        let duration = this.calculateTiming(number_obj.start, number_obj.end);
        this.thermometer.style.setProperty('--mercury-timing', duration);
        // update counter
        this.updateCounter(number_obj, this.target);
    }
    /*------------------------------------------------------*/
    /***
     * @name updateCounter
     * @type {method}
     */
    /*------------------------------------------------------*/
    updateCounter(number_obj, target){
        let count       = number_obj.start;
        console.log(typeof count);
        console.log(number_obj.counter_state);
        let interval    = setInterval(function(){
            // determine increment/decrement
            if(number_obj.counter_state == false){count -= 0.1;}
            else if(number_obj.counter_state == true){count += 0.1;}
            // format count
            count = parseFloat(count.toFixed(1));
            console.log(count);
            // update page
            target.innerHTML = count.toFixed(1);
            // check for end state
            if (count == number_obj.end){
                // stop counter
                clearInterval(interval);
            }
        }, 1);
    }
    /*------------------------------------------------------*/
    /***
     * @name calculateTiming
     * @type {method}
     */
    /*------------------------------------------------------*/
    calculateTiming(start, end){
        let result;
        result = Math.abs((start - end) * 0.0365);
        return `${result.toFixed(4)}s`
    }
}