import { MenuItem } from "../menu-item/menuitem";
import { SelectedOption } from "../selectedoption/selectedoption";

export class CompositeItem {
    id: number;
    menuItem: MenuItem; 
    itemOptions: SelectedOption[]; 
    menu: String; 

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }

}





