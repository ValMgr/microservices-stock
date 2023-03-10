export enum StockMovementType {
  Supply = 'Supply',
  Reserve = 'Reserve',
  Removal = 'Removal'
}

export type StockMovementDto = {
  productId: string; // This ID is the ID inside the catalogue
  quantity: number;
  status: StockMovementType;
}

export interface StockProductDto {
  productId: string;
  quantity: number;
}
