import { User } from "../user/user";

export class Criteria {
    owner: User[];
    allowedUsers: User[];



    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
