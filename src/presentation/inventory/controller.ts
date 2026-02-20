import { prisma } from '@/data/postgres'
import { CreateFruitDto } from '@/domain/dtos/inventory/create-fruit.dto';
import { UpdateFruitDto } from '@/domain/dtos/inventory/update-fruit.dto';
import { InventoryRepository } from '@/domain/repositories/inventory.repository';
import { CreateFruit } from '@/domain/use-cases/inventory/create-fruit';
import { DeleteFruit } from '@/domain/use-cases/inventory/delete-fruit';
import { GetFruit } from '@/domain/use-cases/inventory/get-fruit';
import { GetFruits } from '@/domain/use-cases/inventory/get-fruits';
import { UpdateFruit } from '@/domain/use-cases/inventory/update-fruit';
import { Request, Response } from 'express'

export class InventoryController {
  constructor(private readonly inventoryRepository: InventoryRepository) { }

  public getInventory(req: Request, res: Response) {
    new GetFruits(this.inventoryRepository).execute()
      .then(fruits => res.json(fruits))
      .catch(error => res.status(400).json({ error }));
  }

  public getFruitById(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: 'ID must be a number' });

    new GetFruit(this.inventoryRepository).execute(id)
      .then(fruit => res.json(fruit))
      .catch(error => res.status(400).json({ error }));
  }

  public createFruit(req: Request, res: Response) {
    const [error, createFruitDto] = CreateFruitDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateFruit(this.inventoryRepository).execute(createFruitDto!)
      .then(fruit => res.status(201).json(fruit))
      .catch(error => res.status(400).json({ error }));
  }

  public  updateFruit(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: 'ID must be a number' });

    const [error, updateFruitDto] = UpdateFruitDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new UpdateFruit(this.inventoryRepository).execute(id, updateFruitDto!)
      .then(fruit => res.json(fruit))
      .catch(error => res.status(400).json({ error }));
  }

  public deleteFruit(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: 'ID must be a number' });

    new DeleteFruit(this.inventoryRepository).execute(id)
      .then(fruit => res.json(fruit))
      .catch(error => res.status(400).json({ error }));
  }
}
