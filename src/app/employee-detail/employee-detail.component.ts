import { Component, Input, OnInit } from '@angular/core';
import {FinalEmployee} from '../models/final-employee';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee';
import { Department } from '../models/department';
import { Store } from '../models/store';
import { EmployeeDepartment } from '../models/employee-department';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  
  employee!: Employee;
  store!: Store; //used to display


  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location //used for routing
  ) {}

  
  ngOnInit() {
    this.getEmployee();
  }
  
  goBack() {
    this.location.back();
  }
  
  getEmployee() {
     const id = +this.route.snapshot.paramMap.get('id')!;

     this.employeeService.getEmployeeById(id).subscribe((data: Employee) => {
       this.employee = data;
       //get store information associated with each department
       if(this.employee.employeeDepartmentslist !== null && this.employee.employeeDepartmentslist !== undefined)
       {
         this.employee.employeeDepartmentslist.map((department: EmployeeDepartment) => {
           //use store id to query for store name to display
           this.employeeService.getStoreById(department.storeId).subscribe((s: Store) => this.store = s); 
         })
       }
     })
        
  }

}
