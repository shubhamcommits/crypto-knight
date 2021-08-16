const jwt = require('jsonwebtoken')
const { Auth, User } = require('../models')
const { Password } = require('../../utils')
const sgMail = require('@sendgrid/mail')
const { getMaxListeners } = require('../models/auth.model')

const AuthService = {
    async createAuthLog(token, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Authentication logs schema
                const authLog = {
                    token: token,
                    _user: userId
                }

                // Create the auth logs
                const auth = await Auth.create(authLog)

                // Resolve the promise
                resolve(auth)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    async signIn(email, password) {
        return new Promise(async (resolve, reject) => {
            try {

                // Check if user exists in the DB 
                const user = await User.findOne({ email })

                // If user wasn't found or user was previously removed/disabled, return error
                if (!user || user.active === false) {
                    reject({ error: 'Either user doesn\'t exist or was removed from the system.' })
                }

                // Decrypt the Password
                const decryptedPassword = await Password.decryptPassword(password, user.password)

                // If the password is wrong
                if (!decryptedPassword.password) {
                    reject({ error: 'Please enter a valid email or password!' })
                }

                // Create the signed token
                const token = jwt.sign(user.toJSON(), process.env.JWT_KEY)

                // Log the auths
                this.createAuthLog(token, user._id)

                // Resolve the promise
                resolve({
                    user: user,
                    token: token
                })

            } catch (error) {

                // Catch the error and reject the promise
                reject(error)
            }
        })
    },

    async signUp(userData) {
        return new Promise(async (resolve, reject) => {
            try {

                // Check if user exists in the DB 
                const checkUser = await User.findOne({ email: userData.email })

                if(checkUser){
                    reject({ error: 'User with this email already exist.' })
                }

                // Encrypting user password
                const encryptedPass = await Password.encryptPassword(userData.password)

                // If the password is wrong
                if (!encryptedPass.password) {
                    reject({ error: 'Please choose a different password.' })
                }

                // User Data
                let data = {
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    full_name: userData.first_name + " " + userData.last_name,
                    email: userData.email,
                    password: encryptedPass.password,
                    mobile_number: userData.mobile_number
                }

                // Create the new User
                let user = await User.create(data)

                // If user is not created
                if (!user) {
                    reject({ error: 'User was not created.' })
                }

                // Sign In the current user
                let res = await this.signIn(userData.email, userData.password)

                // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

                // const msg = {
                //     to: email, // Change to your recipient
                //     from: 'info@coingale.org', // Change to your verified sender
                //     subject: 'Welcome to Coingale ',
                //     text: 'Welcome to Coingale',
                //     html:   `<div>
                //             <h2 style="text-transform: capitalize;">Hi ${user.first_name}!,</h2>
                //             <p>Welcome to Coingale.</p>
                //             <p>It is a pleasure having you on board</p> 
                //             </div>`,
                //   }
                // // console.log('msg', msg)
                                        
                // sgMail
                // .send(msg)
                // .then((response) =>console.log('Email sent'))
                // .catch((error) => console.error(error));
                // Resolve the promise
                resolve({
                    user: res.user,
                    token: res.token
                })


            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    async forgotPassword(email) {
        // console.log(email);
        let user = await User.findOne({ email });
          
        if (!user) {
        return "No user with that email"
        }

        const token = await this.createToken(user)
    
    
        const url = `http://coingale.org.in/#/authentication/reset-password?token=${token}`

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
        // console.log(url);
        // console.log('inside email', email, user.first_name)
        const msg = {
            to: email, // Change to your recipient
            from: 'info@coingale.org', // Change to your verified sender
            subject: 'Forgot your Coingale Password?',
            text: 'Please use the link below to reset your password',
            html:   `<div>
                    <h2 style="text-transform: capitalize;">Hi ${user.first_name}!,</h2>
                    <p>You have submitted a password change request.</p>
                    <p>If it wasn't you please disregard this email and make sure you can still login to your account. If it was you, then confirm the password change <a href="${url}">Click here</a></p> 
                    </div>`,
          }
        // console.log('msg', msg)
                                
        sgMail
        .send(msg)
        .then((response) =>console.log('Email sent'))
        .catch((error) => console.error(error));
    
             return 'Emails sent successfully!';
        
    },

    async sendEmail(email,message) {
        // console.log(email);
        let user = await User.findOne({ email });
          
        if (!user) {
        return "No user with that email"
        }

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
        // console.log(url);
        // console.log('inside email', email, user.first_name)
        const msg = {
            to: email, // Change to your recipient
            from: 'info@coingale.org', // Change to your verified sender
            subject: 'Your Trigger has been Met',
            text: 'Your Trigger Condition has been met',
            html:   `<div>
                    <h2 style="text-transform: capitalize;">Hi ${user.first_name}!,</h2>
                    <p>Your Trigger Condition of ${message} has been met,</p>`,
          }
        // console.log('msg', msg)
                                
        sgMail
        .send(msg)
        .then((response) =>console.log('Email sent'))
        .catch((error) => console.error(error));
    
             return 'Emails sent successfully!';
        
    },

    async sendEmail(email,message) {
        console.log('emailller',email);
        let user = await User.findOne({ email });
          
        if (!user) {
        return "No user with that email"
        }

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
        // console.log(url);
        // console.log('inside email', email, user.first_name)
        const msg = {
            to: email, // Change to your recipient
            from: 'info@coingale.org', // Change to your verified sender
            subject: 'Your Trigger has been Met',
            text: 'Your Trigger Condition has been met',
            html:   `<div>
                    <h2 style="text-transform: capitalize;">Hi ${user.first_name}!,</h2>
                    <p>Your Trigger Condition of ${message} has been met,</p>`,
          }
        console.log('msg', msg)
                                
        sgMail
        .send(msg)
        .then((response) =>console.log('Email sent'))
        .catch((error) => console.error(error));
    
             return 'Emails sent successfully!';
        
    },
    
    async createToken({ password: passwordHash, _id: userId, created_date }){

        // console.log('how does it work', passwordHash,'-',created_date)
        const secret = `${passwordHash}-${created_date}`;
        const token = jwt.sign({ userId }, secret, {
          expiresIn: 3600,
        });
    
        await User.findByIdAndUpdate({ _id: userId }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec()
        // console.log(token);
        
        
        return token;
    },

    async resetPassword(newPassword, token) {
        try {
          let user = await User.findOne({
            reset_password_token: token,
            reset_password_expires: {
              $gt: Date.now()
            }
          }).exec();
          
          if (user) {
              
    
              await User.findOneAndUpdate(
                    { _id: user._id },
                    { $set: {password: newPassword, reset_password_token: undefined, reset_password_expires: ''} },
                    { new: true }
                )
                return 'Password reset'
             
            } else {
              return "Password reset token is invalid or has expired"
            }
          
          
        } catch (error) {
          throw new Error(error);
        }
    }
}

module.exports = AuthService