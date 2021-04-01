import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { OrderList } from './order-list.model';
import { OrderPreviousList } from './order-previous-list.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../localisation/localisation';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderList: OrderList[];
  order: any;
  pages: any;
  page = 1;
  success: String = null;
  itemsPerPage: Number = 10;
  pagePrevious = 1;
  orderPreviousList: OrderPreviousList[];
  orderId: string;
  deliveryBoysList: string;
  status = 1;
  search_key: string;
  search_pages: number;
  accessToken: any;
  preparation_time: Number;
  confirm_message: String;
  currentOrderId: String;
  approvingOrder: Boolean;
  invalidPreparationTime: Boolean;
  orderStatusFormSubmitted: Boolean;

  constructor(
    private orderService: OrderService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.orderService.getOutletsOrderList(this.page).subscribe (
      response => { 

         this.orderList = response;
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.orderService.getOrderPage(this.page).subscribe(
      response => {

        this.pages = response.body['totalPage'] * 10;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.orderService.getOutletsOrderPreviousList(this.pagePrevious).subscribe (
      response => { 

         this.orderPreviousList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.orderService.getPreviousOrderPage(this.pagePrevious).subscribe(
      response => {

        this.pagePrevious = response.body['totalPage'] * 10;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  getOrder(page) {
    this.orderService.getOutletsOrderList(page).subscribe(
      response => {

        this.orderList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  getOrderPrevious(page) {

    this.orderService.getOutletsOrderPreviousList(page).subscribe(
      response => {

        this.orderPreviousList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  confirmStatus(orderId) {
    this.currentOrderId = orderId;

    Swal({
      title: localisation.deleteTitle,
      text: localisation.confirmOrderText,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: localisation.confirmOrderButton,
      cancelButtonText: localisation.rejectOrderButton
    }).then((result) => {
      this.invalidPreparationTime = false;
      this.preparation_time = null;
      this.confirm_message = '';
      if (result.value) {
        this.approvingOrder = true;
        document.getElementById("openConfirmOrderModal").click();

      } else if (result.dismiss === Swal.DismissReason.cancel) {

        this.approvingOrder = false;
        document.getElementById("openConfirmOrderModal").click();
      }
    });

  }

  updateOrderStatus() {
    this.orderStatusFormSubmitted = true;
    if (this.currentOrderId) {

      if (this.approvingOrder) {
        if (!this.preparation_time || this.preparation_time < 0) {
          this.invalidPreparationTime = true;
          this.orderStatusFormSubmitted = false;
          return false;
        }

        const confirmDate = {orderId: this.currentOrderId, orderStatus: 1, isConfirmed: 1, orderReadytime: this.preparation_time + ' mins', orderComment: this.confirm_message};

        this.orderService.confirmOrder(confirmDate).subscribe(
          res => {

            this.orderStatusFormSubmitted = false;
            if (res.body['error'] === 'false') {
              Swal({
                title: localisation.confirmedText,
                text: localisation.confirmedMessage,
                type: 'success',
                timer: 1000,
                showConfirmButton: false
              });
              this.currentOrderId = '';
              document.getElementById('openConfirmOrderModal').click();

            } else {
              Swal(
                localisation.confirmedErrorText,
                localisation.confirmedErrorMessage,
                'warning'
              );
            }

            this.getOrder(this.page);

          },
          err => {
            this.router.navigateByUrl('/serverError');
          }
        );
      } else{
        const confirmDate = {orderId: this.currentOrderId, orderStatus: 0, isConfirmed: 0, orderComment: this.confirm_message};

        this.orderService.confirmOrder(confirmDate).subscribe(
          res => {

            this.orderStatusFormSubmitted = false;

            if (res.body['error'] === 'false') {
              Swal({
                title: localisation.rejectedText,
                text: localisation.rejectedMessage,
                type: 'warning',
                timer: 1000,
                showConfirmButton: false
              });
              this.currentOrderId = '';
              document.getElementById('openConfirmOrderModal').click();

            } else {
              Swal(
                localisation.rejectedErrorText,
                localisation.rejectedErrorMessage,
                'warning'
              );
            }

            this.getOrder(this.page);

          },
          err => {
            this.router.navigateByUrl('/serverError');
          }
        );
      }
    }
  }

  public setintervalid = setInterval(() => {
  this.accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
    if (this.accessToken) {
      this.getOrder(this.page);
    }
  }, 25000);

  listDeliveryBoys(orderId) {
    this.orderId = orderId;
    const date = {orderId: orderId};
    this.orderService.getDeliveryBoysList(date).subscribe(
      response => {

        const deliveryBoysList = response.body['listStaffDetails'];
this.deliveryBoysList = deliveryBoysList;
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }


  deliveryBoyDetails(data) {
    const confirmDate = {orderId: this.orderId, staffId: data.id, name: data.name, os: data.os,deviceToken: data.deviceToken};
    let that = this;
    Swal({
      title: 'Are you sure?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, assign it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function(isConfirm) {
      if (isConfirm.value === true) {

        that.orderService.assigndeliveryBoy(confirmDate).subscribe(
          res => {
              // this.router.navigateByUrl('/orderList');
              that.router.navigate(['/orderList']);
              const data = 1;
              that.getOrder(data);
          },
          err => {
            console.log(err);
          }
        );
        Swal(
          'Assigned!',
          'success'
        );
      } else if (isConfirm.dismiss) {
        Swal(
          'Cancelled',
          '',
          'error'
        );
      } else {
        // Esc, close button or outside click
        // isConfirm is undefined
      }
    })
  this.router.navigateByUrl('/orderList');
  }

  Search(params) {
    this.search_key = params;
    if (!params) {
   this.status = 1;
   this.getOrder(this.page);
    } else {
   this.status = 2;
     var data = {
       key: this.search_key,
       pageNumber: 1
     };
     this.orderService.searchOrder(data).subscribe(
      res => {
        this.orderList = res.body['listOrders'];
        this.search_pages = res.body['totalPage'] * 10;
    
      },
      err => {
        console.log(err);
      }
    );
    }
   }
   
   searchOrder(params) {
    this.status = 2;
      var data = {
        key: this.search_key,
        pageNumber: params
      };
      this.orderService.searchOrder(data).subscribe(
       res => {
         this.orderList = res.body['listOrders'];
         this.search_pages = res.body['totalPage'] * 10;
       },
       err => {
         console.log(err);
       });
    }

}
