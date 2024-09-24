//-------------------------------------------------------------------------------------------------------
// CIS 174: Class - Thermometer
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/***
 * @name Thermometer
 * @type {Class}
 * @property {HTMLElement} thermo
 * @property {HTMLElement} mercury
 * @property {HTMLElement} tooltip
 * @property {HTMLAttribute} number_current
 * @property {Object} conversions
 */
/*------------------------------------------------------*/
class Thermometer{
    constructor(){
        // HTML Element Properties
        this.thermometer        = document.getElementById('thermo_main');
        this.mercury            = this.thermometer.querySelector('.thermo__mercury');
        /***
         * @name temp_scale
         * @type {Object}
         */
        this.temp_scale         = {
            node_parent: document.getElementById('temp_scale'),
            node_max: document.getElementById('temp_scale').children[0],
            node_min: document.getElementById('temp_scale').children[1],
            setMax: function(data_obj){
                // set data
                let nodes           = this.node_max.children;
                nodes[0].innerHTML  = data_obj.max.toFixed(1);
                nodes[1].innerHTML  = data_obj.abbv;
            },
            setMin: function(data_obj){
                // set data
                let nodes           = this.node_min.children;
                nodes[0].innerHTML  = data_obj.min.toFixed(1);
                nodes[1].innerHTML  = data_obj.abbv;
            }
        };
        /***
         * @name temp_events
         * @type {Object}
         */
        this.temp_events        = {
            node_parent: document.getElementById('temp_events'),
            event_items: [
                {desc: 'Water Boils', temp: 100.0, units: 'celsius', abbv: 'C', state: 'disabled'},
                {desc: 'Highest Temp in US', temp: 56.7, units: 'celsius', abbv: 'C', state: 'disabled'},
                {desc: 'Water Freezes', temp: 0.0, units: 'celsius', abbv: 'C', state: 'disabled'},
                {desc: 'Empty', temp: -30.0, units: 'celsius', abbv: 'C', state: 'disabled'},
                {desc: 'Empty', temp: -90.0, units: 'celsius', abbv: 'C', state: 'disabled'},
                {desc: 'Coldest Temp on Moon', temp: -173.0, units: 'celsius', abbv: 'C', state: 'disabled'},
                {desc: 'Absolute Zero', temp: -273.0, units: 'celsius', abbv: 'C', state: 'disabled'}
            ],
            setEvents: function(data_obj){
                // loop parent
                let nodes = this.node_parent.children;
                for(let i = 0; i < nodes.length; i++){
                    let node = nodes[i];
                    let item = this.event_items[i];
                    // convert if new data
                    if(data_obj){
                        // convert to units_to data
                        item.temp   = data_obj[i].temp;
                        item.units  = data_obj[i].units;
                        item.abbv   = data_obj[i].abbv;
                        item.state  = 'disabled';
                        // print data
                        node.setAttribute('data-temp', item.temp);
                        node.innerHTML = item.desc;
                    } else {
                        // init data
                        node.setAttribute('data-temp', item.temp);
                        node.innerHTML = item.desc;
                    }
                }
            },
            updateEvents: function(temp){
                // loop parent
                let nodes = this.node_parent.children;
                for(let i = 0; i < nodes.length; i++){
                    let node = nodes[i];
                    let item = this.event_items[i];
                    // match temp
                    if(temp == item.temp){
                    // update data attribute
                    node.setAttribute('data-state', 'enabled');
                    // update data object
                    item.state = 'enabled';
                    }
                }
            },
            resetEvents: function(){
                // loop parent
                let nodes = this.node_parent.children;
                for(let i = 0; i < nodes.length; i++){
                    let node = nodes[i];
                    let item = this.event_items[i];
                    // update data attribute
                    node.setAttribute('data-state', 'disabled');
                    // update data object
                    item.state = 'disabled';
                }
            }
        };
    }
    /*------------------------------------------------------*/
    /***
     * @name animateThermometer
     * @type {method}
     */
    /*------------------------------------------------------*/
    animateThermometer(number_obj, tooltip){
        // set percentage mercury
        this.thermometer.style.setProperty('--mercury-height', number_obj.percentage);
        // set color variable
        // set timing
        let duration = this.calculateTiming(number_obj.start, number_obj.end);
        this.thermometer.style.setProperty('--mercury-timing', duration);
        // update counter
        this.updateCounter(number_obj, tooltip.node_temp);
    }
    /*------------------------------------------------------*/
    /***
     * @name updateCounter
     * @type {method}
     */
    /*------------------------------------------------------*/
    updateCounter(number_obj, target){
        let count       = number_obj.start;
        let interval    = setInterval(() => {
            // determine increment/decrement
            if(number_obj.counter_state == false){count -= 0.1;}
            else if(number_obj.counter_state == true){count += 0.1;}
            // format count
            count = parseFloat(count.toFixed(1));
            // update tooltip
            target.innerHTML = count.toFixed(1);
            // TODO: update mercury color gradient
            // check and update temp events
            this.temp_events.updateEvents(count);
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
        result = Math.abs((start - end) * 0.045);
        return `${result.toFixed(4)}s`
    }
    /*------------------------------------------------------*/
    /***
     * @name updateMercuryColor
     * @type {method}
     */
    /*------------------------------------------------------*/
    updateMercuryColor(number_obj){
        // get properties
        // temp
        // percentage
        // compare percentage with scale
        // update css color variable
    }
}