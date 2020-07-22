class Notify{
    constructor(){
        this.usableChannel = null
    }
    //Set Channel
    channel(_chanelInstance){
        return this.usableChannel = _chanelInstance
    }

    //Send Message
    async send(){
        let result = this.usableChannel.send()
        return result
    }

    //CheckDelivery
    async checkDelivery(_data){
        let result = this.usableChannel.checkDelivery(_data)
        return result
    }
}

module.exports = Notify