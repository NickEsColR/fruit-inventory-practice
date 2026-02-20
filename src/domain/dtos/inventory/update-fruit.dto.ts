export class UpdateFruitDto {
  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly quantity?: number,
  ) { }

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.name) returnObj.name = this.name;
    const quantity_value = Number(this.quantity);
    if (quantity_value >= 0 && !isNaN(quantity_value)) returnObj.quantity = quantity_value;
    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateFruitDto?] {
    const { id, name, quantity } = props;
    if (!id || isNaN(Number(id))) return ['ID is required and must be a number', undefined];
    if (quantity !== undefined) {
      const quantity_value = Number(quantity);
      if (isNaN(quantity_value) || quantity_value < 0) return ['Quantity must be a positive number', undefined];
    }
    return [undefined, new UpdateFruitDto(Number(id), name, quantity)];
  }
}