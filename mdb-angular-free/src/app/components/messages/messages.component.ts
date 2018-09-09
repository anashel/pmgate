import { OnInit, Component, ChangeDetectionStrategy } from "@angular/core";
import { MessageDataService } from "../../model/message/message-data.service";
import { Message } from "../../model/message/message";


@Component({
    selector: 'mdb-msg',
    templateUrl: 'messages.component.html',
    styleUrls: ['messages.component.css'],
    providers: [MessageDataService],
    changeDetection: ChangeDetectionStrategy.Default


})

export class MessageComponent implements OnInit {


    messagesList: Message[] = [];

    messages: Message[];

    test: String;
    selectedMessage: Message = null;
    newMessage: Message;

    constructor(private messageDataService: MessageDataService) {
        this.messages = this.messageDataService.getMyMessages();
        this.newMessage = new Message();
    }



    onSelect(messageClicked: Message) {
        this.selectedMessage = messageClicked;
    }


    get houseMessages() {
        this.messages = this.messageDataService.getMyMessages();
        return this.messages;
    }


    saveMessage() {
       // console.log(this.newMessage);
        this.messageDataService.saveMessage(this.newMessage);

        //  this.messages = this.messageDataService.getMyMessages();
        //this.messages.push(this.newMessage);
        
        this.newMessage = new Message();

        //this.messages = this.messageDataService.getMyMessages();

       // this.messageDataService.refreshMyMessages();
    }

    addPopup() {
        this.selectedMessage = null;
    }

    refresh(){
        this.messageDataService.refreshMyMessages();
    }

    ngOnInit(): void {
        // this.messages = this.messageDataService.getMyMessages();
        this.test = "Hellooo";
    }

    ngOnChanges():void{
        console.log("Something changed");
    }
}