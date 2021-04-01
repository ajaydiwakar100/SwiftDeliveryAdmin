import { Component, OnInit } from '@angular/core';
import { OutletService } from '../outlet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../../localisation/localisation';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-outlet-view',
  templateUrl: './outlet-view.component.html',
  styleUrls: ['./outlet-view.component.css']
})
export class OutletViewComponent implements OnInit {

  isBlocked:Number;
  outletId: Number;
  outletList: any;
  image: String;
  userName: String;
  email: String;
  phoneNumber: String;
  addressLineOne: String;
  addressLineTwo: String;
  street: String;
  area: String;
  city: String;
  state: String;
  country: String;
  zipcode: String;
  orders: any;
  status: any = 1;
  totalAmount: any ;
  balanceAmount: any;
  averageRating: number;
  productID: Number;

  constructor(
    private outletService: OutletService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {         

    this.route.params.subscribe( params => this.outletId = params.id );
    
    this.outletService.getOutletDetail(this.outletId).subscribe(
      response => {
        var currency = response.body['currency'];
         this.outletList = response.body['outlets'];
         this.image = this.outletList.image;
         this.userName = this.outletList.outletName;
         this.email = this.outletList.email;
         this.phoneNumber = this.outletList.contactNumber;
         this.addressLineOne = this.outletList.addressLineOne;
         this.addressLineTwo = this.outletList.addressLineTwo;
         this.street = this.outletList.street;
         this.area = this.outletList.area;
         this.city = this.outletList.city;
         this.state = this.outletList.state;
         this.country = this.outletList.country;
         this.zipcode = this.outletList.zipcode; 
         this.totalAmount = currency + this.outletList.totalAmount;
         this.balanceAmount = currency + this.outletList.balanceAmount;
         this.orders = response.body['orders']; 
         this.averageRating = this.outletList.averageRating;
         this.isBlocked = this.outletList.isBlocked;

         
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  unsuspend(status){
    var userData = {};
    this.productID = this.outletId;
    userData['userId'] = this.productID;
    userData['status'] = 0;
    this.outletService.updatestatus(userData).subscribe(result=>{
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Updated', 
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/outletList']);
    })
  }

  suspend(status) {
    var userData = {};
    this.productID = this.outletId;
    userData['userId'] = this.productID;
    userData['status'] = 1;
    this.outletService.updatestatus(userData).subscribe(result=>{
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Updated', 
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/outletList']);
    })
  }

}
