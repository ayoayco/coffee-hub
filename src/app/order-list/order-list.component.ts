import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../shared/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  coffeeOrders = [];

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.ordersService.listCoffeeOrders()
      .subscribe(res => {
        this.coffeeOrders = res;
        console.log('Fetched coffee orders...', res);
      }, err => {
        console.error(err);
      });
  }

  markCompleted(order) {
    this.ordersService.markOrderAsCompleted(order);
    console.log('Marking order as completed.', order);
  }

  deleteOrder(order) {
    this.ordersService.deleteCoffeeOrder(order);
    console.log('Deleting order.', order);
  }

}
