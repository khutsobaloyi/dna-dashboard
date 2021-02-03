import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Employee } from './models/employee';
import { Department } from './models/department';
import { Store } from './models/store';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly URL = "http://localhost:3000/api";

  employees: Observable<Employee[]> | undefined;

  constructor(private http: HttpClient) { }

  //get all employees
  getEmployees() {
    console.log("employee service called");
    return this.http.get<Employee[]>(this.URL + '/employees');
  }

  getEmployee(id: number) {
    return this.http.get<Employee[]>(this.URL + '/employees/' + id);
  }
  
  getEDepartment(emp_id: number) {
    console.log("employee department service called");
    
    return this.http.get<{dept_id: number, emp_id: number}[]>(this.URL + '/departments/emp/' + emp_id);
     
  }

  getDepartments(dept_id: number) {
    
     console.log("department service called")
      return this.http.get<Department[]>(this.URL + '/departments/' + dept_id);
    
   
  }

  getStore(store_id: number) {
    console.log("store service called");
    return this.http.get<Store[]>(this.URL + '/stores/' + store_id);
  }

  
}
