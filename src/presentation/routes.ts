import { Router } from 'express';
import { InventoryRoutes } from '@/presentation/inventory/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/inventory', InventoryRoutes.routes);
    return router;
  }
}