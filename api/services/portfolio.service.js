const { User, Portfolio } = require('../models')

const PortfolioService = {

    async createPortfolio(portfolioData) {

        return new Promise(async (resolve, reject) => {
            try {

                // Create a new user
                let portfoliotrue = await Portfolio.findOne( {_user: portfolioData.user, coinid: portfolioData.coinid})
                let user = await User.findById({_id:portfolioData.user})
                if(!portfoliotrue){
                // Prepare the portfolio data
                let portfolio = {
                    coinid: portfolioData.coinid,
                    _user: portfolioData.user,
                    price: portfolioData.price,
                    quantity: portfolioData.quantity,
                    totalinvestment: (portfolioData.price*portfolioData.quantity)
                }
                
                // Create the new portfolio
                portfolio = await Portfolio.create(portfolio)

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
                }
                else{
                    let newquantity = portfoliotrue.quantity + portfolioData.quantity
                    let newinvestment = portfoliotrue.totalinvestment + (portfolioData.price*portfolioData.quantity)

                    //  let portfolio = {
                    //     coinid: portfolioData.coinid,
                    //     _user: portfolioData.user,
                    //     price: portfolioData.price,
                    //     quantity: newquantity,
                    //     totalinvestment: newinvestment
                    // }

                   portfolio = await Portfolio.findOneAndUpdate(
                        {_id: portfoliotrue._id},
                        {quantity: newquantity,
                        totalinvestment: newinvestment}
                    )

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

                    // reject({error: "exists"})
                }
            } catch (error) {
                // Catch the error and reject the promise
                reject({ error: error })
            }
        })

    },

    async getPortfolio(userId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the User
                const portfolio = await Portfolio.find({
                    _user: userId
                })
                .populate('portfolio', 'coinid price quantity totalinvestment')

                // Resolve the promise
                resolve(portfolio)
            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },
}


module.exports = PortfolioService