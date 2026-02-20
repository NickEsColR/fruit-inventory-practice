import { UpdateFruitDto } from "@/domain/dtos/inventory/update-fruit.dto";
import { FruitEntity, FruitEntityProps } from "@/domain/entities/fruit.entity";
import { InventoryRepository } from "@/domain/repositories/inventory.repository";

export interface UpdateFruitUseCase {
  execute(id: FruitEntityProps["id"], dto: UpdateFruitDto): Promise<FruitEntity>;
}

export class UpdateFruit implements UpdateFruitUseCase {
  constructor(private readonly repository: InventoryRepository) { }

  execute(id: FruitEntityProps["id"], dto: UpdateFruitDto): Promise<FruitEntity> {
    return this.repository.updateById(id, dto);
  }
}