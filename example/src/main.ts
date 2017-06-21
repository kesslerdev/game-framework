import { inspect } from 'util'
import { Resources, Shops, createPlayer } from './types'
import { GameClient } from './gameclient'
import { connect } from 'camo'

const uri = 'mongodb://localhost:27017/quarkit'

const onConnected = (db) => {

  console.log('Connected to Mongo')

  const player = createPlayer(`kessler`)

  console.log('First Buy Shops=========================')

  const client = new GameClient(player)

  client.printPlayer()

  // buy lemon stand for player
  client.buyShop(Shops.LemonStand)
  client.buyShop(Shops.NewsPaperDelivery)
  client.buyShop(Shops.AnciantFabric)

  client.printPlayer()
  let i = 0
  setInterval(
    () => {
      //process.stdout.write('\u001b[0J\u001b[1J\u001b[2J\u001b[0;0H\u001b[0;0W')

      client.printPlayer()
      i += 1

      if (i > 10) {
        console.log(inspect(player,true,10,true))
        player.save().then((_) => {
          db.close().then(_ => console.log('Mongo closed'), process.exit(0))
          
        }).catch(function(error) {
            console.error(error)
            process.exit(0)
        })
      }

    },
    1000
  )
}


connect(uri).then(onConnected)
