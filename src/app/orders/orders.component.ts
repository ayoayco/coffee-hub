import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../shared/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  coffees = ['Americano', 'Flat White', 'Cappuccino', 'Latte', 'Espresso', 'Machiato', 'Mocha', 'Hot Chocolate', 'Tea'];
  coffeeOrders = [];

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.ordersService.resetForm();
  }

  addCoffee(coffee) {
    this.coffeeOrders.push(coffee);
    console.log(`add coffee: ${coffee}`);
  }

  removeCoffee(coffee) {
    const index = this.coffeeOrders.indexOf(coffee);
    if (index > -1) {
      this.coffeeOrders.splice(index, 1);
      console.log(`remove coffee: ${coffee}`);
    }
  }

  onSubmit() {
    this.ordersService.form.value.coffeeOrders = this.coffeeOrders;
    const data = this.ordersService.form.value;
    console.log('Submitting order', data);

    this.ordersService.createCoffeeOrder(data)
      .then(res => {
        console.log('Created cloud store data.', data);
        // clear form
        this.coffeeOrders = [];
        this.ordersService.resetForm();
      }, err => {
        console.error(err);
      });
  }
}
