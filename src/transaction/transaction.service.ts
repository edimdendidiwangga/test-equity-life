import { Injectable } from '@nestjs/common';
import * as csvParser from 'csv-parser';
import { createReadStream } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Employee } from '../employee/employee.entity';
import { Fee } from './fee.entity';
import { LogTransaction } from './log.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Fee)
    private readonly feeRepository: Repository<Fee>,
    @InjectRepository(LogTransaction)
    private readonly logTransactionRepository: Repository<LogTransaction>,
  ) {}

  async processFile(file: Express.Multer.File): Promise<any> {
    const successfulRecords = [];
    const failedRecords = [];

    return new Promise((resolve, reject) => {
      createReadStream(file.path)
        .pipe(csvParser({ separator: ';' }))
        .on('data', async (row) => {
          const { employee_id, Amount, tgl_transaksi } = row;

          const employeeExists = await this.employeeRepository.findOne({ where: { employee_id } });

          if (employeeExists) {
            const transaction = this.transactionRepository.create({
              employee_id: employee_id,
              Amount: parseFloat(Amount),
              tgl_transaksi: new Date(tgl_transaksi),
            });

            await this.transactionRepository.save(transaction);
            successfulRecords.push(transaction);
          } else {
            failedRecords.push(employee_id);
          }
        })
        .on('end', async () => {
          await this.calculateFees(successfulRecords);
          await this.logTransaction(file.filename, successfulRecords.length, failedRecords.length, failedRecords);
          resolve({ message: 'File processed successfully', successfulRecords, failedRecords });
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  private async calculateFees(transactions: Transaction[]): Promise<void> {
    for (const transaction of transactions) {
      const employeeHierarchyLevel = await this.getHierarchyLevel(transaction.employee_id);
      const feeAmount = transaction.Amount / employeeHierarchyLevel;

      const fee = this.feeRepository.create({
        employee_id: transaction.employee_id,
        amount_fee: feeAmount,
        tgl_fee: new Date(),
      });

      await this.feeRepository.save(fee);
    }
  }

  private async getHierarchyLevel(employeeId: number): Promise<number> {
    const subordinates = await this.employeeRepository.find({ where: { employee_manager_id: employeeId } });
    return subordinates.length + 1; // Including the employee itself
  }

  private async logTransaction(filename: string, totalRecords: number, totalFailed: number, failedIds: number[]): Promise<void> {
    const logEntry = this.logTransactionRepository.create({
      csv_filename: filename,
      total_record: totalRecords,
      total_record_failed: totalFailed,
      total_record_success: totalRecords - totalFailed,
      failed_id_notes: failedIds.join(', '),
      upload_date: new Date(),
    });

    await this.logTransactionRepository.save(logEntry);
  }
}
