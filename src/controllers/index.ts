import { Response, Request } from 'express';

import { stock } from '../db/stock';

export const stockController = async (req: Request, res: Response) => {
  const { products } = req;
  console.log(products);

  res.status(200).send(products);
};

export const stockMovementController = async (req: Request, res: Response) => {
  res.status(204).send();
};
