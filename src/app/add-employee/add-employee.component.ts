import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Department } from '../models/department';
import { Employee } from '../models/employee';
import { Store } from '../models/store';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  departments: Department[] = [];
  employee!: Employee;
  Store!: Store;

  employeeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.getAllDepartments();

    this.employeeForm = this.fb.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      blank_id: '',
      role: ['', [
        Validators.required
      ]],
      departments: this.fb.array([]),
      store: ['', [
        Validators.required
      ]],
      manager_id: '',
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      mobile: ['', [
        Validators.required
      ]]
    })
  }

  getAllDepartments() {
    this.employeeService.getAllDepartments().subscribe((depts: Department[]) => this.departments = depts);
  }
  
  get firstName() {
    return this.employeeForm.get('firstName');
  }

  get lastName() {
    return this.employeeForm.get('lastName');
  }

  get blankId() {
    return this.employeeForm.get('blank_id');
  }

  get role() {
    return this.employeeForm.get('role');
  }


  get departmentForms() {
    return this.employeeForm.get('departments') as FormArray;
  }

  get store() {
    return this.employeeForm.get('store');
  }

  get managerId() {
    return this.employeeForm.get('manager_id');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  get mobile() {
    return this.employeeForm.get('mobile');
  }


  addDepartment() {
    const department = this.fb.group({
      name: [],
    })

    this.departmentForms.push(department);
  }

  deleteDepartment(i: number) {
    this.departmentForms.removeAt(i);
  }

}
