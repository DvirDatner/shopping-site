import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage.service';
import { Product } from '../product.model';
import { Transaction } from '../Transaction.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  transactions: Transaction[] = [];
  topFive: { name: string; amount: number }[] = [];
  topFiveUnique: { name: string; amount: number }[] = [];
  pastFive: { date: string; sum: number }[] = [];

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.dataStorageService
      .getTransactions()
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;

        this.calculateTopFive();
        this.calculateTopFiveUnique();
        this.calculatePastFive();
      });
  }

  calculateTopFive() {
    let myMap = new Map();

    this.transactions.forEach((t) => {
      if (myMap.has(t.ProductId)) {
        myMap.set(t.ProductId, t.Amount + myMap.get(t.ProductId));
      } else {
        myMap.set(t.ProductId, t.Amount);
      }
    });

    var mapAsc = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));

    mapAsc.forEach((amount, productId) => {
      this.dataStorageService.getProduct(productId).subscribe((product) => {
        const temp = { name: product.Title, amount: amount };
        this.topFive.push(temp);
        this.topFive = this.topFive.sort((a, b) => b.amount - a.amount);
      });
    });
  }

  calculateTopFiveUnique() {
    let myMap = new Map();

    this.transactions.forEach((t) => {
      if (myMap.has(t.ProductId)) {
        myMap.set(t.ProductId, myMap.get(t.ProductId) + 1);
      } else {
        myMap.set(t.ProductId, 1);
      }
    });

    var mapAsc = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));

    mapAsc.forEach((amount, productId) => {
      this.dataStorageService.getProduct(productId).subscribe((product) => {
        const temp = { name: product.Title, amount: amount };
        this.topFiveUnique.push(temp);
        this.topFiveUnique = this.topFiveUnique.sort(
          (a, b) => b.amount - a.amount
        );
      });
    });
  }

  calculatePastFive() {
    this.dataStorageService
      .getPastFiveTransactions()
      .subscribe((transactions: Transaction[]) => {
        let myMap = new Map();

        transactions.forEach((t) => {
          let day = new Date(t.Date).toLocaleDateString();
          if (myMap.has(day)) {
            myMap.set(day, t.Amount + myMap.get(day));
          } else {
            myMap.set(day, t.Amount);
          }
        });

        var mapAsc = new Map([...myMap.entries()].sort((a, b) => a[0] - b[0]));

        mapAsc.forEach((sum, day) => {
          const temp = {date: day, sum: sum};
          this.pastFive.push(temp);
        });
      });
  }
}
