import { EmployeeDepartment } from "./employee-department";

export interface Employee {
    employeeId: number;
    employeeCode: string;
    firstName: string;
    lastName: string;
    departmentCode: string;
    departmentDescription: string;
    phoneNumber: string;
    email: string;
    manager: Employee;
    isActive: boolean;
    employeeDepartmentslist: EmployeeDepartment;
}