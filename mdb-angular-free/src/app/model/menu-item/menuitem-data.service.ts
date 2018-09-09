import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { MenuItem } from "./menuitem";


@Injectable()
export class MenuItemService {
    //urlToGetItems = "http://resttest-fastorder.1d35.starter-us-east-1.openshiftapps.com/menuitems";
    urlToGetItems = "http://fastorder2-fastorder.1d35.starter-us-east-1.openshiftapps.com/menuitems";
    urlToGetItems2 = "http://localhost:8080/menuitems";
    menuItemsList: MenuItem[] = [];


    constructor(private http: HttpClient) {
        this.callMessageItemServiceToReceiveMenuItems();
    }


    callMessageItemServiceToReceiveMenuItems() {

        this.http.get<MenuItem[]>(this.urlToGetItems).subscribe(data => {
            this.menuItemsList = data;
           // console.log("We called the menuItem service");
            //console.log(this.menuItemsList);
           //  console.log(data);
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
