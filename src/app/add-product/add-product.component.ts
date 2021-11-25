import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  onAddProduct(form: NgForm) {
    const value = form.value;

    const product = new Product(0, value.title, value.price, value.description, value.imageSrc);

    this.productsService.addProduct(product);
  }

}
