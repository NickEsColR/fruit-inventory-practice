import { InventoryDataSource } from "@/domain/datasources/inventory.datasource";
import { InventoryRepository } from "@/domain/repositories/inventory.repository";
import { CreateFruitDto } from "@/domain/dtos/inventory/create-fruit.dto";
import { UpdateFruitDto } from "@/domain/dtos/inventory/update-fruit.dto";
import { FruitEntity } from "@/domain/entities/fruit.entity";

export class InventoryRepositoryImpl implements InventoryRepository {
  constructor(private readonly dataSource: InventoryDataSource) { }

  create(createFruitDto: CreateFruitDto): Promise<FruitEntity> {
    return this.dataSource.create(createFruitDto);
  }

  getAll(): Promise<FruitEntity[]> {
    return this.dataSource.getAll();
  }

  findById(id: number): Promise<FruitEntity> {
    return this.dataSource.findById(id);
  }

  updateById(id: number, updateFruitDto: UpdateFruitDto): Promise<FruitEntity> {
    return this.dataSource.updateById(id, updateFruitDto);
  }

  deleteById(id: number): Promise<FruitEntity> {
    return this.dataSource.deleteById(id);
  }
}