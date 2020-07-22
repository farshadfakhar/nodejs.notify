const _SmsIRService = require('./../services/smsIrService')

class SmsIrChannel{
    constructor(_lineNumber,_userApiKey,_secretKey){
        this.lineNumber = _lineNumber
        this.userApiKey = _userApiKey
        this.secretKey = _secretKey
        this.SMSService = new _SmsIRService(_lineNumber,_userApiKey,_secretKey)
    }

    async send(_number,_message){
        var result = await this.SMSService.sendMessage([_number],[_message])
        return result
    }

    async checkDelivery(_messageID){
        await this.SMSService.getToken()
        var result = await this.SMSService.checkMessageStatus(_messageID)
        return result
    }
}

module.exports = SmsIrChannel