import { EventEmitter, Injectable } from '@angular/core';
import { DataStorageService } from '../data-storage.service';
import { Product } from '../product.model';
import { Transaction } from '../Transaction.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
    private products: Product[] = [];
    private transactions: Transaction[] = [];
    shoppingCartUpdated = new EventEmitter<Product[]>();

    constructor(private dataStorageService: DataStorageService) {}

    getProducts() {
        return this.products.slice();
    }

    addProduct(product: Product) {
        this.products.push(product);
        this.addToTransactions(product);
        this.shoppingCartUpdated.emit(this.products.slice());
    }

    clearShoppingCart() {
        this.products = [];
        this.shoppingCartUpdated.emit(this.products.slice());
    }

    addToTransactions(product: Product) {
        const transIndex = this.transactions.findIndex(t => t.ProductId === product.Id);

        if (transIndex === -1) {
            const transaction = new Transaction(0, product.Id, 1);
            this.transactions.push(transaction);
        } 
        else {
            this.transactions[transIndex].Amount++;
        }
    }

    sendTransaction() {
        this.transactions.forEach(transaction => {
            this.dataStorageService.addTransaction(transaction).subscribe();
        });

        this.products = [];
        this.transactions = [];
        this.shoppingCartUpdated.emit(this.products.slice());
    }
}
