const { Tips } = require('../models')

const TipsService = {

    async createTips(tipsData, filename) {
        return new Promise(async (resolve, reject) => {
            try {

                console.log('hello2', tipsData, filename)
                // User Data
                let data= {};
                if(tipsData.type === 'Sell'){
                     data = {
                        name: tipsData.name,
                        type: tipsData.type,
                        target: tipsData.target,
                        entry_1: tipsData.entry_1,
                        stop_loss: tipsData.stop_loss,
                        entry_2: tipsData.entry_2,
                        expected_return: ((tipsData.entry_1 - tipsData.target)/tipsData.entry_1)*100,
                    }
                }
                else{
                 data = {
                    name: tipsData.name,
                    type: tipsData.type,
                    target: tipsData.target,
                    entry_1: tipsData.entry_1,
                    stop_loss: tipsData.stop_loss,
                    entry_2: tipsData.entry_2,
                    expected_return: ((tipsData.target-tipsData.entry_1)/tipsData.entry_1)*100,
                }
            }
                
                // Create the new Tips
                let tips = await Tips.create(data)

                // If user is not created
                if (!tips) {
                    reject({ error: 'Tips was not created.' })
                }

                // Sign In the current user
                // let res = await this.signIn(userData.email, userData.password)

                // Resolve the promise
                resolve({
                    tips: res.tips
                })


            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },
    async getTips() {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the User
                const tips = await Tips.find()
                .populate('tips', 'name title target entry_1 entry_2 stop_loss expected_return')

                // Resolve the promise
                resolve(tips)
            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },
    async getFilteredTips(query) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the User
                const tips = await Tips.find(query)
                .populate('tips', 'name title target entry_1 entry_2 stop_loss expected_return')

                // Resolve the promise
                resolve(tips)
            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },
}


module.exports = TipsService