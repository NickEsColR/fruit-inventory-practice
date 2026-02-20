import { FruitEntity, FruitEntityProps } from "@/domain/entities/fruit.entity";
import { InventoryRepository } from "@/domain/repositories/inventory.repository";

export interface GetFruitUseCase {
  execute(id: FruitEntityProps["id"]): Promise<FruitEntity>;
}

export class GetFruit implements GetFruitUseCase {
  constructor(private readonly repository: InventoryRepository) { }

  execute(id: FruitEntityProps["id"]): Promise<FruitEntity> {
    return this.repository.findById(id);
  }
}