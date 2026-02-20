export interface FruitEntityProps {
  id: number;
  name: string;
  quantity: number;
  createdAt: Date;
}

export class FruitEntity {
  constructor(public props: FruitEntityProps) { }

  private static validateId(id: unknown): number {
    if (!id) throw new Error('id is required');
    return id as number;
  }

  private static validateName(name: unknown): string {
    if (!name) throw new Error('name is required');
    return name as string;
  }

  private static validateQuantity(quantity: unknown): number {
    if (quantity === undefined) throw new Error('quantity is required');
    return quantity as number;
  }

  private static parseCreatedAt(value: unknown): Date {
    if (!value) throw new Error('createdAt is required');
    const date = new Date(value as string);
    if (isNaN(date.getTime())) throw new Error('createdAt must be a valid date');
    return date;
  }

  static fromObject(obj: { [key: string]: any }): FruitEntity {
    const { id, name, quantity, createdAt } = obj;
    return new FruitEntity({
      id: FruitEntity.validateId(id),
      name: FruitEntity.validateName(name),
      quantity: FruitEntity.validateQuantity(quantity),
      createdAt: FruitEntity.parseCreatedAt(createdAt),
    });
  }
}