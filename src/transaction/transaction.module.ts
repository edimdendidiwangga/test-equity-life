import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { Fee } from './fee.entity';
import { LogTransaction } from './log.entity';
import { Employee } from '../employee/employee.entity';
import { EmployeeModule } from '../employee/employee.module'; // Import the EmployeeModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Fee, LogTransaction, Employee]), // Register all entities
    EmployeeModule, // Import the EmployeeModule to access EmployeeRepository
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
