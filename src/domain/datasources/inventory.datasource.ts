import { CreateFruitDto } from "@/domain/dtos/inventory/create-fruit.dto";
import { UpdateFruitDto } from "@/domain/dtos/inventory/update-fruit.dto";
import { FruitEntity, FruitEntityProps } from "@/domain/entities/fruit.entity";

export abstract class InventoryDataSource {
  abstract create(createFruitDto: CreateFruitDto): Promise<FruitEntity>;

  //TODO: add pagination
  abstract getAll(): Promise<FruitEntity[]>;

  abstract findById(id: FruitEntityProps["id"]): Promise<FruitEntity>;
  abstract updateById(id: FruitEntityProps["id"], updateFruitDto: UpdateFruitDto): Promise<FruitEntity>;
  abstract deleteById(id: FruitEntityProps["id"]): Promise<FruitEntity>;
}