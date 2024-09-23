//-------------------------------------------------------------------------------------------------------
// CIS 174: Function - Thermometer
//-------------------------------------------------------------------------------------------------------
/*------------------------------------------------------*/
/***
 * Constant Variables:
 * @name user           @type {InstanceType} Class
 * @name units_object   @type {Object}
 */
/*------------------------------------------------------*/
const user          = new User();
const units_object  = [
    {units: 'fahrenheit', abbv: 'F', a: 0, b: 100},
    {units: 'celsius', abbv: 'C', a: -17.8, b: 212},
    {units: 'kelvin', abbv: 'K', a: 255.4, b: 310.9}
];
/*------------------------------------------------------*/
/***
 * @name onClickConvert
 * @type {EventListener}
 */
/*------------------------------------------------------*/
function onClickConvert(btn){
    // check selection and validate
    user.onClick(btn);
    // convert
    let number = new TempConverter(user.number, user.units_in, user.units_out, user.start);
    console.log(number.number_obj);
}