import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {


  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {

    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      //when new events are received, make the assigments to update UI for totalPrice
      data => this.totalPrice = data
    );

    //subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      //when new events are received, make the assigments to update UI for totalQuantity
      data => this.totalQuantity = data
    );
  }

}
