const { User, Portfolio, Transaction } = require("../models");
const axios = require('axios')
const CoinService = require('./coin.service')

const PortfolioService = {
  async createPortfolio(portfolioData) {
    return new Promise(async (resolve, reject) => {
      try {
        // Create a new user
        let portfoliotrue = await Portfolio.findOne({
          _user: portfolioData.user,
          coinid: portfolioData.coinid,
        });
        let user = await User.findById({ _id: portfolioData.user });
        if (!portfoliotrue && portfolioData.type === "buy") {
          // Prepare the portfolio data
          let portfolio = {
            coinid: portfolioData.coinid,
            _user: portfolioData.user,
            price: portfolioData.price,
            quantity: portfolioData.quantity,
            totalinvestment: portfolioData.price * portfolioData.quantity,
            avprice: portfolioData.price,
            type: "invest",
          };

          // Create the new portfolio
          portfolio = await Portfolio.create(portfolio);

          // Push the portfolio object to the current user
          user.portfolio.push(portfolio);
          // Save the user object
          user = await User.findByIdAndUpdate(
            { _id: portfolioData.user },
            { $push: { portfolio: portfolio } },
            { new: true }
          ).populate(
            "portfolio",
            "_id coinid price quantity totalinvestment avprice"
          );

          // Resolve the user
          resolve(user);
        } else if (portfoliotrue) {
          let newquantity = 0;
          let newinvestment = 0;
          let newavprice = 0;
          if (portfolioData.type === "buy") {
            console.log('buying now')
            newquantity = portfoliotrue.quantity + portfolioData.quantity;
            newinvestment = portfoliotrue.totalinvestment + portfolioData.price * portfolioData.quantity;
            newavprice = newinvestment / newquantity;
          }
          if (portfolioData.type === "sell") {

            // currentcoinprice = await CoinService.getCurrentCoinPrice(portfolioData.coinid).then((values) => {
            //   // console.log(values)
            //   return values
            // }).catch(e => console.error(e));

            newquantity = portfoliotrue.quantity - portfolioData.quantity;
            newinvestment = portfoliotrue.avprice*newquantity;
            // portfoliotrue.totalinvestment - portfolioData.price * portfolioData.quantity;
            new_realized_profit = portfoliotrue.realized_profit + (portfolioData.price - portfoliotrue.avprice)*portfolioData.quantity;
            console.log('profit', new_realized_profit)
            if(newquantity == 0){
              newavprice= 0
            }else{
            newavprice = newinvestment / newquantity;
            }
          }

          portfolio = await Portfolio.findOneAndUpdate(
            { _id: portfoliotrue._id },
            {
              quantity: newquantity,
              totalinvestment: newinvestment,
              // avprice: newavprice,
              realized_profit: new_realized_profit,
            }
          );

          user.portfolio.push(portfolio);

          // Save the user object
          user = await User.findByIdAndUpdate(
            { _id: portfolioData.user },
            { $push: { portfolio: portfolio } },
            { new: true }
          ).populate(
            "portfolio",
            "_id coinid price quantity totalinvestment avprice"
          );

          // Resolve the user
          resolve(user);

          // reject({error: "exists"})
        }
      } catch (error) {
        // Catch the error and reject the promise
        reject({ error: error });
      }
    });
  },

  async getPortfolio(userId) {
      return new Promise(async (resolve, reject) => {
          try {
              // Find the User
              const portfolio = await Portfolio.find({
                  _user: userId
              })
              .populate('portfolio', 'coinid price quantity totalinvestment');


              // Resolve the promise
              resolve(portfolio)
          } catch (error) {
            
              // Catch the error and reject the promise
              reject({ error: error })
          }
      })
  },
  async getPortfolioDetail(coinid) {
    return new Promise(async (resolve, reject) => {
        try {
          console.log('inside detail')
          portfoliocoindata = await CoinService.getCurrentCoinDetail(coinid).then((values) => {
                  // console.log(values)
                  return values
                }).catch(e => console.error(e));
            // Resolve the promise
            let coinimpdata = {
              currentprice : portfoliocoindata.market_data.current_price.inr,
              image: portfoliocoindata.image.thumb,
              name: portfoliocoindata.name,
              symbol: portfoliocoindata.symbol
            };
            // console.log('coinimpdata',coinimpdata);
            resolve(coinimpdata)
        } catch (error) {
          
            // Catch the error and reject the promise
            reject({ error: error })
        }
    })
},

  async getPortfolioValue(userId) {
    return new Promise(async (resolve, reject) => {
        try {
          
          //Declare Variables
          let investedvalue = 0;
          let currentvalue = 0;
          let coinvalue = 0;
          let totalgain = 0;
          let totalgainpercent = 0;
          let realized_profit = 0;
          
          // Find the User
          const portfolio = await Portfolio.find({
              _user: userId
          })
          .populate('portfolio', 'coinid price quantity totalinvestment');

          for (let index = 0; index < portfolio.length; index++) {
            if(portfolio[index].quantity != 0){
              investedvalue = investedvalue + portfolio[index].totalinvestment;
              realized_profit = realized_profit + portfolio[index].realized_profit;
              coinvalue = await CoinService.getCurrentCoinPrice(portfolio[index].coinid).then((values) => {
                            return values
                          }).catch(e => console.error(e));
              currentvalue = coinvalue * portfolio[index].quantity + currentvalue;
              }
              if(portfolio[index].quantity == 0){
                realized_profit = realized_profit + portfolio[index].realized_profit;
                coinvalue = await CoinService.getCurrentCoinPrice(portfolio[index].coinid).then((values) => {
                              return values
                            }).catch(e => console.error(e));
                }
            };

            //Calculate gain %
            totalgainpercent = ((currentvalue - investedvalue)/investedvalue) *100
            //Calculate gain absolute
            totalgain = (currentvalue - investedvalue)

            //Declare portfoliovalue variable
            let portfoliovalue = {
              totalgain: totalgain,
              totalgainpercent: totalgainpercent,
              investedvalue: investedvalue,
              currentvalue: currentvalue,
              realized_profit: realized_profit
            };

            // Resolve the promise
            resolve(portfoliovalue)
        } catch (error) {
          
            // Catch the error and reject the promise
            reject({ error: error })
        }
    })
},
};

module.exports = PortfolioService;