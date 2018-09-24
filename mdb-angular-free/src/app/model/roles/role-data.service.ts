import { Injectable } from '@angular/core';
import { Role } from './role';

@Injectable()
export class RoleDataService {
  roles: Role[];

  constructor() {

    this.roles = require('../../../assets/data/roles.json');
  }



}
