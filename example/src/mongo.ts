import { inspect } from 'util'

import { connect, Document } from 'camo'
import { classAsMixin } from 'quarkit-mixin'

// const uri = 'nedb:///Users/scott/data/animals'
// const uri = 'mongodb://login:pwd@localhost:27017/DB'
const uri = 'mongodb://localhost:27017/quarkit'

// Types

const DocumentMixin = classAsMixin(Document)
var findPropertyOwner = function(obj, prop) {
  var i = 0;
  do {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return [obj, i];
    }
  } while (i++, obj = Object.getPrototypeOf(obj));
  console.log('oyllla')
}

console.log(findPropertyOwner(Document,'create'))
class Company extends Document{
  [x: string]: any
  /*constructor() {
        super();

        this.name = String;
        this.valuation = {
            type: Number,
            default: 10000000000,
            min: 0
        };
        this.employees = [String];
        this.dateFounded = {
            type: Date,
            default: Date.now
        };
    }*/

    static collectionName() {
        return 'comp'
    }
}

@DocumentMixin
class CompanyTwo{
  static collectionName() {
    return 'company_collection'
  }

}

const onConnected = (db) => {

  console.log('Connected to Mongo')

  const company = (<any> CompanyTwo).create()
  company.name = `Skimia`
  company.valuation = 100000
  company.dateFounded = new Date(2016,1,1,0,0,0,0)


  company.save().then((_) => {
    db.close().then(_ => console.log('Mongo closed'))
  })

  
}

connect(uri).then(onConnected)

