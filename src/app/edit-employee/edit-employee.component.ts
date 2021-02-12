import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Department } from '../models/department';
import { Employee } from '../models/employee';
import { Store } from '../models/store';
import { Location } from '@angular/common';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinalEmployee } from '../models/final-employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  departments: Department[] = [];
  employee!: Employee;
  Store!: Store;
  finalEmployee!: FinalEmployee;

  employeeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {
    this.getAllDepartments();
    this.getEmployee();

    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      blank_id: '',
      role: ['', [Validators.required]],
      departments: this.fb.array([]),
      store: ['', [Validators.required]],
      manager_id: '',
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
    });

    //this.employeeForm.get("firstname")!.setValue(this.finalEmployee.name);
  }

  getEmployee() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployee(id).subscribe((data: Employee[]) => {
      // this.employees = data;

      let employee = data[0];
      let dept: Department[] = [];
      let store: Store[] = [];

      this.employeeService
        .getEDepartment(employee.emp_id)
        .subscribe((eDept: { dept_id: number; emp_id: number }[]) => {
          this.employeeService.getDepartments(eDept[0].dept_id).subscribe(
            (dep: Department[]) => {
              dept = dep;
            },
            (error) => console.log(error),

            () => {
              this.employeeService.getStore(employee.store_id).subscribe(
                (s: Store[]) => {
                  store.push(s[0]);
                  console.log('the store name ');
                },
                (error) => console.log(error),
                //completed code
                () => {
                  this.finalEmployee = {
                    surname: employee.emp_surname, //lib_nom
                    name: employee.emp_name, //lib_pre
                    id: employee.emp_id,
                    blank_id: employee.blank_id, //cod_sirh
                    start_date: employee.start_dat, //dat_debctt
                    end_date: employee.end_dat, //dat_finctt
                    role: employee.emp_role, //lib_mis
                    department: dept,
                    store: store[0],
                    manager_id: employee.manager_id, //num_mngr
                    lib_patr: employee.lib_patr,
                    //english parts
                    lib_nom_en: '',
                    lib_pre_en: '',
                    lib_patr_en: '',
                    lib_mis_en: '',
                    lib_raysrv_en: '',
                    lib_ou_en: '',
                    email: employee.email, //mail
                    mobile: employee.mobile_num,
                  };
                  this.setEmployee(this.finalEmployee);
                }
              );
              //let store: Store;
            }
          );
        });
    }); //until here);
  }


  setEmployee(emp: FinalEmployee) {
    this.employeeForm.get('firstName')?.setValue(emp.name);
    this.employeeForm.get('lastName')?.setValue(emp.surname);
    this.employeeForm.get('blank_id')?.setValue(emp.blank_id);
    this.employeeForm.get('role')?.setValue(emp.role);
    for(let d of emp.department) 
    {
      this.fillDepartment(d.dept_name);
    } 
    this.employeeForm.get('store')?.setValue(emp.store.store_name);
    this.employeeForm.get('email')?.setValue(emp.email);
    this.employeeForm.get('mobile')?.setValue(emp.mobile);
    
  }

  getAllDepartments() {
    this.employeeService
      .getAllDepartments()
      .subscribe((depts: Department[]) => (this.departments = depts));
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
    });
    this.departmentForms.push(department);
  }

  fillDepartment(dep: string) {
    const department = this.fb.group({
      name: dep,
    })
  }

  deleteDepartment(i: number) {
    this.departmentForms.removeAt(i);
  }
}
