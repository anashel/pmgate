import { User } from "../user/user";
import { Criteria } from "../criterias/criteria";

export class Topic {
   
    members: User[];
    allowed: User[];
    startDate: Date; 
    endDate: Date; 
    priority: number; 
    criterias: Criteria[]; 
    status: string; 




    constructor(values: Object = {}) {
        Object.assign(this, values);
        this.status = "new"; 
        this.members= [];
    }
}
