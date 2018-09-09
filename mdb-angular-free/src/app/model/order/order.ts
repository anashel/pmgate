import { CompositeItem } from "../compositeitems/compositeitem";
import { User } from "../user/user";

export class Order {
    id: number;
    totalprice :number;
    orderedItems:CompositeItem[];
    status :string; 
    owner: User;
    restaurant: number;
    
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}

