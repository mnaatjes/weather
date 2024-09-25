//-------------------------------------------------------------------------------------------------------
// CIS 174: Class - User
//-------------------------------------------------------------------------------------------------------
/*----------------------------------------------------------*/
/***
 * @name User
 * @type {Class}
 * @description 
 * @param {HTMLElement} input_field
 * @param {HTMLElement} button
 * @param {HTMLElement} error_field
 * @method constructor
 * @method manageInputs
 * @method onClick
 */
/*----------------------------------------------------------*/
class User extends TempConverter {
    /*------------------------------------------------------*/
    /***
     * @name constructor
     * @type {method}
     * @property {HTMLElement} btn_convert
     * @property {HTMLElement} btn_units_out
     * @property {HTMLElement} input_field
     * @property {HTMLElement} select_field
     * @property {Object} errors
     * @property {Object} tooltip
     */
    /*------------------------------------------------------*/
    constructor(){
        // TempConverter constructor
        super();
        // instantiate thermo
        this.thermometer = new Thermometer();
        /***
         * @name btn_convert
         * @type {Object}
         * @property {HTMLFormElement} node
         * @property {Boolean} enabled
         * @property {Boolean} disabled
         * @method enable
         * @method disable
         */
        this.btn_convert = {
            node: document.getElementById('btn_convert'),
            enabled: getElementState(document.getElementById('btn_convert'), 'enabled'),
            disabled: getElementState(document.getElementById('btn_convert'), 'disabled'),
            enable: function(){
                // update attribute
                this.node.setAttribute('data-state', 'enabled');
                // set properties
                this.enabled    = true;
                this.disabled   = false;
            },
            disable: function(){
                // update attribute
                this.node.setAttribute('data-state', 'disabled');
                // set properties
                this.enabled    = false;
                this.disabled   = true;
            }
        };
        /***
         * @name btn_units_out
         * @type {Object}
         * @property {HTMLFormElement} node
         * @method getIndex
         * @property {Boolean} enabled
         * @property {Boolean} disabled
         * @method enable
         * @method disable
         */
        this.btn_units = {
            node: document.getElementById('units_out'),
            getIndex: function(){return this.node.getAttribute('data-index');},
            enabled: getElementState(document.getElementById('units_out'), 'enabled'),
            disabled: getElementState(document.getElementById('units_out'), 'disabled'),
            enable: function(){
                // update attribute
                this.node.setAttribute('data-state', 'enabled');
                // set properties
                this.enabled    = true;
                this.disabled   = false;
            },
            disable: function(){
                // update attribute
                this.node.setAttribute('data-state', 'disabled');
                // set properties
                this.enabled    = false;
                this.disabled   = true;
            },
        };
        /***
         * @name input_field
         * @type {Object}
         * @property {HTMLFormElement} node
         * @property {String} value number in
         * @property {Boolean} enabled
         * @property {Boolean} disabled
         * @method enable
         * @method disable
         * @method clear
         */
        this.input_field = {
            node: document.getElementById('number_start'),
            getValue: function(){return document.getElementById('number_start').value;},
            enabled: getElementState(document.getElementById('number_start'), 'enabled'),
            disabled: getElementState(document.getElementById('number_start'), 'disabled'),
            enable: function(){
                // update attribute
                this.node.setAttribute('data-state', 'enabled');
                // set properties
                this.enabled    = true;
                this.disabled   = false;
            },
            disable: function(){
                // update attribute
                this.node.setAttribute('data-state', 'disabled');
                // set properties
                this.enabled    = false;
                this.disabled   = true;
            },
            clear: function(){document.getElementById('number_start').value = '';}
        };
        /***
         * @name input_select
         * @type {Object}
         * @property {HTMLFormElement} node
         * @property {HTMLCollection} options
         * @method getValue units in
         * @property {Boolean} enabled
         * @property {Boolean} disabled
         * @method enable
         * @method disable
         */
        this.input_select = {
            node: document.getElementById('units_in'),
            options: document.getElementById('units_in').children,
            getValue: function(){return document.getElementById('units_in').value;},
            enabled: getElementState(document.getElementById('units_in'), 'enabled'),
            disabled: getElementState(document.getElementById('units_in'), 'disabled'),
            enable: function(){
                // update attribute
                this.node.setAttribute('data-state', 'enabled');
                // set properties
                this.enabled    = true;
                this.disabled   = false;
            },
            disable: function(){
                // update attribute
                this.node.setAttribute('data-state', 'disabled');
                // set properties
                this.enabled    = false;
                this.disabled   = true;
            }
        };
        /***
         * @name tooltip thermo tooltip display
         * @type {Object}
         * @property {HTMLElement} node_parent
         * @property {HTMLElement} node_temp
         * @property {HTMLElement} node_unit
         * @method setData
         * @method getData
         */
        this.tooltip = {
            node_parent: document.getElementById('current'),
            node_temp: document.getElementById('current').childNodes[0],
            node_unit: document.getElementById('current').childNodes[1],
            setData: function(data_obj){
                // set attribute - parent
                this.node_parent.setAttribute('data-current', JSON.stringify(data_obj));
                // print temp
                this.node_temp.innerHTML = data_obj.temp.toFixed(1);
                // print unit abbv
                this.node_unit.innerHTML = `&deg;${data_obj.abbv}`;
            },
            getData: function(){return JSON.parse(this.node_parent.getAttribute('data-current'));},
        };
        /***
         * @name error
         * @type {Object}
         * @param {String} msg
         * @param {Boolean} hidden
         * @param {Boolean} active
         * @method hide
         * @method activate
         * @method printMsg
         */
        this.error = {
            node: document.getElementById('error--input'),
            hidden: getElementState(document.getElementById('error--input'), 'hidden'),
            active: getElementState(document.getElementById('error--input'), 'active'),
            hide: function(){
                // clear text
                this.node.innerHTML = '';
                // set to hidden
                setElementState(this.node, 'hidden');
                this.active = false;
                this.hidden = true; 
            },
            activate: function(msg){
                // print msg
                this.node.innerHTML = msg;
                // set to active
                setElementState(this.node, 'active');
                this.active = true;
                this.hidden = false;
            }
        };
        // call initializing methods
        this.init();
        /***
         * @name input_container
         * @type {HTMLElement}
         * @property {HTMLElement} node
         * @property {Boolean} enabled
         * @property {Boolean} disabled
         * @method enable
         * @method disable
         */
        this.input_container = {
            node: document.getElementById('input_container'),
            enabled: getElementState(document.getElementById('input_container'), 'enabled'),
            disabled: getElementState(document.getElementById('input_container'), 'disabled'),
            enable: function(){
                // update attribute
                this.node.setAttribute('data-state', 'enabled');
                // set properties
                this.enabled    = true;
                this.disabled   = false;
            },
            disable: function(){
                // update attribute
                this.node.setAttribute('data-state', 'disabled');
                // set properties
                this.enabled    = false;
                this.disabled   = true;
            }
        };
        /***
         * @name hints
         * @type {Object}
         * @property {HTMLCollection} nodes
         * @property {Boolean} enabled
         * @property {Boolean} disabled
         * @method enable
         * @method disable
         */
        this.hints = {
            nodes: document.getElementsByClassName('hint'),
            enabled: true,
            disabled: false,
            enable: function(){
                // loop nodes
                for(let i = 0; i < this.nodes.length; i++){
                    // update attribute
                    this.nodes[i].setAttribute('data-state', 'enabled');
                }
                // set properties
                this.enabled    = true;
                this.disabled   = false;
            },
            disable: function(){
                // loop nodes
                for(let i = 0; i < this.nodes.length; i++){
                    // update attribute
                    this.nodes[i].setAttribute('data-state', 'disabled');
                }
                // set properties
                this.enabled    = false;
                this.disabled   = true;
            }
        };
    }
    /*------------------------------------------------------*/
    /***
     * @name init
     * @type {Method}
     */
    /*------------------------------------------------------*/
    init(){
        // initialize thermo data
        let data_obj_init = {
            units: 'celsius',
            min: this.temperatures.celsius.a,
            max: this.temperatures.celsius.b,
            abbv: this.temperatures.celsius.abbv,
            temp: this.temperatures.celsius.b
        };
        // initialize thermometer data - tooltip
        this.tooltip.setData(data_obj_init);
        // initialize thermometer data - scale
        let data_obj_scale = {
            units: 'fahrenheit',
            min: this.temperatures.fahrenheit.a,
            max: this.temperatures.fahrenheit.b,
            abbv: this.temperatures.fahrenheit.abbv,
            temp: this.temperatures.fahrenheit.b
        }
        this.thermometer.temp_scale.setMax(data_obj_scale);
        this.thermometer.temp_scale.setMin(data_obj_scale);
        // init temp events
        this.thermometer.temp_events.setEvents();
        this.thermometer.temp_events.updateEvents();
        // init listen to selection inputs
        this.manageInputs();
    }
    /*------------------------------------------------------*/
    /***
     * @name manageInputs
     * @type {EventListener}
     */
    /*------------------------------------------------------*/
    manageInputs(){
        /***
         * @name updateUnitsIn
         * @type {function}
         * @param {HTMLElement} input select element
         * @param {number} selected_out index of units object
         * @return {number} updated index
         */
        let updateUnitsIn = (choices, selected_out) => {
            // get selected units
            for(let i = 0; i < choices.length; i++){
                // define index of choices rel to units_object obj
                let out_index = this.temperatures[choices[i].value].index;
                // if selected
                if(selected_out == out_index){
                    choices[i].style.display = 'none';
                } else {
                    choices[i].style.display = 'block';
                }
            }
        }
        /***
         * @name onClickUnitsOut
         * @type {function}
         * @param {HTMLElement} btn btn element
         * @param {number} selected_in index of units object
         * @return {number} updated index
         */
        let updateUnitsOut = (btn, selected_in) => {
            // get index from element
            let btn_index = parseInt(btn.getAttribute('data-index'));
            // logic
            switch(btn_index){
                case 0:
                    if(selected_in == 1){btn_index += 2;}
                    else {btn_index += 1;}
                    break;
                case 1:
                    if(selected_in == 2){btn_index = 0;}
                    else {btn_index += 1;}
                    break;
                case 2:
                    if(selected_in == 0){btn_index = 1;}
                    else{btn_index = 0;}
                    break;
                default:
                    console.log('ERROR!');
            }
            // print unit
            let units_to    = Object.entries(this.temperatures)[btn_index][0];
            btn.innerHTML   = strToUpper(units_to, 0);
            // set new index
            btn.setAttribute('data-index', btn_index);
            // update tooltip data
            let old_data = this.tooltip.getData();
            let data_obj = {
                units: units_to,
                min: this.temperatures[units_to].a,
                max: this.temperatures[units_to].b,
                abbv: this.temperatures[units_to].abbv,
                temp: this.convertTo(old_data.units, units_to, old_data.temp)
            };
            // set tooltip data
            this.tooltip.setData(data_obj);
            // update thermo events
            let event_items     = this.thermometer.temp_events.event_items;
            let data_obj_events = [];
            for(let i = 0; i < event_items.length; i++){
                // get current temp
                let item_temp_in    = event_items[i];
                // get converted temp
                let item_temp_out   = this.convertTo(item_temp_in.units, units_to, item_temp_in.temp);
                let temp_obj        = {
                    units: units_to,
                    temp: item_temp_out,
                    abbv: this.temperatures[units_to].abbv
                };
                data_obj_events.push(temp_obj);
            }
            // update events
            this.thermometer.temp_events.setEvents(data_obj_events);
            // return selected index
            return btn_index;
        }
        /***
         * @type {HTMLElement} units_out button
         * @listens units_out#click
         * @param {event} event
         */
        this.btn_units.node.addEventListener('click', (event) => {
            // get selected units_in
            let selected_in     = this.temperatures[this.input_select.getValue()].index;
            // update selected units_out
            let selected_out    = updateUnitsOut(event.target, selected_in);
            // update selected units_in
            updateUnitsIn(this.input_select.options, selected_out);
        });
        /***
         * @type {HTMLElement} input_select
         * @listens units_in#change
         * @param {event} event
         */
        this.input_select.node.addEventListener('change', (event) => {
            // get updated thermo scale data
            let units_from  = event.target.value;
            let data_obj    = {
                units: units_from,
                min: this.temperatures[units_from].a,
                max: this.temperatures[units_from].b,
                abbv: this.temperatures[units_from].abbv,
                temp: null
            };
            // update number scale
            this.thermometer.temp_scale.setMax(data_obj);
            this.thermometer.temp_scale.setMin(data_obj);
        });
        /***
         * @type {HTMLElement} btn_click
         * @listens btn_convert#click
         * @param {event} event
         */
        this.btn_convert.node.addEventListener('click', (event) => {
            // manage converting of number
            this.manageConvert();
        });
    }
    /*------------------------------------------------------*/
    /***
     * @name manageConvert
     * @type {method}
     */
    /*------------------------------------------------------*/
    manageConvert(){
        // clear errors
        this.error.hide();
        // collect latest values
        let units_in        = this.input_select.getValue();
        let units_out       = this.tooltip.getData().units;
        let number_start    = this.tooltip.getData().temp;
        let number_end      = this.getNumber(units_in);
        // check if number validated
        if(number_end !== false){
            // hide hints
            this.hints.disable();
            // run conversion
            let converted_num   = this.convertTo(units_in, units_out, number_end);
            let number_object   = {
                start: number_start,
                end: converted_num,
                units: units_out,
                percentage: this.getPercentage(units_out, converted_num),
                counter_state: this.compareNumbers(number_start, converted_num),
                min: this.temperatures[units_out].a,
                max: this.temperatures[units_out].b
            };
            // disable input elements
            this.disableInputs();
            // animate thermometer
            this.thermometer.animateThermometer(number_object, this.tooltip);
            // listen to transition
            let event_transition = () => {
                // enable input elements
                this.enableInputs();
                // update tooltip data
                this.tooltip.setData({
                    units: number_object.units,
                    temp: number_object.end,
                    abbv: this.temperatures[number_object.units].abbv
                });
                // enable inputs
                this.enableInputs();
                // reset info events
                this.thermometer.temp_events.resetEvents();
                // end event
                this.thermometer.mercury.removeEventListener('transitionend', event_transition);
            };
            // run event listener: transition
            this.thermometer.mercury.addEventListener('transitionend', event_transition);
        }
    }
    /*------------------------------------------------------*/
    /***
     * @name enableInputs
     * @type {method}
     */
    /*------------------------------------------------------*/
    enableInputs(){
        // input field
        this.input_field.enable();
        this.input_field.clear();
        // select field
        this.input_select.enable();
        // units_out button
        this.btn_units.enable();
        // convert button
        this.btn_convert.enable();
        // Input Container
        this.input_container.enable();
    }
    /*------------------------------------------------------*/
    /***
     * @name disableInput
     * @type {method}
     */
    /*------------------------------------------------------*/
    disableInputs(){
        // input field
        this.input_field.disable();
        // select field
        this.input_select.disable();
        // units_out button
        this.btn_units.disable();
        // convert button
        this.btn_convert.disable();
        // Input Container
        this.input_container.disable();
    }
    /*------------------------------------------------------*/
    /***
     * @name getNumber
     * @type {method}
     * @param {string} units_in
     */
    /*------------------------------------------------------*/
    getNumber(units_in){
        // validate number: check for decimals
        let result  = this.input_field.getValue();
        let points  = result.split('.').length - 1;
        if(points > 1) {
            this.error.activate('Only <b>one</b> decimal point accepted!');
            return false;
        } else {
            // validate number: parse float
            result = parseFloat(this.input_field.getValue());
            // is not a number or is not finite
            if(isNaN(result) || !isFinite(result)){
                this.error.activate('Please enter a number!');
                return false;
            } else {
                // get range from units
                let min     = this.temperatures[units_in].a;
                let max     = this.temperatures[units_in].b;
                let abbv    = this.temperatures[units_in].abbv;
                // validate range
                if(result >= min && result <= max){
                    // number valid
                    return parseFloat(result.toFixed(1));
                } else {
                    // report error
                    let msg = `Numbers in &deg;${abbv} must be between: <b>${min} and ${max}</b>`;
                    this.error.activate(msg);
                    return false;
                }
            }
        }
    }
}