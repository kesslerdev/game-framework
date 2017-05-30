import { Resource } from 'quarkit-modules'
import { inspect } from 'util'

import { connect, Document } from 'camo'
import { GameObjectMixin } from 'quarkit-core'
import { ExtendableMixin, classAsMixin } from 'quarkit-mixin'

// const uri = 'nedb:///Users/scott/data/animals'
// const uri = 'mongodb://login:pwd@localhost:27017/DB'
const uri = 'mongodb://localhost:27017/quarkit'

// Types
@GameObjectMixin
@ExtendableMixin
class MongoGameObject extends Document{
  [x: string]: any
  constructor() {
    super()
    this.Slug = String
    this.initializeExtendable()
  }
}


@Resource
class Company extends MongoGameObject{

}

const onConnected = (db) => {

  console.log('Connected to Mongo')

  const company = (<any> Company).create({ Slug: `test` })
  company.Premium = true
  console.log(inspect(company,true,5,true))
  company.name = `Skimia`
  company.valuation = 100000
  company.dateFounded = new Date(2016,1,1,0,0,0,0)


  company.save().then((_) => {
    db.close().then(_ => console.log('Mongo closed'))
  })

  
}

connect(uri).then(onConnected)

