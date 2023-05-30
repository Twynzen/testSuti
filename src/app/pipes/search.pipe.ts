import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employe.interface';


@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(employees: Employee[], searchTerm: string): Employee[] {
    if (!searchTerm) {
      return employees;
    }

    searchTerm = searchTerm.toLowerCase();
    return employees.filter((employee: Employee) => {
      const fullName =
        `${employee.first_name} ${employee.last_name}`.toLowerCase();
      return fullName.includes(searchTerm);
    });
  }
}
