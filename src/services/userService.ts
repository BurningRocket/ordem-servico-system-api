import { IUser, User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRoleEnum } from '../models/enums/userRoleEnum';

export class UserService {
  constructor() { }

  async register(registerUser: IUser) {
    const oldUser = await User.findOne({ email: registerUser.email });
    if (oldUser) throw { message: 'Usuário já existente' };

    const encryptedPassword = await bcrypt.hash(registerUser.password, 10);

    const newUser = new User(registerUser);

    newUser.role = UserRoleEnum.BASE;

    newUser.password = encryptedPassword;

    const user = await newUser.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'secret',
      {
        expiresIn: '1d',
      }
    );

    const returnUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token
    }
    
    return returnUser;
  }

  async login(loginUser: IUser) {

    const user = await User.findOne({ email: loginUser.email });    

    if (!user) throw { message: 'Usuário não existe' };

    const validPassword = await bcrypt.compare(loginUser.password, user.password);

    if (!validPassword) throw { message: 'Senha invalida' };

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'secret',
      {
        expiresIn: '1d',
      }
    );

    const returnUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token
    }

    return returnUser;

  }

  async findAll() {
    const users = await User.find();
    return users;
  }
}