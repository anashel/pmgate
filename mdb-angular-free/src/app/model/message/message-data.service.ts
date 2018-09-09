import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Message } from "./message";

@Injectable()
export class MessageDataService {
    urlSave = "http://fastorder2-fastorder.1d35.starter-us-east-1.openshiftapps.com/sendMessage";
    urlGetMyMessages = "http://fastorder2-fastorder.1d35.starter-us-east-1.openshiftapps.com/findBySender?sender=1";
    urlGetDestination = "http://fastorder2-fastorder.1d35.starter-us-east-1.openshiftapps.com/findByDestination?destination=";
    
    messages: Message[] = [];
    myMessages: Message[] = [];
    
    
    constructor(private http: HttpClient) {
        // this.populateMessages();
        this.callMessageServiceToReceiveAll();
        this.callMessageServiceToReceiveMine();

    }

    saveMessage(message: Message) {
        this.http.post(this.urlSave, message, {responseType: 'text'}).subscribe(data => {
          console.log(data); 
        
          this.refreshMyMessages();
        },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log("Client-side error occured.");
                } else {
                    console.log("Server-side error occured.");
                    console.log(err.message); 
                }
            })
    }


    getMessages(): Message[] {
        // this.callRestService();
       
        return this.messages;

    }

    getMyMessages(): Message[]{
       // this.myMessages =[];
       // this.callMessageServiceToReceiveMine();
        return this.myMessages;
    }

    refreshMyMessages(): void
    {
        this.callMessageServiceToReceiveMine();
    }


    callMessageServiceToReceiveAll() {

        this.http.get<Message[]>("http://resttest-fastorder.1d35.starter-us-east-1.openshiftapps.com/messages").subscribe(data => {
            this.messages = data;
            console.log(data);
        },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log("Client-side error occured.");
                } else {
                    console.log("Server-side error occured.");
                }
            })

    };

    callMessageServiceToReceiveMine() {

        this.http.get<Message[]>(this.urlGetMyMessages).subscribe(data => {
            this.myMessages = data;
        //    console.log(data);
        },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log("Client-side error occured.");
                } else {
                    console.log("Server-side error occured.");
                }
            })

    };





}
