import { prisma } from '@/data/postgres'
import { CreateFruitDto } from '@/domain/dtos/inventory/create-fruit.dto';
import { UpdateFruitDto } from '@/domain/dtos/inventory/update-fruit.dto';
import { Request, Response } from 'express'

export class InventoryController {
  constructor() { }

  public async getInventory(req: Request, res: Response) {
    try {
      const inventory = await prisma.fruit.findMany();
      return res.json(inventory);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async getFruitById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID must be a number' });

      const fruit = await prisma.fruit.findFirst({
        where: { id: id }
      });

      (fruit)
        ? res.json(fruit)
        : res.status(404).json({ error: 'Fruit not found' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async createFruit(req: Request, res: Response) {
    try {
      const [error, createFruitDto] = CreateFruitDto.create(req.body);
      if (error) {
        return res.status(400).json({ error });
      }

      const newFruit = await prisma.fruit.create({
        data: createFruitDto!
      });
      return res.status(201).json(newFruit);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async updateFruit(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const [error, updateFruitDto] = UpdateFruitDto.create({ ...req.body, id });
      if (error) return res.status(400).json({ error });

      const fruit = await prisma.fruit.findFirst({
        where: { id: updateFruitDto!.id },
      });

      if (!fruit) return res.status(404).json({ error: 'Fruit not found' });

      const updatedFruit = await prisma.fruit.update({
        where: { id: updateFruitDto!.id },
        data: updateFruitDto!.values,
      });

      return res.json(updatedFruit);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async deleteFruit(req: Request, res: Response) {
    try {
      const id = +req.params.id;
      if (isNaN(id)) return res.status(400).json({ error: 'ID must be a number' });

      const fruit = await prisma.fruit.findFirst({
        where: { id },
      });

      if (!fruit) return res.status(404).json({ error: 'Fruit not found' });

      const deleted = await prisma.fruit.delete({
        where: { id },
      });

      return res.json(deleted);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
