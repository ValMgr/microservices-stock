import { Router } from 'express';

import { getStock, checkMovement, checkId } from '../middlewares';
import { stockController, stockMovementController } from '../controllers';

export const routes = (app) => {
  const router = Router();

  router.get('/', getStock, stockController);

  router.post('/:id/movement', checkId, checkMovement, stockMovementController);

  app.use('/api/stock', router);
};
