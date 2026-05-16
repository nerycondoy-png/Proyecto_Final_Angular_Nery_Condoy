import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentFilter',
  standalone: true,
  pure: false // impuro, recalcula en cada ciclo
})
export class StudentFilterPipe implements PipeTransform {
  transform(students: any[], search: string): any[] {
    if (!students || !search) return students;
    return students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  }
}
