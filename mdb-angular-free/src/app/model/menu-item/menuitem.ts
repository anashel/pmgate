import { OptionalItem } from "../optionalitems/optionalitem";

export class MenuItem {
    id: number;
    name: string
    categoryId: number;
    price: number; 
    possibleOptions :OptionalItem[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}



