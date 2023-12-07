import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Model } from 'mongoose';
import { Users } from '../users/schemas/users.schema';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let model: Model<Users>;
  let jwtService: JwtService;

  const mockUser = {
    _id: '656f27642a6e033f96f73f17',
    userName: 'Fabien',
    password: 'fabien123',
    createdAt: '2023-12-05T13:36:36.575Z',
    updatedAt: '2023-12-05T13:36:36.575Z',
    __v: 0,
  };

  const mockAuthService = {
    findOne: jest.fn(),
  };
  const token = 'jwtToken';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        JwtService,
        AuthService,
        { provide: getModelToken(Users.name), useValue: mockAuthService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    model = module.get<Model<Users>>(getModelToken(Users.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
  describe('sign in', () => {
    const signInDto = {
      userName: 'Fabien',
      password: 'fabien123',
    };
    it('should login a user and return a token', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);
      const result = await authService.signIn(
        signInDto.userName,
        signInDto.password,
      );
      expect(result).toEqual({ access_token: token });
    });

    it('should find the user', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);
      expect(
        authService.signIn(signInDto.userName, signInDto.password),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
