const aws = require('aws-sdk')
const keys = require('../keys')

// Update the AWS configs
aws.config.update({
    region: keys.REGION,
    accessKeyId: keys.ACCESS_KEY,
    secretAccessKey: keys.SECRET_ACCESS_KEY
})

// Create SNS Class
const sns = new aws.SNS()

// Set attribute
sns.setSMSAttributes({
    attributes: { DefaultSMSType: "Transactional" }
},
    function (error) {
        if (error) {
            console.log(error)
        }
    })

/**
 * This function is responsible for sending the sms
 * @param {*} phoneNumber 
 * @param {*} body 
 */
function sendSms(phoneNumber, subject, body) {
    console.log(`Sending SMS. Phone: ${phoneNumber}, body: ${body}`)
    const params = {
        Message: body,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': subject
            }
        },
        PhoneNumber: phoneNumber
    }

    sns.publish(params, function (err, data) {
        if (err) {
            console.log(err, err.stack)
        }
        else {
            console.log(data)
        }
    })
}

module.exports = {
    sendSms: sendSms,
}