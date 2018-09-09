export class OptionalItem {
    id: number;
    name: string; 
    price: number = 0; 
    category: string; 
    checked: boolean = false; 

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}


