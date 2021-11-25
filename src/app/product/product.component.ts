import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product | undefined;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}

  onAddToCart() {
    if (this.product) {
      this.shoppingCartService.addProduct(this.product);
    }
  }
}
