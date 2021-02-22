export class Message {
    messageId: Number;
    sender: string;
    receiver: string;
    message: string;
    sent: string;
    seen: string;

    constructor(){
        this.messageId = 0;
        this.sender = '';
        this.receiver = '';
        this.message = '';
        this.sent = '';
        this.seen = '';
    }
}
