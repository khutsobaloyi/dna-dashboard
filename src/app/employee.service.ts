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

  //get employees list by storeid
  getEmployeesListByStoreId(page: number, page_size: number, store_id: number) {
    return this.http.get(this.URL + '/getEmployeesListByStoreId?store_id=' + store_id + '&page=' + page + '&page_size=' + page_size, {headers: { 'content-Type': 'application/json', 'Authorization': this.authToken}});
  }

  //get employee by id
  getEmployeeById(emp_id: number) {
    return this.http.get<Employee>(this.URL + '/getEmployeeById?employee_id=' + emp_id, {headers: { 'content-Type': 'application/json', 'Authorization': this.authToken}});
  }

}
 