import { CreateFruitDto } from "@/domain/dtos/inventory/create-fruit.dto";
import { FruitEntity } from "@/domain/entities/fruit.entity";
import { InventoryRepository } from "@/domain/repositories/inventory.repository";

export interface CreateFruitUseCase {
  execute(dto: CreateFruitDto): Promise<FruitEntity>;
}

export class CreateFruit implements CreateFruitUseCase {
  constructor(private readonly repository: InventoryRepository) { }

  execute(dto: CreateFruitDto): Promise<FruitEntity> {
    return this.repository.create(dto);
  }
}