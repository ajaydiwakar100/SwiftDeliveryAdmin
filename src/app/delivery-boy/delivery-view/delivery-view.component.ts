import { Component, OnInit, ViewChild } from '@angular/core';
import { deliveryBoyService } from '../delivery-boy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { localisation } from '../../../localisation/localisation';
import Swal from 'sweetalert2/dist/sweetalert2.js';


declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  zoom: number;
  marker?: Marker;
}

@Component({
  selector: 'app-delivery-view',
  templateUrl: './delivery-view.component.html',
  styleUrls: ['./delivery-view.component.css']
})

export class DeliveryViewComponent implements OnInit {

  productID: any;
  isBlocked: Number;

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
  documents: any;
  noAddress: String;
  tripStatus: Number;
  lattitude: any ;
  longitude: any ;
  geocoder: any;
  public location: Location = {
    lat: 13.05325201248103,
    lng: 80.24680565118813,
    marker: {
      lat: 13.05325201248103,
      lng: 80.24680565118813,
      draggable: false
    },
    zoom: 6
  };
  totalAmount: any ;
  balanceAmount: any;

  @ViewChild(AgmMap) map: AgmMap;

  constructor(
    private deliveryBoyService: deliveryBoyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.noOrder = localisation.noOrder;
    this.noAddress = localisation.noAddress;

    this.route.params.subscribe(params => this.userId = params.id);

    if (this.userId) {
      this.getDeliveryBoy();
      // this.deliveryBoyService.getDeliveryBoy(this.userId).subscribe(
      //   response => {

      //     const userData = response.body['staffDetails'];

      //     this.userName = userData.name;
      //     this.email = userData.email;
      //     this.status = userData.status;
      //     this.phoneNumber = userData.countryCode + ' ' + userData.mobileNumber;
      //     this.tripStatus = userData.tripStatus;

      //     this.orderData = response.body['orderDetails'];

      //     this.documents = response.body['documentDetails'];

      //     this.location.lat = userData.latitude;
      //     this.location.lng = userData.longitude;
      //     this.location.marker.lat = userData.latitude;
      //     this.location.marker.lng = userData.longitude;
      //     this.lattitude = userData.latitude;
      //     this.longitude = userData.longitude;
      //     console.log(this.lattitude, this.longitude);
      //   },
      //   err => {
      //     this.router.navigateByUrl('/serverError');
      //   }
      // );
    }



  }


  getDeliveryBoy() {
    this.deliveryBoyService.getDeliveryBoy(this.userId).subscribe(
      response => {

        const userData = response.body['staffDetails'];
        var currency = response.body['currency'];
        this.userName = userData.name;
        this.email = userData.email;
        this.isBlocked = userData.isBlocked;
        this.status = userData.status;
        this.phoneNumber = userData.countryCode + ' ' + userData.mobileNumber;
        this.tripStatus = userData.tripStatus;
        this.totalAmount = currency + userData.balanceAmount;
        this.balanceAmount = currency + userData.totalAmount;

        this.orderData = response.body['orderDetails'];

        this.documents = response.body['documentDetails'];

        this.location.lat = parseFloat(userData.latitude);
        this.location.lng = parseFloat(userData.longitude);
        this.location.marker.lat = parseFloat(userData.latitude);
        this.location.marker.lng = parseFloat(userData.longitude);
        this.lattitude = parseFloat(userData.latitude);
        this.longitude = parseFloat(userData.longitude);
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  getMap() {

    const removeBody1 = document.getElementById('2');
    removeBody1.classList.remove('active');
    const removeBody = document.getElementById('3');
    removeBody.classList.remove('active');
    const body = document.getElementById('1');
    body.classList.add('active');

    const body2 = document.getElementById('profile_settings');
    body2.classList.remove('active');
    const body1 = document.getElementById('home');
    body1.classList.remove('active');
    const body3 = document.getElementById('change_password_settings');
    body3.classList.add('active');

  }

  getOrder() {
    const removeBody1 = document.getElementById('2');
    removeBody1.classList.add('active');
    const removeBody = document.getElementById('3');
    removeBody.classList.remove('active');
    const body = document.getElementById('1');
    body.classList.remove('active');

    const body2 = document.getElementById('profile_settings');
    body2.classList.add('active');
    const body1 = document.getElementById('home');
    body1.classList.remove('active');
    const body3 = document.getElementById('change_password_settings');
    body3.classList.remove('active');

  }

  getDocument() {

    const removeBody1 = document.getElementById('2');
    removeBody1.classList.remove('active');
    const removeBody = document.getElementById('3');
    removeBody.classList.add('active');
    const body = document.getElementById('1');
    body.classList.remove('active');

    const body2 = document.getElementById('profile_settings');
    body2.classList.remove('active');
    const body1 = document.getElementById('home');
    body1.classList.add('active');
    const body3 = document.getElementById('change_password_settings');
    body3.classList.remove('active');

  }

  unsuspend(status){
    var userData = {};
    this.productID = this.userId;
    userData['id'] = this.productID;
    userData['status'] = 0;
    this.deliveryBoyService.updatestatus(userData).subscribe(result=>{
      Swal.fire({
          position: 'center',
          type: 'success',
          title: 'Updated', 
          showConfirmButton: false,
          timer: 1500
        })
      this.router.navigate(['/deliveryBoyList']);
    })
  }

  suspend(status) {
    var userData = {};
    this.productID = this.userId;
    userData['id'] = this.productID;
    userData['status'] = 1;
    this.deliveryBoyService.updatestatus(userData).subscribe(result=>{
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Updated', 
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/deliveryBoyList']);
    })
  }

}
