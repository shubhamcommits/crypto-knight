const { User, Portfolio } = require('../models')

const PortfolioService = {

    async createPortfolio(portfolioData) {

        return new Promise(async (resolve, reject) => {
            try {

                // Check if Portfolio with this user exists and already contains specified coinid
                let portfolio = await Portfolio.findOne({ _user: portfolioData.user, coinid: portfolioData.coinid })
                

                // if above condition is not meant....either portfolio is not there or this coin is not there 
                if(!portfolio){
                //create portfolio data
                let portfolio = {
                    coinid: portfolioData.coinid,
                    _user: portfolioData.user,
                    price: portfolioData.price,
                    quantity: portfolioData.quantity,
                    totalinvestment: (portfolioData.price*portfolioData.quantity)
                }
                //push portfolio data
                portfolio = await Portfolio.create(portfolio)
                portfolio.push(portfolio)
                }


                //if coinid already exists
                else{
                    //update quantity(totalquantity= new+old quantity)
                    portfolioData.quantity = portfolioData.quantity + portfolio.quantity

                    //Update the portfolio
                    const portfolio = await Portfolio.findByIdAndUpdate({
                        _id: portfolioData._id
                    }, {
                        $set: portfolioData
                    }, {
                        new: true
                    })
                }
                //End of Else

                // Push the portfolio object to the current user
                user.portfolio.push(portfolio)

                // Save the user object
                user = await User.findByIdAndUpdate(
                    { _id: portfolioData.user },
                    { $push: { portfolio: portfolio } },
                    { new: true }
                )
                .populate('portfolio', '_id coinid price quantity totalinvestment')

                // Resolve the user
                resolve(user)

            } catch (error) {
                // Catch the error and reject the promise
                reject({ error: error })
            }
        })

    }
}


module.exports = PortfolioService