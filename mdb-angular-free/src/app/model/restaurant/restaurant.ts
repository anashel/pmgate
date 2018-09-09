export class Restaurant {
    id: number;
    menu: number; 
  

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}