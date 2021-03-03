import { Component, OnInit, AfterViewInit, ViewChild, ɵEMPTY_MAP } from '@angular/core';
import { FinalEmployee } from '../models/final-employee';
import { EmployeeService } from '../employee.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { Employee } from '../models/employee';
import { Store } from '../models/store';
import { Department } from '../models/department';
import {NgxSpinnerService} from 'ngx-spinner';
//import {Injectable} from '@angular/core'
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements AfterViewInit {
  //employees = EMPLOYEES;
  finalEmployees: FinalEmployee[] = [];
  employees: Employee[] = [];
  departments: Department[] = [];

  //material table
  displayedColumns: string[] = ['employeeId','name', 'surname', 'dept_id', 'dept_name', 'manager_id', 'email', 'mobile'];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    //not working properly. so moved to showEmployees
  }

  constructor(private employeeService: EmployeeService, private SpinnerService: NgxSpinnerService, private _electronService: ElectronService) {}

  ngOnInit(): void {
    this.showEmployees();
  }

  exportTable() {

    console.log(this.dataSource.data);
    console.log(this.employees);

    //to be implemented
    // let csvData = "lib_nom;lib_pre;cod_sirh;num_uid;dat_debctt;dat_finctt;lib_mis;cod_raysrv;lib_raysrv;cod_uo;lib_uo;lib_ens;lib_pay;num_mngr;lib_patr;lib_nom_en;lib_pre_en;lib_patr_en;lib_mis_en;lib_raysrv_en;lib_uo_en;mail;mobile\n";
    // this.finalEmployees.map((emp: FinalEmployee) => {
    //   csvData += emp.surname + ';' + emp.name + ';' + emp.id + ';' + emp.blank_id + ';' + emp.start_date + ';' + emp.end_date + ';' + emp.role + ';';
      
    //     //for ids
    //     for(let d of emp.department) 
    //     {
    //       if(d.dept_id === emp.department[emp.department.length - 1].dept_id)
    //       {
    //         csvData += d.dept_id + ';' 
    //       } else {
    //         csvData += d.dept_id + '/';
    //       } 
    //     }
    //     //for namex
    //     for(let d of emp.department)
    //     {
    //       if(d.dept_id === emp.department[emp.department.length - 1].dept_id)
    //       {
    //         csvData += d.dept_name + ';' 
    //       } else {
    //         csvData += d.dept_name + '/';
    //       } 
    //     }
      
    //   csvData += emp.store.store_id + ';' + emp.store.store_name + ';' + emp.store.company_initials + ';' + emp.store.country + ';' + emp.manager_id + ';' + emp.lib_patr + ';' + emp.lib_nom_en + ';' + emp.lib_pre_en + ';' + emp.lib_patr_en + ';' + emp.role + ';' + emp.lib_raysrv_en + ';' + emp.store.store_name + ';' + emp.email + ';' + emp.mobile + '\n';
      
    // })
    
    // this._electronService.ipcRenderer.send("selectDirectory", csvData);
  }


  showEmployees() {

    this.SpinnerService.show();

    this.employeeService.getEmployeesList(1, 10).subscribe((data: any) => {
      this.employees = data.employeesList;
      console.log(this.employees);
      this.dataSource = new MatTableDataSource<Employee>(this.employees);
      this.dataSource.paginator = this.paginator;
     // this.table.renderRows();
    });
    //this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      // this.employees = data;

     // data.map((employee) => {
       // let dept: Department[] = [];
        //let store: Store[] = [];

    //     this.employeeService
    //       .getEDepartment(employee.emp_id)
    //       .subscribe((eDept: { dept_id: number; emp_id: number }[]) => {
    //         this.employeeService.getDepartments(eDept[0].dept_id).subscribe(
    //           (dep: Department[]) => {
    //             dept = dep;
    //           },
    //           (error) => console.log(error),

    //           () => {
    //             this.employeeService.getStore(employee.store_id).subscribe(
    //               (s: Store[]) => {
    //                 store.push(s[0]);
    //                 console.log('the store name ');
    //               },
    //               (error) => console.log(error),
    //               //completed code
    //               () => {
    //                 this.finalEmployees.push({
    //                   surname: employee.emp_surname, //lib_nom
    //                   name: employee.emp_name, //lib_pre
    //                   id: employee.emp_id,
    //                   blank_id: employee.blank_id, //cod_sirh
    //                   start_date: employee.start_dat, //dat_debctt
    //                   end_date: employee.end_dat, //dat_finctt
    //                   role: employee.emp_role, //lib_mis
    //                   department: dept,
    //                   store: store[0],
    //                   manager_id: employee.manager_id, //num_mngr
    //                   lib_patr: employee.lib_patr,
    //                   //english parts
    //                   lib_nom_en: '',
    //                   lib_pre_en: '',
    //                   lib_patr_en: '',
    //                   lib_mis_en: '',
    //                   lib_raysrv_en: '',
    //                   lib_ou_en: '',
    //                   email: employee.email, //mail
    //                   mobile: employee.mobile_num,
    //                 });
    //               }
    //             );
    //             //arrayOfObjects.sort((a, b) => (a.propertyToSortBy < b.propertyToSortBy ? -1 : 1));
    //             this.finalEmployees.sort((a: FinalEmployee, b: FinalEmployee) => (a.id < b.id ? -1 : 1));
                 this.SpinnerService.hide();
    //             //let store: Store;
    //           }
    //         );
    //       }, (err) => console.log(err),
    //       () => {
          
    //       }
    //       );
     // });
    // });
  }
  //onSelect(employee: Employee ) {

  // }
}
