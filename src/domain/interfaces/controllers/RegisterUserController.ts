import type { Request, Response } from 'express';
import type { RegisterUser } from '../../use-cases/RegisterUser.js';

export class RegisterUserController {
  constructor(private registerUser: RegisterUser) {}

  async handle(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const user = await this.registerUser.execute(name, email);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
