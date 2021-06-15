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
            newquantity = portfoliotrue.quantity + portfolioData.quantity;
            newinvestment =
              portfoliotrue.totalinvestment +
              portfolioData.price * portfolioData.quantity;
            newavprice = newinvestment / newquantity;
          }
          if (portfolioData.type === "sell") {
            newquantity = portfoliotrue.quantity - portfolioData.quantity;
            newinvestment =
              portfoliotrue.totalinvestment -
              portfolioData.price * portfolioData.quantity;
            newavprice = newinvestment / newquantity;
          }
          //  let portfolio = {
          //     coinid: portfolioData.coinid,
          //     _user: portfolioData.user,
          //     price: portfolioData.price,
          //     quantity: newquantity,
          //     totalinvestment: newinvestment
          // }

          portfolio = await Portfolio.findOneAndUpdate(
            { _id: portfoliotrue._id },
            {
              quantity: newquantity,
              totalinvestment: newinvestment,
              avprice: newavprice,
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
            let investedvalue = 0;
            let currentvalue = 0;
            let coinvalue = 0;
            // let totalgain = ((currentvalue - investedvalue)/investedvalue) *100;
            let URL= 'https://api.coingecko.com/api/v3/coins/';
              // Find the User
              const portfolio = await Portfolio.find({
                  _user: userId
              })
              .populate('portfolio', 'coinid price quantity totalinvestment');

              for (let index = 0; index < portfolio.length; index++) {
                  console.log('index',portfolio[index].coinid,'+', portfolio.length, index)
                  investedvalue = investedvalue + portfolio[index].totalinvestment;
                  coinvalue = await CoinService.getCurrentCoinPrice(portfolio[index].coinid).then((values) => {
                                // console.log("values", values)
                                return values
                        }).catch(e => console.error(e));
                        // console.log('coinvalue',portfolio[index].quantity)
                  currentvalue = coinvalue * portfolio[index].quantity + currentvalue;
                  // console.log('cv', currentvalue)
                  // coindata = await axios.get(process.env.URL+element.coinid)
                  // console.log(URL/element.coinid)
                };

              console.log('invested value',investedvalue,'currentvalue',currentvalue)
              let totalgain = ((currentvalue - investedvalue)/investedvalue) *100
              let portfoliovalue = {
                totalgain: totalgain,
                investedvalue: investedvalue,
                currentvalue: currentvalue
              };
              // Resolve the promise
              
              resolve(portfoliovalue)
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
          
          // Find the User
          const portfolio = await Portfolio.find({
              _user: userId
          })
          .populate('portfolio', 'coinid price quantity totalinvestment');

          for (let index = 0; index < portfolio.length; index++) {

              investedvalue = investedvalue + portfolio[index].totalinvestment;
              coinvalue = await CoinService.getCurrentCoinPrice(portfolio[index].coinid).then((values) => {
                            return values
                          }).catch(e => console.error(e));
              currentvalue = coinvalue * portfolio[index].quantity + currentvalue;
              
            };

            //Calculate gain %
            let totalgain = ((currentvalue - investedvalue)/investedvalue) *100

            //Declare portfoliovalue variable
            let portfoliovalue = {
              totalgain: totalgain,
              investedvalue: investedvalue,
              currentvalue: currentvalue
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