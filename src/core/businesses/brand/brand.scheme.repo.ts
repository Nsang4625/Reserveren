import { User } from '../user/user.model';
import { Brand } from './brand.model';

export abstract class IBrandRepository {
  abstract getAll(): Promise<Brand[]>;
  abstract getOne(id: number): Promise<Brand>;
  abstract create(brand: Brand, user: User): Promise<Brand>;
  abstract update(id: number, brand: any): Promise<Brand>;
  abstract delete(id: number): Promise<void>;
  abstract addStaff(user: User, brand: Brand): Promise<void>;
}
