import { EmployeeDepartment } from "./employee-department";

export interface Employee {
    employeeId: number;
    employeeCode: string;
    firstName: string;
    lastName: string;
    departmentCode: string;
    departmentDescription: string;
    startDate: string;
    endDate: string;
    missionFR: string;
    missionEN: string;
    enseigneLable: string;
    pays: string;
    phoneNumber: string;
    email: string;
    manager: Employee;
    isActive: boolean;
    employeeDepartmentslist: EmployeeDepartment[];
}