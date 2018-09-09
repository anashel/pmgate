import { MenuItem } from "../menu-item/menuitem";

export class Menu {
    id: number;
    menuitems: MenuItem[];
    

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}

