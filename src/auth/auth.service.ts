import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { LoginPayload } from './dto/login-payload.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: LoginPayload): Promise<User> {
    const user = await this.userService.findUserByEmail(payload.email);
    if (user && (await bcrypt.compareSync(payload.password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      name: user.name,
      phone: user.phone,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '60s',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '40d',
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
}
