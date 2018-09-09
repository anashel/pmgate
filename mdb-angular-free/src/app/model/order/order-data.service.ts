import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Order } from "./order";


@Injectable()
export class OrderDataService {
    urlToGetOrders = "http://fastorder2-fastorder.1d35.starter-us-east-1.openshiftapps.com/orders";
    urlToSaveOrderLocal = "http://localhost:8080/sendorder";
    urlToSaveOrder = "http://fastorder2-fastorder.1d35.starter-us-east-1.openshiftapps.com/sendorder";
    orders: Order[] = [];

    constructor(private http: HttpClient) {
        // this.populateMessages();
        this.callMessageServiceToReceiveOrders();

    }


    callMessageServiceToReceiveOrders() {

        this.http.get<Order[]>(this.urlToGetOrders).subscribe(data => {
            this.orders = data;
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


    saveOrder(order: Order) {
        this.http.post(this.urlToSaveOrder, order, {responseType: 'text'}).subscribe(data => {
          console.log(data); 
        
          this.callMessageServiceToReceiveOrders();
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

} 