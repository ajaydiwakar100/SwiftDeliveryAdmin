import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderList } from '../order-list.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../../localisation/localisation';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  orderList: OrderList[];
  order: any;
  orderId: Number;
  deliveryAddressType: String;
  deliveryAddress: String;
  orderReferenceId: String;
  orderStatus: String;
  netAmount: Number;
  userMobileNumber: String;
  userEmail: String;
  staffName: String;
  staffMobileNumber: String;
  staffeEmail: String;
  paymentname: any;
  dishes: any;
  userName: String;
  billTotals: any;
  orderSuggestions: any;
  outletEmail: String;
  OutletName: String;
  addressLineOne: String;
  addressLineTwo: String;
  prescriptionimageUrl:any;
  street: String;
  area: String;
  city: String;
  state: String;
  mobileNumber: Number;
  type: string;
  hideDeliveryDetails: boolean;
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe( params => this.orderId = params.id );

    this.orderService.getOrder(this.orderId).subscribe (
      response => {

        // console.log(response.body);

         const order = response.body['orders'];

         this.deliveryAddressType = order.deliveryAddressType;
         this.deliveryAddress = order.deliveryAddress;
         this.orderReferenceId = order.orderReferenceId;
         this.orderStatus = order.orderStatus;
         this.netAmount = order.netAmount;
         this.userMobileNumber = order.userMobileNumber;
         this.userEmail = order.userEmail;
         this.staffName = order.staffName;
         this.staffMobileNumber = order.staffMobileNumber;
         this.staffeEmail = order.staffeEmail;
         this.paymentname = order.paymentDetails['name'];
         this.dishes = order.dishes;
         this.userName = order.userName;
         this.billTotals = order.billTotals;
         this.orderSuggestions = order.orderSuggestions;
         this.outletEmail = order.outletEmail;
         this.mobileNumber = order.mobileNumber;
         this.OutletName = order.OutletName;
         this.addressLineOne = order.addressLineOne;
         this.addressLineTwo = order.addressLineTwo;
         this.street = order.street;
         this.area = order.area;
         this.city = order.city;
         this.state = order.state;
         this.prescriptionimageUrl = order.prescriptionimageUrl;
         this.type = order.type;
      },
      err => {
        // this.router.navigateByUrl('/serverError');
      }
    );
  }

}
