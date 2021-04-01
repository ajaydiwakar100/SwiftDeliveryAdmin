import { Component, OnInit } from '@angular/core';
import { IntegrationService } from './integration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit {

  selectedSmsGateway: String;
  loginType: String;
  pushNotification: String;
  paymentGateWay: any = new Array();

  constructor(
    private integrationService: IntegrationService
  ) { }

  ngOnInit() {

    this.integrationService.getIntegrationSettings().subscribe(
      response => {
        
        // this.selectedSmsGateway = response.body['smsGateway'][0]['name'];

        response.body['smsGateway'].forEach( result => {

          if ( result.isSelected === 1 ) {
            this.selectedSmsGateway = result.name;
          }
        });

        response.body['loginType'].forEach( result => {

          if ( result.isSelected === 1 ) {
            this.loginType = result.name;
          }
        });

        response.body['pushNotification'].forEach( result => {

          if ( result.isSelected === 1 ) {
            this.pushNotification = result.name;
          }
        });

        response.body['paymentGateWay'].forEach( result => {

          if ( result.isSelected === 1 ) {
            this.paymentGateWay.push(result.name);
          }
        });

      },
      error => {
        Swal({
          title: '404',
          text: 'Internal Server Error',
          type: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }

}
