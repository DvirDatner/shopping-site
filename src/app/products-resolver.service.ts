import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { tap } from "rxjs/operators";

import { DataStorageService } from "./data-storage.service";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";

@Injectable({providedIn: 'root'})
export class ProductsResolverService implements Resolve<Product[]> {
    constructor(private dataStorageService: DataStorageService, private productsService: ProductsService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.dataStorageService.getProducts().pipe(
            tap((products: Product[]) => {
                this.productsService.setProducts(products);
        }));
    }
}