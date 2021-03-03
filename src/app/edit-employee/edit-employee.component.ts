import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Department } from '../models/department';
import { Employee } from '../models/employee';
import { Store } from '../models/store';
import { Location } from '@angular/common';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinalEmployee } from '../models/final-employee';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  departments: Department[] = [];
  employees: Employee[] = [];
  filteredEmployees?: Observable<Employee[]>;

  finalDepartments: Department[] = []; //departments to be submitted
  finalEmployee!: FinalEmployee;
  stores: Store[] = []; //to get an array of stores for displaying
  finalStore!: Store; //the store to be submited

  employeeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {

    this.getAllDepartments();
    this.getAllStores();
    this.getEmployee(); //gets the employee to display
    this.getEmployees();

    this.employeeForm = this.fb.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      start_date: Date,
      end_date: Date,
      blank_id: '',
      role: ['', [
        Validators.required
      ]],
      departments: this.fb.array([]),
      store: ['', [
        Validators.required
      ]],
      manager: [''],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      mobile: ['', [
        Validators.required
      ]]
    })

    this.employeeForm.controls['email'].disable();

    this.filteredEmployees = this.employeeForm.get('manager')!.valueChanges.pipe(
      startWith(''),
     // map(value => this._filter(value))
    );
  }

  getEmployee() {
    // const id = +this.route.snapshot.paramMap.get('id')!;
    // this.employeeService.getEmployee(id).subscribe((data: Employee[]) => {
    //   // this.employees = data;

    //   let employee = data[0];
    //   let dept: Department[] = [];
    //   let store: Store[] = [];

    //   this.employeeService
    //     .getEDepartment(employee.emp_id)
    //     .subscribe((eDept: { dept_id: number; emp_id: number }[]) => {
    //       this.employeeService.getDepartments(eDept[0].dept_id).subscribe(
    //         (dep: Department[]) => {
    //           dept = dep;
    //         },
    //         (error) => console.log(error),

    //         () => {
    //           this.employeeService.getStore(employee.store_id).subscribe(
    //             (s: Store[]) => {
    //               store.push(s[0]);
    //               console.log('the store name ');
    //             },
    //             (error) => console.log(error),
    //             //completed code
    //             () => {
    //               this.finalEmployee = {
    //                 surname: employee.emp_surname, //lib_nom
    //                 name: employee.emp_name, //lib_pre
    //                 id: employee.emp_id,
    //                 blank_id: employee.blank_id, //cod_sirh
    //                 start_date: employee.start_dat, //dat_debctt
    //                 end_date: employee.end_dat, //dat_finctt
    //                 role: employee.emp_role, //lib_mis
    //                 department: dept,
    //                 store: store[0],
    //                 manager_id: employee.manager_id, //num_mngr
    //                 lib_patr: employee.lib_patr,
    //                 //english parts
    //                 lib_nom_en: '',
    //                 lib_pre_en: '',
    //                 lib_patr_en: '',
    //                 lib_mis_en: '',
    //                 lib_raysrv_en: '',
    //                 lib_ou_en: '',
    //                 email: employee.email, //mail
    //                 mobile: employee.mobile_num,
    //               };
    //               this.setEmployee(this.finalEmployee);
    //             }
    //           );
    //           //let store: Store;
    //         }
    //       );
    //     });
    // }); //until here);
  }

  //populates employee details in input boxes
  setEmployee(emp: FinalEmployee) {
  //   this.employeeForm.get('firstName')?.setValue(emp.name);
  //   this.employeeForm.get('lastName')?.setValue(emp.surname);
  //   this.employeeForm.get('start_date')?.setValue(new Date(emp.start_date));
  //   this.employeeForm.get('end_date')?.setValue(new Date(emp.end_date));
  //   this.employeeForm.get('blank_id')?.setValue(emp.blank_id);
  //   this.employeeForm.get('role')?.setValue(emp.role);
  //   for(let d of emp.department) 
  //   {
  //     this.fillDepartment(d.dept_name);
  //   } 
  //   this.employeeForm.get('store')?.setValue(emp.store.store_name);
  //   this.employeeForm.get('email')?.setValue(emp.email);
  //   this.employeeForm.get('mobile')?.setValue(emp.mobile);
    
  // }
  // private _filter(value: string) {
  //   const filterValue = value.toLowerCase();

  //   return this.employees.filter(emp => emp.emp_name.toLowerCase().includes(filterValue));
  // }

  // changeStore(e: any) {
  //   this.employeeForm.get('store')?.setValue(e.target.value);
  // }

  // fillDepartment(dep: string) {
  //   const department = this.fb.group({
  //     name: dep,
  //   });
  //   this.departmentForms.push(department);
  // }

  // saveEmployee() {
  //   console.log("store value...");
  //   console.log(this.store?.value.store_name);
  //   console.log("department value...");
  //   for(let dep of this.departmentForms.controls)
  //   {
  //     //look up corresponding object in api
  //     console.log(dep.value.dep);
  //     this.finalDepartments.push(dep.value.dep);
  //     //this.employeeService.getDeptWithName(dep.value).subscribe((d: Department[]) => {
  //     //  this.finalDepartments.push(d[0]);
  //    // });
  //   }

  //   //create an employee
  //   this.finalEmployee = {
  //     id: 0, //real value in the service (api endpoint)
  //     name: this.firstName?.value.toUpperCase(),
  //     surname: this.lastName?.value.toUpperCase(),
  //     start_date: this.startDate?.value.getDate() + '/' + (this.startDate?.value.getMonth() + 1) + '/' + this.startDate?.value.getFullYear(),
  //     end_date: this.startDate?.value.getDate() + '/' + (this.startDate?.value.getMonth() + 1) + '/' + this.startDate?.value.getFullYear(),
  //     blank_id: this.blankId?.value,
  //     role: this.role?.value.toUpperCase(),
  //     department: this.finalDepartments,
  //     store: this.store?.value,
  //     manager_id: this.manager?.value.split(' ')[0] === "" ? 0: parseInt(this.manager?.value.split(' ')[0]),
  //     lib_patr: '',
  //     lib_nom_en: '',
  //     lib_pre_en: '',
  //     lib_patr_en: '',
  //     lib_mis_en: '',
  //     lib_raysrv_en: '',
  //     lib_ou_en: '', 
  //     email: this.email?.value, //mail
  //     mobile: this.mobile?.value
  //   }

  //   console.log(this.finalEmployee);
  //   //submit data
  //   this.employeeService.createEmployee(this.finalEmployee)
    //  if(this.employeeService.createEmployee(this.finalEmployee) !== null)
    //  {
      //  console.log("uploaded...");
    //  } else {
      //  console.log("there was something wrong while posting data");
    //  }
        
  }

  changeMobile() {
    console.log(this.employeeForm.get('manager')?.value);
  }
  loging() {
    console.log("display something");
  }

  setEmail() {
    this.employeeForm.get('email')?.setValue(this.firstName?.value + '.' + this.lastName?.value + '@leroymerlin.co.za');
  }
  getAllDepartments() {
  //  this.employeeService.getAllDepartments().subscribe((depts: Department[]) => this.departments = depts);
  }

  getEmployees() {
  //  this.employeeService.getEmployees().subscribe((emp: Employee[]) => this.employees = emp);
  }
  getAllStores() {
    // this.employeeService.getAllStores().subscribe((stores: Store[]) => {
    //   console.log("getAllStores() called ..");
    //   console.log(stores);
    //   this.stores = stores;
    // });
  }
  
  get firstName() {
    return this.employeeForm.get('firstName');
  }

  get lastName() {
    return this.employeeForm.get('lastName');
  }

  get startDate() {
    return this.employeeForm.get('start_date');
  }

  get endDate() {
    return this.employeeForm.get('end_date');
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

  get manager() {
    return this.employeeForm.get('manager');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  get mobile() {
    return this.employeeForm.get('mobile');
  }


  addDepartment() {
    const department = this.fb.group({
      dep: [],
    })

    this.departmentForms.push(department);
  }

  deleteDepartment(i: number) {
    this.departmentForms.removeAt(i);
  }

}
