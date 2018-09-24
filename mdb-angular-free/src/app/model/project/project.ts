import { User } from "../user/user";
import { Topic } from "../topics/topic";
import { Loge } from "../loges/loge";


export class Project {
    id: number;
    name: string;
    startdate: Date;
    enddate: Date;
    type: string;
    description: string;
    PM: User[];
    SEint: User[];
    SEext: User[];
    TC: User[];
    SWFT: User[];
    CCM: User[];
    QM: User[];
    SM: User[];
    topics: Topic[];
    loges: Loge[];
    progress: number;
    budget: number; 
    phase: number; 
    




    constructor(values: Object = {}) {
        this.PM = [];
        this.SEint =[];
        this.SEext =[];
        this.TC =[];
        this.SWFT =[];
        this.CCM =[];
        this.QM =[];
        this.SM =[];
        this.topics =[];
        this.loges =[];
        this.progress =  0;
        this.phase = 0; 
        this.type = "standard"; 
        Object.assign(this, values);
    }

    
}
