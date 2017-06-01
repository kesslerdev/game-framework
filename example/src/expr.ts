var math = require('quarkit-mathjs');

import { Player, Resources, Shops } from './types';
import { inspect } from 'util';


let StatedLemonStand = Shops.LemonStand.withState(Player);

//need to create a context creator (find all properties recursivelly from an object)
//keep in mind there is on a building
var context = {
    this: StatedLemonStand,
    Player: Player,
    DB: {
        Resources: Resources,
        Shops: Shops
    }
};


console.log('\nevaluate expressions')

//error
try{
    p(math.eval('this.ProductionBaseTime * (3 - 1)', context),'math expr')
} catch(e) {
    console.error(e.message);
}

i(Player, 'Kessler')
p(math.eval('this.applyProduction(Player)', context),'apply prod (first init the state)')


setTimeout(()=>{   
    p(math.eval('this.applyProduction(Player)', context),'call expr')
    i(Player, 'Kessler')
},5000);



/**
 * Helper function to output a value in the console. Value will be formatted.
 * @param {*} value
 */
function p (value, msg = '') {
  if(msg != ''){
    console.log(msg);
    console.log('=========================');
  }
  var precision = 14;
  console.log(math.format(value, precision));
}
/**
 * Helper function to output a value in the console. Value will be formatted.
 * @param {*} value
 */
function i (value, msg = '') {
  if(msg != ''){
    console.log(msg);
    console.log('=========================');
  }
  console.log(inspect(value));
}