import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: Product[] = [];
  totalPrice = () => {
    return this.products.reduce((subtotal, product) => subtotal + product.Price ,0);
  }

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.products = this.shoppingCartService.getProducts();

    this.shoppingCartService.shoppingCartUpdated.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  onPay() {
    this.shoppingCartService.sendTransaction();
  }

}
