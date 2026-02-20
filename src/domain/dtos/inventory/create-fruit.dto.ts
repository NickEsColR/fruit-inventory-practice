export class CreateFruitDto {
  private constructor(
    public readonly name: string,
    public readonly quantity: number,
  ) { }

  static create(props: { [key: string]: any }): [string?, CreateFruitDto?] {
    const { name, quantity } = props;
    const quantity_value = Number(quantity);

    if (!name) return ['Name is required', undefined];
    if (isNaN(quantity_value) || quantity_value < 0) return ['Quantity must be a positive number', undefined];

    return [undefined, new CreateFruitDto(name, quantity_value)];
  }
}