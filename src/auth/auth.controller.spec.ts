import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  const jwtToken = 'jwtToken';

  const mockAuthService = {
    signIn: jest.fn().mockResolvedValueOnce(jwtToken),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('sign in', () => {
    it('should sign in the user and return a token', async () => {
      const signInDto = {
        userName: 'Fabien',
        password: 'fabien123',
      };
      const result = await authController.signIn(signInDto);

      expect(authService.signIn).toHaveBeenCalled();
      expect(result).toEqual(jwtToken);
    });
  });
});
