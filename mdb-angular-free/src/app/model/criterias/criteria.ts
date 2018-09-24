import { User } from "../user/user";

export class Criteria {
    name:String; 
    owner: User;
    allowedUsers: User[];
    startdate: Date;
    enddate: Date; 
    comment: String; 
    status: String; 
    priority: String; 



    constructor(values: Object = {}) {this.status ='nok'; 
        this.priority = "low"; 
        Object.assign(this, values);
        
    }
}
