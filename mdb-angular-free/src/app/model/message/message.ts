export class Message {
    id: number;
    senderId: number; 
    receiverId: number; 
    contentMessage = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}