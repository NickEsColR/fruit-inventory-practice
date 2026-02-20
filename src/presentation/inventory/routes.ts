import { Router } from 'express';
import { InventoryController } from '@/presentation/inventory/controller';
import { InventoryDataSourceImpl } from '@/infraestructure/datasource/inventory.datasource.impl';
import { InventoryRepositoryImpl } from '@/infraestructure/repositories/inventory.repository.impl';

export class InventoryRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new InventoryDataSourceImpl();
    const repository = new InventoryRepositoryImpl(datasource);
    const controller = new InventoryController(repository);

    router.get('/', controller.getInventory);
    router.get('/:id', controller.getFruitById);
    router.post('/', controller.createFruit);
    router.put('/:id', controller.updateFruit);
    router.delete('/:id', controller.deleteFruit);
    return router;
  }
}