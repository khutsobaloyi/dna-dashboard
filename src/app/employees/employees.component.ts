import { Component, OnInit, ɵEMPTY_MAP } from '@angular/core';
import { FinalEmployee } from '../models/final-employee';
import { EmployeeService } from '../employee.service';

import { Employee } from '../models/employee';
import { Store } from '../models/store';
import { Department } from '../models/department';
import {NgxSpinnerService} from 'ngx-spinner';
//import {Injectable} from '@angular/core'

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  //employees = EMPLOYEES;
  finalEmployees: FinalEmployee[] = [];
  employees: Employee[] = [];
  departments: Department[] = [];

  constructor(private employeeService: EmployeeService, private SpinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.showEmployees();
  }

  exportTable() {
    //to be implemented
  }


  showEmployees() {

    this.SpinnerService.show();
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      // this.employees = data;

      data.map((employee) => {
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
                    this.finalEmployees.push({
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
                    });
                  }
                );

                this.SpinnerService.hide();
                //let store: Store;
              }
            );
          });
      });
    });
  }
  //onSelect(employee: Employee ) {

  // }
}
