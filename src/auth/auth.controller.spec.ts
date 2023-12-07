import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUseDto } from 'src/users/dto/create-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  const jwtToken = 'jwtToken';

  const mockUser = {
    _id: '656f27642a6e033f96f73f17',
    userName: 'Fabien',
    password: 'fabien123',
    createdAt: '2023-12-05T13:36:36.575Z',
    updatedAt: '2023-12-05T13:36:36.575Z',
    __v: 0,
  };
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
