import { Response, Request } from 'express';

import { stock } from '../db/stock';

export const stockController = async (req: Request, res: Response) => {
  const { products } = req;

  res.status(200).send(Object.fromEntries(products));
};

export const stockMovementController = async (req: Request, res: Response) => {
  res.status(204).send();
};
