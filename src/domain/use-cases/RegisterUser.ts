import { v4 as uuidv4 } from 'uuid';
import type { UserRepository } from '../repositories/UserRepository.js';
import { User } from '../entities/User.js';

export class RegisterUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(name: string, email: string): Promise<User> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new Error('User already exists');
    const user = new User(uuidv4(), name, email);
    await this.userRepository.save(user);
    return user;
  }
}
