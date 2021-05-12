import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { IUserLogin } from './dto/user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  /**
   * Function to create user
   * @param user : User
   */
  async createUser(user: User): Promise<any> {
    return await this.usersRepository.save(user);
  }

  /**
   * Function to get user by id
   * @param _id : number
   */

  async getUser(_id: number): Promise<User[]> {
    return await this.usersRepository.find({
      where: [{ id: _id }],
    });
  }

  /**
   * Function to update user
   * @param userId : number
   * @param user : User
   */

  async updateUser(userId: number, user: User): Promise<User> {
    const editedUser = await this.usersRepository.findOne(userId);
    if (!editedUser) {
      throw new NotFoundException('User is not found');
    }
    return await this.usersRepository.save({ ...user, id: Number(userId) });
  }

  /**
   * Function to delete user
   * @param userId : number
   */

  async deleteUser(userId: number): Promise<void> {
    await this.usersRepository.delete(userId);
  }

  /**
   * Function to get user based on the emailid and password
   * @param loginPayload: IUserLogin
   */
  async userLogin(loginPayload: IUserLogin): Promise<User[]> {
    const { email, password } = loginPayload;

    return await this.usersRepository.find({
      where: [{ email: email, password: password }],
    });
  }
}
