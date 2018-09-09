import { OptionalItem } from "../optionalitems/optionalitem";


export class SelectedOption {
    id: number;
    optionid: OptionalItem[];
    
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}

