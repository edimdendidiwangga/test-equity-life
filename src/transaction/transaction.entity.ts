import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_transaksi')
export class Transaction {
  @PrimaryGeneratedColumn()
  transaksi_id: number;

  @Column()
  employee_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  Amount: number;

  @Column()
  tgl_transaksi: Date;
}
