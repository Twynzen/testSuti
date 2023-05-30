import { Injectable } from '@angular/core';
import { Employee } from '../models/employe.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeService {
  constructor(private http: HttpClient) {}
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('./assets/data/MOCK_DATA.json');
  }
}
