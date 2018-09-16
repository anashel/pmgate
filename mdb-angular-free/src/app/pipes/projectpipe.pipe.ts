import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectpipe'
})
export class ProjectpipePipe implements PipeTransform {

  transform(items: any[], searchProject: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchProject) {
      return items;
    }
    searchProject = searchProject.toLocaleLowerCase();

    return items.filter(it => {
      return (it.name.toLocaleLowerCase().includes(searchProject));
    });
  }

}
