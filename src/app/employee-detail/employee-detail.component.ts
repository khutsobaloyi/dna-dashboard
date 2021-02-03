import { Component, Input, OnInit } from '@angular/core';
import {FinalEmployee} from '../models/final-employee';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee';
import { Department } from '../models/department';
import { Store } from '../models/store';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  
  finalEmployee!: FinalEmployee;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location
  ) {}

  
  ngOnInit() {
    this.getHero();
  }
  
  goBack() {
    this.location.back();
  }
  getHero() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployee(id)
      .subscribe((data: Employee[]) => {
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
                      }
                    }
                  );
                  //let store: Store;
                }
              );
            });
        
      }); //until here);
  }

}
