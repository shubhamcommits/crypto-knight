const { News } = require('../models')

const NewsService = {

    async createNews(newsData) {
        return new Promise(async (resolve, reject) => {
            try {

                // User Data
                let data = {
                    title: newsData.title,
                    desc: newsData.desc,
                    category: newsData.category,
                    coinid: newsData.coinid,
                }

                // Create the new News
                let news = await News.create(data)

                // If user is not created
                if (!news) {
                    reject({ error: 'News was not created.' })
                }

                // Sign In the current user
                // let res = await this.signIn(userData.email, userData.password)

                // Resolve the promise
                resolve({
                    news: res.news
                })


            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },
    async getNews() {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the User
                const news = await News.find()
                .populate('news', 'title desc category coinid')

                // Resolve the promise
                resolve(news)
            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },
}


module.exports = NewsService