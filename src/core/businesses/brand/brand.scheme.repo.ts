import { Brand } from './brand.model';

export abstract class IBrandRepo {
  abstract getAll(): Promise<Brand[]>;
  abstract getOne(id: number): Promise<Brand>;
  abstract create(brand: Brand): Promise<Brand>;
  abstract update(id: number, brand: any): Promise<Brand>;
  abstract delete(id: number): Promise<void>;
}
