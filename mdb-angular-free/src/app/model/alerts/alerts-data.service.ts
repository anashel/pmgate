import { Injectable } from "@angular/core";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";



@Injectable()
export class AlertService {

    private serverUrl = 'http://localhost:8080/gs-guide-websocket';
    private stompClient;



    initializeWebSocketConnection() {
        let ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        let that = this;
        this.stompClient.connect({}, function () {
            that.stompClient.subscribe("/topic/greetings", (message) => {
                console.log(message);
                if (message.body) {
                    // console.log(frame);
                    //  console.log("Message received");
                   
                    console.log("message received");

                }
            });
        });


    }



}