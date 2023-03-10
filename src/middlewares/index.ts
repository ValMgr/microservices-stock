import axios from 'axios';

import { StockMovementDto } from 'types/req/stock';
import { reservation } from '../db/reservation';
import { stock } from '../db/stock';

export const getStock = async (req, res, next) => {
  req.products = Array.from(stock, ([productId, quantity]) => ({ productId, quantity }));

  next();
};

const addStock = async (req, res, next) => {
  const { productId, quantity } = req.body as StockMovementDto;

  if (stock.has(productId)) {
    const currentQuantity = stock.get(productId);

    stock.set(productId, currentQuantity + +quantity);
    return next();
  }

  const checkProduct = await axios
    .get(`http://microservices.tp.rjqu8633.odns.fr/api/products/${productId}`)
    .catch(() => ({ data: null }));

  if (!checkProduct.data) {
    return res.status(400).json({ error: 'Product not found' });
  }

  stock.set(productId, +quantity);
  return next();
};

const reserveStock = async (req, res, next) => {
  const { productId, quantity } = req.body as StockMovementDto;

  if (stock.has(productId)) {
    const currentQuantity = stock.get(productId);

    if (currentQuantity >= +quantity) {
      stock.set(productId, currentQuantity - +quantity);
      reservation.set(productId, +quantity);
      return next();
    }

    return res.status(400).json({ error: 'Not enough stock' });
  }

  return res.status(400).json({ error: 'Product not found' });
};

const removeStock = async (req, res, next) => {
  const { productId, quantity } = req.body as StockMovementDto;

  if (reservation.has(productId)) {
    const currentQuantity = reservation.get(productId);

    if (currentQuantity >= +quantity) {
      reservation.set(productId, currentQuantity - +quantity);
      return next();
    }

    return res.status(400).json({ error: 'Not enough stock reserved' });
  }

  return res.status(400).json({ error: 'Product not found' });
};

export const checkMovement = async (req, res, next) => {
  const { status } = req.body as StockMovementDto;

  switch (status) {
    case 'Supply':
      return addStock(req, res, next);
    case 'Reserve':
      return reserveStock(req, res, next);
    case 'Removal':
      return removeStock(req, res, next);
    default:
      return res.status(400).json({ error: 'Invalid movement' });
  }
};

export const checkId = async (req, res, next) => {
  const { id } = req.params;
  const { productId } = req.body as StockMovementDto;

  if (id !== productId) {
    return res.status(400).json({ error: 'Invalid product id' });
  }

  return next();
};
