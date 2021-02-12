import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeesComponent} from './employees/employees.component';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  {path: "employees", component: EmployeesComponent},
  {path: 'detail/:id', component: EmployeeDetailComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'add', component: AddEmployeeComponent},
  {path: 'edit/:id', component: EditEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

