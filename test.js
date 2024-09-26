/**
 * @name grocery_list
 * @description This is a sample file to test out jsdoc compiler
 * @namespace test.js
 * @type {Object}
 * @property {String} fruit
 * @property {String} veggie
 * @method countFruit
 */
let grocery_list = {
    fruit: 'apple',
    veggie: 'carrot',
    countFruit: function(number){return `Get ${this.fruit}s`;}
};
