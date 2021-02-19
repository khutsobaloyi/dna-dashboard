import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Employee } from './models/employee';
import { Department } from './models/department';
import { Store } from './models/store';
import { FinalEmployee } from './models/final-employee';


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

  getDeptWithName(dept_name: string) {
    return this.http.get<Department[]>(this.URL + '/departments/search/' + dept_name);
  }

  getStoreWithName(store_name: string) {
    return this.http.get<Store[]>(this.URL + '/stores/search/' + store_name);
  }

  getAllDepartments() {
    return this.http.get<Department[]>(this.URL +'/departments');
  }
  
  getStore(store_id: number) {
    console.log("store service called");
    return this.http.get<Store[]>(this.URL + '/stores/' + store_id);
  }

  getAllStores() {
    return this.http.get<Store[]>(this.URL +'/stores');
  }

  getLastEmployee() {
    return this.http.get(this.URL + '/employees/last/1');
  }
  //create a new employee
  createEmployee(employee: FinalEmployee) {
    console.log(employee);
    try {
      this.createStore(employee.store);
      employee.department.map((d) => {

        this.createDepartment({...d, store_id: employee.store.store_id});
      })

     return this.getLastEmployee().subscribe((data: any) => {
        let new_id: number = data.max + 1;
        let emp: Employee = {
          emp_name: employee.name,
          emp_surname: employee.surname,
          emp_id: new_id,
          emp_role: employee.role,
          start_dat: employee.start_date,
          end_dat: employee.end_date,
          blank_id: employee.blank_id,
          email: employee.email,
          mobile_num: employee.mobile,
          manager_id: employee.manager_id,
          lib_patr: employee.lib_patr,
          store_id: employee.store.store_id
        }
        return this.http.post<Employee>(this.URL + '/employees', emp);
      })
     
      
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  
  createStore(store: Store) {
    return this.http.post<Store>(this.URL + '/stores', store);
  }

  createDepartment(deptStore: any) {
    return this.http.post<Department>(this.URL + '/departments', deptStore);
  }
}
 