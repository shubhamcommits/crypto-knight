const axios = require('axios')

const realTimeCoinPrices = async () => {

  return new Promise(async (resolve, reject) => {
    try {

      let coins = await axios.get(process.env.REALTIME_COIN_PRICES)

      resolve(coins.data || [])

    } catch (error) {

      console.error(error)
      reject([])

    }
  })
}

const getCurrentCoinPrice = async (coinId) => {
  return new Promise(async (resolve, reject) => {
    try {

      let coin = await axios.get(process.env.COIN_DETAILS + coinId)

      resolve(coin.data || [])

    } catch (error) {

      console.error(error)
      reject([])

    }
  })
}

module.exports = {
  realTimeCoinPrices,
  getCurrentCoinPrice
}