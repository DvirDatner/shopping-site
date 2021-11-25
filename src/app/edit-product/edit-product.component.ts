import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Input() product: Product | undefined;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  onUpdateProduct(form: NgForm){
    const value = form.value;

    if (this.product) {
      const product = new Product(this.product.Id, value.title, value.price, value.description, value.imageSrc);

      this.productsService.updateProduct(product);
    }
  }
}
