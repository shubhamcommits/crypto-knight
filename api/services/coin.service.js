const axios = require('axios')

const CoinService = {
    async realTimeCoinPrices(){
        try {
            let coins = await axios.get(process.env.REALTIME_COIN_PRICES)

            return coins.data || []

          } catch (error) {
            console.error(error)

            return []
          }
    }
}

module.exports = CoinService