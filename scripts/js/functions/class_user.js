//-------------------------------------------------------------------------------------------------------
// CIS 174: Class - User
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/***
 * @name User
 * @type {Class}
 * @param {HTMLElement} input_field
 * @param {HTMLElement} button
 * @param {HTMLElement} error_field
 * @method constructor
 * @method manageInputs
 * @method onClick
 */
/*------------------------------------------------------*/
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
        let x = this.convertTo('celsius', 'kelvin', 45.5);
        console.log(this.getPercentage('kelvin', 417.7));
        // element properties
        this.btn_convert    = document.getElementById('convert');
        this.btn_units_out  = document.getElementById('units_out');
        this.input_field    = document.getElementById('number_start');
        this.select_field   = document.getElementById('units_in');
        /***
         * @name errors
         * @type {Object}
         * @param {String} msg
         * @param {Boolean} hidden
         * @param {Boolean} active
         * @method hide
         * @method activate
         * @method printMsg
         */
        this.errors         = this.getErrorFields();

        // generate default state
        this.init();
        // init listen to selection inputs
        this.manageInputs();
    }
    /*------------------------------------------------------*/
    /***
     * @name init
     * @type {Method}
     */
    /*------------------------------------------------------*/
    init(){
        let init_data  = {
            fahrenheit: {temp: 100.0, active: true},
            celsius: {temp: this.convertTo('fahrenheit', 'celsius', 100.0), active: false},
            kelvin: {temp: this.convertTo('fahrenheit', 'kelvin', 100.0), active: false},
        };
        console.log(init_data);
        
        // set initial values

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
        let updateUnitsIn = (input, selected_out) => {
            let choices = input.querySelectorAll('option');
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
            btn.innerHTML = strToUpper(Object.entries(this.temperatures)[btn_index][0], 0);
            // set new index
            btn.setAttribute('data-index', btn_index);
            // return selected index
            return btn_index;
        }

        /***
         * @type {HTMLElement} units_out button
         * @listens units_out#click
         */
        this.btn_units_out.addEventListener('click', (event) => {
            // get selected units_in
            let selected_in     = this.temperatures[this.select_field.value].index;
            // update selected units_out
            let selected_out    = updateUnitsOut(event.target, selected_in);
            // update selected units_in
            updateUnitsIn(this.select_field, selected_out);
        });
    }
    /*------------------------------------------------------*/
    /***
     * @name onClick
     * @type {method}
     */
    /*------------------------------------------------------*/
    onClick(btn){
        // update errors
        this.errors     = this.getErrorFields();
        // clear errors
        this.clearErrors();
        // collect latest values
        let units_in    = this.select_field.value;
        this.units_out  = null;
        this.number     = this.getNumber(units_in);
        this.start      = this.getStartNumber(document.getElementById('current'));

    }
    /*------------------------------------------------------*/
    /***
     * @name displayError
     * @type {method}
     * @param {string} msg message to display
     * @param {string} error_ele_id id from html element
     */
    /*------------------------------------------------------*/
    displayError(msg, error_ele_id){
        // define error object properties
        this.errors[error_ele_id].msg = msg;
        this.errors[error_ele_id].printMsg();
        this.errors[error_ele_id].activate();
    }
    /*------------------------------------------------------*/
    /***
     * @name clearErrors
     * @type {method}
     */
    /*------------------------------------------------------*/
    clearErrors(){
        // define temp array
        let temp_arr = Object.entries(this.errors);
        // loop temp arr
        for(let [key, value] of temp_arr){
            // define error obj
            let error = value;
            if(error.active == true){
                // clear msg
                error.msg = '';
                // clear innerHTML
                error.printMsg();
                // hide error
                error.hide();
            }
        }
    }
    /*------------------------------------------------------*/
    /***
     * @name enableInput
     * @type {method}
     */
    /*------------------------------------------------------*/
    enableItems(){}
    /*------------------------------------------------------*/
    /***
     * @name disableInput
     * @type {method}
     */
    /*------------------------------------------------------*/
    disableItems(){}
    /*------------------------------------------------------*/
    /***
     * @name clearInput
     * @type {method}
     */
    /*------------------------------------------------------*/
    clearInput(){}
    /*------------------------------------------------------*/
    /***
     * @name getErrorFields
     * @type {method}
     */
    /*------------------------------------------------------*/
    getErrorFields(){
        // define properties
        let error_nodes = document.querySelectorAll('[id^="error--"]');
        let result      = {};
        // cycle errors
        for(let i = 0; i < error_nodes.length; i++){
            let error       = error_nodes[i];
            let temp_obj    = {
                node: error,
                msg: '',
                hidden: getElementState(error, 'hidden'),
                active: getElementState(error, 'active'),
                hide: function(){
                    setElementState(this.node, 'hidden');
                    this.active = false;
                    this.hidden = true;              
                },
                activate: function(){
                    setElementState(this.node, 'active'); 
                    this.active = true;
                    this.hidden = false;
                },
                printMsg: function(){this.node.innerHTML = this.msg;}
            };
            // join temp object to main object
            Object.assign(result, {[error.id]:temp_obj});
        }
        return result;
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
        let result  = this.input_field.value;
        let points  = result.split('.').length - 1;
        if(points > 1) {
            this.displayError('Only <b>one</b> decimal point accepted!', 'error--input');
        } else {
            // validate number: parse float
            result = parseFloat(this.input_field.value);
            // is not a number or is not finite
            if(isNaN(result) || !isFinite(result)){
                this.displayError('Please enter a number!', 'error--input');
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
                    this.displayError(msg, 'error--input');
                }
            }
        }
    }
    /*------------------------------------------------------*/
    /***
     * @name getUnitsOut
     * @type {method}
     */
    /*------------------------------------------------------*/
    getUnitsOut(){
        // TODO: grab units out
        // grab index from element attrib
        let btn_units_out   = document.getElementById('units_out');
        let index_out       = parseInt(btn_units_out.getAttribute('data-index'));
        Object.entries(this.temperatures)[btn_index][0], 0;
        // spit out
        return units_object[index_out].units;
    }
    /*------------------------------------------------------*/
    /***
     * @name getStartNumber
     * @type {method}
     */
    /*------------------------------------------------------*/
    getStartNumber(element){
        return parseFloat(element.getAttribute('data-current'));
    }
}