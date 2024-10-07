import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_employee')
export class Employee {
  @PrimaryGeneratedColumn()
  employee_id: number;

  @Column()
  employee_name: string;

  @Column()
  employee_manager_id: number;
}