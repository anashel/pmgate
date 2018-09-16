import { User } from "../user/user";
import { Criteria } from "../criterias/criteria";

export class Topic {
   
    members: User[];
    allowed: User[];
    startdate: Date; 
    enddate: Date; 
    priority: number; 
    criterias: Criteria[]; 
    status: string; 
    phase: number; 




    constructor(values: Object = {}) {
        Object.assign(this, values);
        this.status = "new"; 
        this.members= [];
        this.criterias= [];
    }
}
