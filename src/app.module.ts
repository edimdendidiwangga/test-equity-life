import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'; 
import { EmployeeModule } from './employee/employee.module';
import { TransactionModule } from './transaction/transaction.module';
import { BasicAuthMiddleware } from './auth/basic-auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: 'mysql://root:vjiqkBBiLERTtdPVFIpfpTpiYjCCuwYj@autorack.proxy.rlwy.net:46960/railway',
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    EmployeeModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BasicAuthMiddleware).forRoutes('private/*');
  }
}
