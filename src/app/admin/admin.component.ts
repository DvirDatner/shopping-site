import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();

    this.productsService.productsUpdated.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  onProductDelete(id: number) {
    this.productsService.deleteProduct(id);
  }

}
