import { Router } from 'express';
import { InventoryController } from '@/presentation/inventory/controller';

export class InventoryRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new InventoryController();

    router.get('/', controller.getInventory);
    router.get('/:id', controller.getFruitById);
    router.post('/', controller.createFruit);
    router.put('/:id', controller.updateFruit);
    router.delete('/:id', controller.deleteFruit);
    return router;
  }
}