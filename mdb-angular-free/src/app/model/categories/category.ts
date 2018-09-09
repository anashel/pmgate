import { User } from "../user/user";
import { Project } from "../project/project";

export class Category {
    id: number;
    name = '';
    progress = 20; 
    users: User[];
    project: Project; 

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}