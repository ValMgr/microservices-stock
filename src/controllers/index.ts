import { Response, Request } from 'express';

export const stockController = async (req: Request, res: Response) => {
  const { products } = req;

  res.status(200).send(products);
};

export const stockMovementController = async (req: Request, res: Response) => {
  res.status(204).send();
};
