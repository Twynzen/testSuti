import { Component } from '@angular/core';
import { EmployeService } from '../services/employe.service';
import { Employee } from '../models/employe.interface';

@Component({
  selector: 'app-employe-table',
  templateUrl: './employe-table.component.html',
  styleUrls: ['./employe-table.component.scss'],
})
export class EmployeTableComponent {
  employees: Employee[] = [{}] as Employee[];
  filteredEmployees: Employee[] = [{}] as Employee[];
  sortByName = false;
  sortByID = true;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  searchTerm = '';

  constructor(private employeeService: EmployeService) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
        this.totalPages = Math.ceil(this.employees.length / this.pageSize);
        this.setPage(1);
      },
      (error: any) => {
        console.error('Error loading employees:', error);
      }
    );
  }
  setPage(page: number) {
    this.currentPage = page;

    const filteredEmployees = this.filterEmployees();
    const sortedEmployees = this.sortEmployees(filteredEmployees);
    this.filteredEmployees = this.getPageItems(sortedEmployees);
  }

  // Filtra los empleados según el término de búsqueda
  filterEmployees(): Employee[] {
    return this.employees.filter((employee: Employee) => {
      const fullName =
        `${employee.first_name} ${employee.last_name}`.toLowerCase();
      return fullName.includes(this.searchTerm.toLowerCase());
    });
  }

  // Ordena los empleados si se selecciona la opción de ordenamiento por nombre o ID
  sortEmployees(employees: Employee[]): Employee[] {
    if (this.sortByName) {
      return employees.sort((a, b) => a.first_name.localeCompare(b.first_name));
    } else if (this.sortByID) {
      return employees.sort((a, b) => a.id - b.id);
    } else {
      return employees;
    }
  }
  // Establece los empleados filtrados para mostrar en la página actual
  getPageItems(employees: Employee[]): Employee[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return employees.slice(startIndex, endIndex);
  }

  sortByByName() {
    this.sortByName = true;
    this.sortByID = false;
    this.setPage(1);
  }

  sortByByID() {
    this.sortByName = false;
    this.sortByID = true;
    this.setPage(1);
  }

  previousPage() {
    this.setPage(this.currentPage - 1);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }
  hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }
  onSearch() {
    this.setPage(1);
  }
}
