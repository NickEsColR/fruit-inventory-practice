import { FruitEntity } from "@/domain/entities/fruit.entity";
import { InventoryRepository } from "@/domain/repositories/inventory.repository";

export interface GetFruitsUseCase {
  execute(): Promise<FruitEntity[]>;
}

export class GetFruits implements GetFruitsUseCase {
  constructor(private readonly repository: InventoryRepository) { }

  execute(): Promise<FruitEntity[]> {
    return this.repository.getAll();
  }
}