import { CreateFruitDto } from "@/domain/dtos/inventory/create-fruit.dto";
import { UpdateFruitDto } from "@/domain/dtos/inventory/update-fruit.dto";
import { FruitEntity } from "@/domain/entities/fruit.entity";

export abstract class InventoryRepository {
  abstract create(createFruitDto: CreateFruitDto): Promise<FruitEntity>;

  abstract getAll(): Promise<FruitEntity[]>;

  abstract findById(id: number): Promise<FruitEntity>;
  abstract updateById(id: number, updateFruitDto: UpdateFruitDto): Promise<FruitEntity>;
  abstract deleteById(id: number): Promise<FruitEntity>;
}