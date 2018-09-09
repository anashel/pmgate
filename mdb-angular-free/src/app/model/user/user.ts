
export class User {
    id: number;
    username :string;
    roleUser :string; 
    validated: boolean; 
    email: string; 
    password: string; 
    
    
    constructor(values: Object = {}) {
        this.id = Math.floor((Math.random() * 100000000) + 1);
        Object.assign(this, values);
        this.validated = false; 
      }
}

