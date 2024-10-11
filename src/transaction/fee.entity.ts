import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_fee')
export class Fee {
  @PrimaryGeneratedColumn()
  fee_id: number;

  @Column()
  employee_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount_fee: number;

  @Column()
  tgl_fee: Date;
}
