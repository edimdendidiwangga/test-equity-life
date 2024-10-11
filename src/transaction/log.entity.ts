import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('log_transaksi')
export class LogTransaction {
  @PrimaryGeneratedColumn()
  log_id: number;

  @Column()
  csv_filename: string;

  @Column()
  total_record: number;

  @Column()
  total_record_failed: number;

  @Column()
  total_record_success: number;

  @Column('text')
  failed_id_notes: string;

  @Column()
  upload_date: Date;
}
