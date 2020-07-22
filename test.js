

const Notify = require('./notify')
const { SmsIrChannel } = require('./channels/index')


const myNotify = new Notify()

var channels = {
    'smsir' : new SmsIrChannel('LineNumber','ApiKey','UserSecret')
}

test()

async function test(){
    var sendResult = await myNotify.channel(channels['smsir']).send('09131598127','test sms')
    console.log(sendResult)
    // var result = await myNotify.channel(channels['smsir']).checkDelivery('33929690')
    // console.log(result)

}

module.exports = Notify
