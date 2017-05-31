var jexl = require('jexl');
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

//en gros ProductionBaseTime * 2
jexl.eval('this.ProductionBaseTime * (3 - 1)', context, function(err, res) {
    console.log("this.ProductionBaseTime * (3 - 1) = " + res);
});

jexl.eval('this.applyProduction(Player)', context, function(err, res) {
    console.error(err); // Output: 72
});