import { EntityRepository, Repository } from 'typeorm';
import User from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
      public async findOneUserByField(field: keyof User, value: any): Promise<User> {
            const result = await this.createQueryBuilder().where(`${field} = :value`, { value }).getOne();

            return result;
      }
}
