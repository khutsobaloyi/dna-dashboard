import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ɵEMPTY_MAP,
} from '@angular/core';
import { FinalEmployee } from '../models/final-employee';
import { EmployeeService } from '../employee.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Employee } from '../models/employee';
import { Store } from '../models/store';
import { Department } from '../models/department';
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
  displayedColumns: string[] = [
    'employeeId',
    'name',
    'surname',
    'dept_id',
    'dept_name',
    'manager_id',
    'email',
    'mobile',
  ];

  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    //not working properly
      this.dataSource.paginator = this.paginator;
  }

  constructor(
    private employeeService: EmployeeService,
    private _electronService: ElectronService
  ) {}

 ngOnInit() {
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

  searchString(e: any) {
    console.log(e);
    console.log(e.target.value);
    this.dataSource.filter = e.target.value.trim().toLocaleLowerCase();
  }
  showEmployees() {

    let emp = sessionStorage.getItem('employees');

    if (emp !== null && emp !== undefined) {
      this.employees = JSON.parse(emp);
      
      this.dataSource = new MatTableDataSource<Employee>(this.employees);
    
    } else {
      this.employeeService.getEmployeesList(1, 100000).subscribe((data: any) => {
        this.employees = data.employeesList;
       
        this.dataSource = new MatTableDataSource<Employee>(this.employees);
        this.dataSource.paginator = this.paginator; //placed here for the first initial load
        sessionStorage.setItem('employees', JSON.stringify(this.employees));
        // this.table.renderRows();
      });
    }
         
  }
}
