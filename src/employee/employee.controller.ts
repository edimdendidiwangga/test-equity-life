import { Controller, Get, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('public')
  async getPublicEmployees(): Promise<Employee[]> {
    return this.employeeService.getAllEmployees();
  }

  @UseGuards(JwtAuthGuard)
  @Get('private')
  async getPrivateEmployees(): Promise<Employee[]> {
    return this.employeeService.getAllEmployees();
  }
}
