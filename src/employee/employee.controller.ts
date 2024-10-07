import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.getAllEmployees();
  }
}
