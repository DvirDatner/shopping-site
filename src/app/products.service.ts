import { EventEmitter, Injectable } from "@angular/core";
import { DataStorageService } from "./data-storage.service";
import { Product } from "./product.model";

@Injectable({providedIn: 'root'})
export class ProductsService {
    private products: Product[] = [];
    productsUpdated = new EventEmitter<Product[]>();

    constructor(private dataStorageService: DataStorageService){}

    getProducts() {
        return this.products.slice();
    }

    setProducts(products: Product[]) {
        this.products = products;
        this.productsUpdated.emit(this.products.slice());
    }

    addProduct(product: Product) {
        this.dataStorageService.addProduct(product).subscribe(products => {
            this.setProducts(products);
        });
    }

    updateProduct(product: Product) {
        this.dataStorageService.updateProduct(product).subscribe(products => {
            this.setProducts(products);
        });
    }

    deleteProduct(id: number) {
        this.dataStorageService.deleteProduct(id).subscribe(products => {
            this.setProducts(products);
        });
    }
}