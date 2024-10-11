import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller'; // Import controller gabungan
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Guard untuk JWT
import { EmployeeService } from './employee.service'; // Mock service untuk testing

describe('EmployeeController', () => {
  let controller: EmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController], // Gunakan satu controller
      providers: [EmployeeService], // Mock service untuk testing
    })
      .overrideGuard(JwtAuthGuard) // Override JWT guard untuk private routes
      .useValue({ canActivate: () => true }) // Simulasikan guard agar selalu berhasil
      .compile();

    controller = module.get<EmployeeController>(EmployeeController); // Controller untuk public & private
  });

  it('should be defined', () => {
    expect(controller).toBeDefined(); // Pastikan controller terdefinisi
  });

  // Test untuk public endpoint
  describe('getPublicEmployees', () => {
    it('should return public employees data', async () => {
      const result = await controller.getPublicEmployees();
      expect(result).toBeDefined(); // Test public endpoint
    });
  });

  // Test untuk private endpoint
  describe('getPrivateEmployees', () => {
    it('should return private employees data', async () => {
      const result = await controller.getPrivateEmployees();
      expect(result).toBeDefined(); // Test private endpoint (protected by JWT)
    });
  });
});
