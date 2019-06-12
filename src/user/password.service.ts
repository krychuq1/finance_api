import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PasswordService {
  async hashPassword(plainPassword: string): Promise<string> {
    return  await bcrypt.hash(plainPassword, 10);
  }
  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

}
