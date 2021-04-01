import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../../localisation/localisation';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  productID: any;
  isBlocked: Number;
  orderCount : Number;

  userId: Number;
  userData: any;
  userName: String;
  email: String;
  status: Number;
  phoneNumber: String;
  userAddress: any;
  page = 1;
  orderData: any;
  pages: any;
  noOrder: String;
  noAddress: String;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.noOrder = localisation.noOrder;
    this.noAddress = localisation.noAddress;

    this.route.params.subscribe( params => this.userId = params.id );

    if (this.userId) {

      this.userService.getUser(this.userId).subscribe(
        response => {

          const userData = response['users'];

          this.isBlocked = userData.isBlocked;
          this.userName = userData.userName;
          this.email = userData.email;
          this.status = userData.status;
          this.phoneNumber = userData.countryCode + ' ' + userData.mobileNumber;

          this.userAddress = response['address'];

        },
        err => {
          this.router.navigateByUrl('/serverError');
        }
      );

      const userOrderData = { userId: this.userId, page: this.page };

      this.userService.getUserOrder(userOrderData).subscribe(
        response => {

          this.orderData = response;
          this.orderCount = this.orderData.length;

        },
        err => {
          this.router.navigateByUrl('/serverError');
        }
      );

      this.userService.getUserOrderPageNumber(userOrderData).subscribe(
        response => {

          this.pages = response.body['totalPage'];

        },
        err => {
          this.router.navigateByUrl('/serverError');
        }
      );
    }

  }

  unsuspend(status){
    var userData = {};
    this.productID = this.userId;
    userData['userId'] = this.productID;
    userData['status'] = 0;
    this.userService.updatestatus(userData).subscribe(result=>{
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Updated', 
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/userList']);
    })
  }

  suspend(status) {
    var userData = {};
    this.productID = this.userId;
    userData['userId'] = this.productID;
    userData['status'] = 1;
    this.userService.updatestatus(userData).subscribe(result=>{
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Updated', 
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/userList']);
    })
  }

  getUserOrder(page) {

    const userOrderData = { userId: this.userId, page: page };

      this.userService.getUserOrder(userOrderData).subscribe(
        response => {

          this.orderData = response;

        },
        err => {
          this.router.navigateByUrl('/serverError');
        }
      );

      this.userService.getUserOrderPageNumber(userOrderData).subscribe(
        response => {

          this.pages = response.body['totalPage'];

        },
        err => {
          this.router.navigateByUrl('/serverError');
        }
      );

  }

}
