import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>('http://localhost:60600/products');
  }

  getProduct(id: number) {
    return this.http.get<Product[]>(`http://localhost:60600/products/${id}`);
  }

  addProduct(product: Product) {
    return this.http.post<Product[]>(
      'http://localhost:60600/products',
      product
    );
  }

  updateProduct(product: Product) {
    return this.http.put<Product[]>('http://localhost:60600/products', product);
  }

  deleteProduct(id: number) {
    return this.http.delete<Product[]>(`http://localhost:60600/products/${id}`);
  }
}
