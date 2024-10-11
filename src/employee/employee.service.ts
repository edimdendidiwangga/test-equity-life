import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async getAllEmployees(): Promise<Employee[]> {
    const employees = await this.employeeRepository.find();
    return this.buildEmployeeHierarchy(employees);
  }

  private buildEmployeeHierarchy(employees: Employee[]): any {
    const hierarchy = [];
    const employeeMap = new Map();

    // Build a map of employees by their IDs
    employees.forEach((employee) => {
      employeeMap.set(employee.employee_id, { ...employee, subordinates: [] });
    });

    // Build the hierarchical structure
    employees.forEach((employee) => {
      if (employee.employee_manager_id) {
        employeeMap
          .get(employee.employee_manager_id)
          .subordinates.push(employeeMap.get(employee.employee_id));
      } else {
        hierarchy.push(employeeMap.get(employee.employee_id));
      }
    });

    return hierarchy;
  }
}
