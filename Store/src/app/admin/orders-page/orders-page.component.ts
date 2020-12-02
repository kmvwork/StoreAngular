import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "../../shared/order.service";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders = []
  pSub: Subscription
  rSub: Subscription


  constructor(
    private orderServe: OrderService
  ) {
  }

  ngOnInit(): void {
    this.pSub = this.orderServe.getAll().subscribe(orders => {
      this.orders = orders
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if(this.rSub) {
      this.rSub.unsubscribe()
    }
  }

  remove(id) {
    this.rSub = this.orderServe.remove(id).subscribe(()=> {
      this.orders = this.orders.filter(order => order.id !== id)
    })
  }

}
