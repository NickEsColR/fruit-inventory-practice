import { prisma } from "@/data/postgres";
import { InventoryDataSource } from "@/domain/datasources/inventory.datasource";
import { CreateFruitDto } from "@/domain/dtos/inventory/create-fruit.dto";
import { UpdateFruitDto } from "@/domain/dtos/inventory/update-fruit.dto";
import { FruitEntity, FruitEntityProps } from "@/domain/entities/fruit.entity";

export class InventoryDataSourceImpl implements InventoryDataSource {
  async create(createFruitDto: CreateFruitDto): Promise<FruitEntity> {
    const fruit = await prisma.fruit.create({
      data: createFruitDto,
    });

    return FruitEntity.fromObject(fruit);
  }
  async getAll(): Promise<FruitEntity[]> {
    const fruits = await prisma.fruit.findMany();
    return fruits.map(fruit => FruitEntity.fromObject(fruit));
  }
  async findById(id: FruitEntityProps["id"]): Promise<FruitEntity> {
    const fruit = await prisma.fruit.findFirst({
      where: { id },
    });

    if (!fruit) {
      throw new Error("Fruit not found");
    }

    return FruitEntity.fromObject(fruit);
  }
  async updateById(id: FruitEntityProps["id"], updateFruitDto: UpdateFruitDto): Promise<FruitEntity> {
    await this.findById(id); // check if fruit exists

    const fruit = await prisma.fruit.update({
      where: { id },
      data: updateFruitDto.values,
    });

    return FruitEntity.fromObject(fruit);
  }
  async deleteById(id: FruitEntityProps["id"]): Promise<FruitEntity> {
    await this.findById(id); // check if fruit exists
    const fruit = await prisma.fruit.delete({
      where: { id },
    });
    return FruitEntity.fromObject(fruit);
  }
  
}