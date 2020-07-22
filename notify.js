class Notify{
    constructor(){

    }
    //Set Channel
    channel(_chanelInstance){
        return this.channel = _chanelInstance
    }

    //Send Message
    async send(_data){
        let result = this.channel.send(_data)
        return result
    }

    //CheckDelivery
    async checkDelivery(_data){
        let result = this.channel.checkDelivery(_data)
        return result
    }
}

module.exports = Notify