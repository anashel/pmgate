export class Category {
    id: number;
    name = '';
    progress: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}