import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {
  stripeSelected: Boolean = false;
  make:boolean = false;
  make1:boolean= false;
  codSelected: Boolean = false;
  stripe: Number;
  cod: number;
  en: boolean = true;
  enab: number =1;
  enabl: number = 1;
  user: number;
  other: boolean;
 
  constructor(
    private integrationService: IntegrationService
  ) { }
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('is_edit'))
    if( this.user == 1){
      this.other = true;
    }if(this.user == 0){
      this.other =false;
    }
    
    this.integrationService.getIntegrationSettings().subscribe(
      response => {
        // this.selectedSmsGateway = response.body['smsGateway'][0]['name'];
        response.body['paymentGateWay'].forEach( result => {
          if ( result.isSelected === 1 && result.name === 'CashOnDelivery' ) {
            this.codSelected = true;
           // this.enab = 0
          }
          if ( result.isSelected === 1 && result.name === 'Card') {
            this.stripeSelected = true;
            this.stripe = 1;
            
          }
          if ( result.name === 'CashOnDelivery' && result.is_default == 1 ) {
            //this.codSelected = true;
            this.enab = 0
            this.make1 = true;
          }
          else if ( result.name === 'Card' &&  result.is_default == 1 ) {
            this.enabl = 0
            this.make = true;
            // this.stripeSelected = true;
            // this.stripe = 1;
            
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  default(settingType, settingKey){
    
  
    const changeStatus = {settingType: settingType, settingKey: settingKey, status: 1};
    this.integrationService.makedefault(changeStatus).subscribe(
      response => {
        if (response.body['error'] === 'false') {
          Swal({
            title: 'Success',
            text: settingKey + ' is a Default Option Now',
            type: 'success',
            confirmButtonText: 'Ok',
          });
          window.location.reload();
        }
       
      },
      error => {
        console.log(error);
      }
      
    );
        // if (settingKey === 'cod') {
    //   this.cod = 1;
    // }
    // if (settingKey === 'stripe') {
    //   this.stripe = 1;
    // }
  
  } 
  radioSelected(status, settingType, settingKey,) {
    if (status === true ) {
      const changeStatus = {settingType: settingType, settingKey: settingKey, status: 1};
      this.integrationService.changeStatus(changeStatus).subscribe(
        response => {
          if (response.body['error'] === 'false') {
            Swal({
              title: 'Success',
              text: 'Enabled Payment Gate Way',
              type: 'success',
              confirmButtonText: 'Ok',
            });
          }
        },
        error => {
          console.log(error);
        }
      );
      if (settingKey === 'cod') {
        this.cod = 1;
      }
      if (settingKey === 'stripe') {
        this.stripe = 1;
      }
    } else {
      const changeStatus = {settingType: settingType, settingKey: settingKey, status: 0};
      this.integrationService.changeStatus(changeStatus).subscribe(
        response => {
          if (response.body['error'] === 'false') {
            Swal({
              title: 'Success',
              text: 'Disabled Payment Gate Way',
              type: 'success',
              confirmButtonText: 'Ok',
            });
          }
        },
        error => {
          console.log(error);
        }
      );
    
      if (settingKey === 'stripe') {
        this.stripe = 0;
      }
    }
  }
}
