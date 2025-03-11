
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  async validateUser(email: string, password: string): Promise<any> {
    
  }

  async login(email: string, password: string) {
    // Giả sử đây là user từ database
    const user = { id: 1, email: email, password: await bcrypt.hash('123456', 10) };
    // So sánh mật khẩu

    const isPass = await bcrypt.compare(password, user.password);
    if (isPass) {
      const payload = { ...user, password: undefined };
      console.log(payload);
      return { access_token: this.jwtService.sign(payload, { expiresIn: '60m' }) };
    }
    throw new UnauthorizedException('Invalid credentials');
   
  }
}

