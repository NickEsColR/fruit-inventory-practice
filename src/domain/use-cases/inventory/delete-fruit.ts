import { FruitEntity, FruitEntityProps } from "@/domain/entities/fruit.entity";
import { InventoryRepository } from "@/domain/repositories/inventory.repository";

export interface DeleteFruitUseCase {
  execute(id: FruitEntityProps["id"]): Promise<FruitEntity>;
}

export class DeleteFruit implements DeleteFruitUseCase {
  constructor(private readonly repository: InventoryRepository) { }

  execute(id: FruitEntityProps["id"]): Promise<FruitEntity> {
    return this.repository.deleteById(id);
  }
}