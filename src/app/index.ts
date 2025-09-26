import express from 'express';
import bodyParser from 'body-parser';
import { InMemoryUserRepository } from '../domain/infrastructure/db/InMemoryUserRepository.js';
import { RegisterUserController } from '../domain/interfaces/controllers/RegisterUserController.js';
import { RegisterUser } from '../domain/use-cases/RegisterUser.js';


const app = express();
const port = 3000;

app.use(bodyParser.json());

// Dependency injection
const userRepo = new InMemoryUserRepository();
const registerUser = new RegisterUser(userRepo);
const controller = new RegisterUserController(registerUser);

// Route
app.post('/register', (req, res) => controller.handle(req, res));

app.listen(port, () => {
  console.log(` Server is running at http://localhost:${port}`);
});
