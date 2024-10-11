import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: 'mysql://root:vjiqkBBiLERTtdPVFIpfpTpiYjCCuwYj@autorack.proxy.rlwy.net:46960/railway',
      autoLoadEntities: true,
      synchronize: false,
    }),
    EmployeeModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
