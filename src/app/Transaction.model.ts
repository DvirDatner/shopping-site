export class Transaction {
    public Id: number;
    public ProductId: number;
    public Amount: number;
    public Date: Date;

    constructor(id: number = 0, productId: number, amount: number, date: number = Date.now()) {
        this.Id = id;
        this.ProductId = productId;
        this.Amount = amount;
        this.Date = new Date(date);
    }
}