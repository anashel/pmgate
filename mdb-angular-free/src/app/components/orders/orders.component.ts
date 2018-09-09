import { OnInit, Component, ChangeDetectionStrategy } from "@angular/core";
import { OrderDataService } from "../../model/order/order-data.service";
import { Order } from "../../model/order/order";
import { MenuItem } from "../../model/menu-item/menuitem";
import { MenuItemService } from "../../model/menu-item/menuitem-data.service";
import { OptionalItem } from "../../model/optionalitems/optionalitem";
import { CompositeItem } from "../../model/compositeitems/compositeitem";
import { User } from "../../model/user/user";
import { SelectedOption } from "../../model/selectedoption/selectedoption";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";



export class HelloMessage {

    name: string

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

@Component({
    selector: 'mdb-order',
    templateUrl: 'orders.component.html',
    styleUrls: ['orders.component.css'],
    providers: [OrderDataService],
    changeDetection: ChangeDetectionStrategy.Default
})
export class OrderComponent implements OnInit {

    orders: Order[] = [];
    menuitemlistinfrontend: MenuItem[] = [];
    selectedOrder: Order;
    alertMessage: boolean;
    panelOpenState: boolean = false;
    panelOpenState2: boolean = false;
    itemsInCart: CompositeItem[] = [];
   // private serverUrl2 = 'http://localhost:8080/gs-guide-websocket';
    private serverUrl = '/gs-guide-websocket';
    private stompClient;

    constructor(private orderDataService: OrderDataService, private menuItemService: MenuItemService
    ) {
        this.initializeWebSocketConnection();
        this.alertMessage = false;
        
    }

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
                    that.showAlert();
                    console.log("message received");

                }
            });
        });


    }

    sendMessage(message) {

        // var response = this.stompClient.send("/app/hello" , {}, message);
        this.stompClient.send("/app/hello", {}, message);


        // console.log(response);

    }


    onSelect(clickedOrder: Order) {
        this.selectedOrder = clickedOrder;
    }

    get allOrders() {
        this.orders = this.orderDataService.orders;
        return this.orders;
    }

    get allMenuItems() {
        //  console.log(this.menuitemlistinfrontend); 
        return this.menuitemlistinfrontend = this.menuItemService.menuItemsList;
    }
    addPopup() {
        this.selectedOrder = null;
        let message: HelloMessage = new HelloMessage();
        message.name = "This was sent via the app";
        

    }

    removeAlert() {
        this.alertMessage = false;
    }
    showAlert() {
        this.alertMessage = true;
        
    }

    addItemToCart(itemToAdd: MenuItem, selectedItemOptionMenu) {
        // -- get the selected items but they are in the wrong format, need to be encapsulated in a selectedItem
        var wrongSelection = selectedItemOptionMenu.selectedOptions.selected.map(item => item.value);
        var mySelectedOptionsArray: SelectedOption[] = [];
        for (let mySelectionOption of wrongSelection) {
            var goodSelection: SelectedOption = new SelectedOption();
            goodSelection.optionid = mySelectionOption;
            mySelectedOptionsArray.push(goodSelection);
        }
        // -- create composite items with new menuitem and selectedoption
        var compositeItem: CompositeItem = new CompositeItem();
        compositeItem.itemOptions = mySelectedOptionsArray;
        compositeItem.menuItem = itemToAdd;
        this.itemsInCart.push(compositeItem);
    }

    clickedItem(clickedItem: MenuItem) {
        console.log(clickedItem);

    }

    selectOption(possibleObtion) {
        var mySelectedOptions: OptionalItem[];
        console.log(mySelectedOptions);

        mySelectedOptions = possibleObtion.selectedOptions.selected.map(item => item.value);

    }

    saveOrder() {
        var order: Order = new Order();

        order.orderedItems = this.itemsInCart;
        order.status = "new";
        order.totalprice = 21;
        order.restaurant = 1;
        var user: User = new User;
        user.id = 1; user.username = "anas"; user.roleUser = "simple";
        order.owner = user;

        this.orderDataService.saveOrder(order);
        this.itemsInCart = [];
        this.menuItemService.callMessageItemServiceToReceiveMenuItems();
        this.sendMessage("new order");
    }

    removeItemFromOrder(itemOrder: CompositeItem) {
        const index: number = this.itemsInCart.indexOf(itemOrder);
        if (index !== -1) {
            this.itemsInCart.splice(index, 1);
        }
    }

    refreshItems() {
        this.menuItemService.callMessageItemServiceToReceiveMenuItems();
    }
    ngOnInit(): void {

    }


}