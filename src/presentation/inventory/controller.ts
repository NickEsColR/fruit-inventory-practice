import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

interface FruitInventory {
  id: string
  name: string
  quantity: number
}

const inventory: FruitInventory[] = [
  { id: '1', name: 'Apple', quantity: 100 },
  { id: '2', name: 'Banana', quantity: 150 },
  { id: '3', name: 'Orange', quantity: 200 },
]

export class InventoryController {
  constructor() { }

  public getInventory(req: Request, res: Response) {
    return res.json(inventory)
  }

  public getFruitById(req: Request, res: Response) {
    const id = req.params.id;

    const fruit = inventory.find(f => f.id === id);

    (fruit)
      ? res.json(fruit)
      : res.status(404).json({ error: 'Fruit not found' })
  }

  public createFruit(req: Request, res: Response) {
    const { name, quantity } = req.body;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name is required and must be a string' });
    }
    const quantity_value = +quantity;
    if (isNaN(quantity_value) || quantity_value < 0) {
      return res.status(400).json({ error: 'Quantity is required and must be a non-negative number' });
    }
    const newFruit: FruitInventory = {
      id: uuidv4(),
      name,
      quantity: quantity_value
    };
    inventory.push(newFruit);
    return res.status(201).json(newFruit);
  }

  public updateFruit(req: Request, res: Response) {
    const id = req.params.id;
    const fruit = inventory.find(f => f.id === id);
    if (!fruit) return res.status(404).json({ error: 'Fruit not found' });

    const { name, quantity } = req.body;

    fruit.name = name || fruit.name;
    const quantity_value = +quantity;
    if (!isNaN(quantity_value) && quantity_value >= 0) {
      fruit.quantity = quantity_value;
    }
    return res.json(fruit);
  }

  public deleteFruit(req: Request, res: Response) {
    const id = req.params.id;
    const fruit = inventory.find(f => f.id === id);
    if (!fruit) return res.status(404).json({ error: 'Fruit not found' });

    inventory.splice(inventory.indexOf(fruit), 1);
    return res.status(204).send();
  }
}
