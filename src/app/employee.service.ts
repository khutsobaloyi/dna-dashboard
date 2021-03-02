import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Employee } from './models/employee';
import { Department } from './models/department';
import { Store } from './models/store';
import { FinalEmployee } from './models/final-employee';
import { ThrowStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly authToken = 'Bearer 657552dc-d5a9-498b-9be6-ed42cbbba608';
  readonly URL = "https://uat.catalog-service.aks-web.leroymerlin.co.za/public_api/dna/v1";

  employees: Observable<Employee[]> | undefined;

  constructor(private http: HttpClient) { }


  //get stores list
  getStoresList() {
    
    return this.http.get<Store[]>(this.URL + '/getStoresList', {headers: { 'content-Type': 'application/json', 'Authorization': this.authToken}});
  }

  //get Store by Id
  getStoreById(storeId: number) 
  {
    return this.http.get<Store>(this.URL + '/getStoreById?store_id=' + storeId, {headers: { 'content-Type': 'application/json', 'Authorization': this.authToken}});
  }

  //get Departments List
  getDepartmentsList() {
    return this.http.get<Department[]>(this.URL + '/getDepartmentsList', {headers: { 'content-Type': 'application/json', 'Authorization': this.authToken}});
  }

  //get Departments List by Store Id
  getDeptListByStoreId(storeId: number) {
    return this.http.get<Department[]>(this.URL + '/getDepartmentsListByStoreId?store_id=' + storeId, {headers: { 'content-Type': 'application/json', 'Authorization': this.authToken}});
  } 

  //creat Department
  createDepartment(departmentBody: any) {
    return this.http.post(this.URL + '/createDepartment', {headers: { 'content-Type': 'application/json', 'Authorization': this.authToken}, body: {departmentBody}});
  }  


  //update Department 
  updateDepartment(departmentBody: any) {
    return this.http.put(this.URL + '/updateDepartment', {headers: { 'content-Type': 'application/json', 'Authorization': this.authToken}, body: {departmentBody}})
  }

  //get employees list
  getEmployeesList(page: number, page_size: number) {
    return this.http.get(this.URL + '/getEmployeesList?page=' + page + '&page_size=' + page_size, {headers: { 'content-Type': 'application/json', 'Authorization': this.authToken}});
  }























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
  

  
}
 