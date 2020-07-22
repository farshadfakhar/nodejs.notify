const axios = require('axios');

// DeliveryStateID: 0 , 
// 3 => رسیده به مخابرات
// 5 => رسیده به گوشی
// 9 => blacklist
class SmsIRService {
    constructor(_lineNumber,_userApiKey,_secretKey) {
        this.lineNumber = _lineNumber
        this.userApiKey = _userApiKey
        this.secretKey = _secretKey
        this.baseURL = 'http://RestfulSms.com/api/'
    }

    refreshToken() {
        this.getToken().then(res => {
            this.token = res
        });
        return this;
    }

    // POST Access token
    async getToken() {
        const result = await axios.post(`${this.baseURL}Token`, {
            UserApiKey: this.userApiKey,
            SecretKey: this.secretKey
        }).then(e => {
            if (e.data.IsSuccessful) {
                axios.defaults.headers.common['x-sms-ir-secure-token'] = `${e.data.TokenKey}`;
                return e.data.TokenKey;
            }
        }).catch(e => {
            throw new Error(e)
        })
        return result;
    }

    //GET Phone Numbers
    async getPhoneNumbers() {
        const result = await axios.get(`${this.baseURL}SMSLine`).then(e => {
            if (e.data.IsSuccessful)
                return e.data.SMSLines;
            return null;
        }).catch(e => {
            throw new Error(e)
        })
        return result;
    }

    //POST Send Message
    async sendMessage(_mobileNumbers, _messages) {
        await this.getToken()
        const result = await axios.post(`${this.baseURL}MessageSend`, {
            "Messages": _messages,
            "MobileNumbers": _mobileNumbers,
            "LineNumber": this.lineNumber,
            // "SendDateTime": _sendDateTime
        }).then(e => {
            if (e.data.IsSuccessful)
                return e.data;
            return null;
        }).catch(e => {
            console.log('Error in sendMessage - SMSIR: ', e)
            // throw new Error(e)
        })
        return result;
    }

    //GET Check message status via id
    async checkMessageStatus(_ids) {
        const result = await axios.get(`${this.baseURL}MessageSend?id=${_ids}`).then(e => {
            if (e.data.IsSuccessful)
                return e.data;
            return null;
        }).catch(e => {
            console.log('Error in checkMessageStatus - SMSIR: ', e)
            // throw new Error(e)
        })
        return result;
    }

    //GET Check message status via bashKey
    async checkMessageStatusbyBashKey(_bashKey) {
        const result = await axios.get(`${this.baseURL}MessageSend?batchKey=${_bashKey}&pageId=50`).then(e => {
            if (e.data.IsSuccessful)
                return e.data;
            return null;
        }).catch(e => {
            console.log('Error in checkMessageStatusbyBashKey - SMSIR: ', e)
            // throw new Error(e)
        })
        return result;
    }
}

module.exports = SmsIRService;