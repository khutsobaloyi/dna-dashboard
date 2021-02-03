import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeesComponent} from './employees/employees.component';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  {path: "employees", component: EmployeesComponent},
  {path: 'detail/:id', component: EmployeeDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

