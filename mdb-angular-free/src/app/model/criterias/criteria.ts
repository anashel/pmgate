import { User } from "../user/user";

export class Criteria {
    name:String; 
    owner: User;
    allowedUsers: User[];
    startdate: Date;
    enddate: Date; 
    comment: String; 



    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
