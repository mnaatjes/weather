//-------------------------------------------------------------------------------------------------------
// CIS 170: Functions
//-------------------------------------------------------------------------------------------------------

/*------------------------------------------------------*/
/***
 * @name range
 * @param {number} start beginning of range
 * @param {number} end end of range
 */
/*------------------------------------------------------*/
function range(start, end) {
    var result = [];
    
    for (let i = start; i <= end; i++) {
        result.push(i);
    }

    return result;
}
/*------------------------------------------------------*/
/***
 * @name random
 * @param {number} minimum_value beginning of range
 * @param {number} maximum_value end of range
 * @return {number} result
 */
/*------------------------------------------------------*/
function random(minimum_value, maximum_value){
    let result = Math.random() * (maximum_value - minimum_value) + minimum_value;
    return result;
}
/*------------------------------------------------------*/
/***
 * @name strToUpper produces uppercase letter at string index
 * @param {string}  string string to manipulate
 * @param {number}  index index of string to alter
 * @example         func(string-to-capitalize, index of capitalization);
 * @return {string} result: altered string
 */
/*------------------------------------------------------*/
function strToUpper(string, index) {
    
    let result = string.charAt(index).toUpperCase() + string.slice(index+1);
    
    return result;
}
/*------------------------------------------------------*/
/***
 * @name includeHTML 
 * @param {string} filetype 
 * @example filetype = html --> 'data-include-html' includes 
 */
/*------------------------------------------------------*/
function includeHTML(filetype) {
    var all_elements;
    let attibute = 'data-include-' + filetype;
    all_elements = document.getElementsByTagName('*');
    // loop all elements
    for (let i=0; i < all_elements.length; i++) {
        let element     = all_elements[i];
        let file   = element.getAttribute(attibute);
        if (file) {
            // make ajax request
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    //if (this.status == 200) {console.log(this.responseText)}
                    if (this.status == 400) {console.log('Page Not Found!')}
                    element.removeAttribute(attibute);
                    includeHTML();    
                }
            }
            xhttp.onload = function(){
                element.innerHTML = this.responseText;
            }
            // open file
            xhttp.open('GET', file, true);
            xhttp.send();
        }
    }
}
/*------------------------------------------------------*/
/***
 * @name fetchJSON
 * @example fetchJSON('json/fleet.json', function(xhttp){
 *      sessionStorage.setItem('fleet', xhttp.responseText);
 *  });
 */
/*------------------------------------------------------*/
function fetchJSON(filepath, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                xhttp.onload = callback(this);
            }
            if (this.status == 400) {console.log('Page Not Found!')}
        }
    }
    xhttp.open('GET', filepath);
    xhttp.send();
}
/*------------------------------------------------------*/
/***
 * @name getElementState
 * @type {Function}
 * @param {HTMLElement} node
 * @param {String}      value
 * @example             <p>, "enabled" --> return true if attrib == value
 * @return {Boolean}
 */
/*------------------------------------------------------*/
function getElementState(node, value){
    // get current value
    let current = node.getAttribute('data-state');
    // logic
    if(current == value){return true;}
    else if(current != value){return false;}
}
/*------------------------------------------------------*/
/***
 * @name setElementState
 * @type {Function}
 * @param {HTMLElement} node
 * @param {String}      value
 * @example             <p>, "enabled"
 *                      if: "enabled" == value --> return false, cannot set
 *                      if: "enabled" != value --> return true, value set
 * @return {Boolean}
 */
/*------------------------------------------------------*/
function setElementState(node, value){
    // get current value to check
    let current = getElementState(node, value);
    // logic
    if(current == true){return false;}
    else if (current == false){
        node.setAttribute('data-state', value);
        return true;
    }
}