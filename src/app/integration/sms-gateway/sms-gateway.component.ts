import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sms-gateway',
  templateUrl: './sms-gateway.component.html',
  styleUrls: ['./sms-gateway.component.css']
})
export class SmsGatewayComponent implements OnInit {

  twilio: Number;
  twilioSelected: Boolean = false;

  constructor(
    private integrationService: IntegrationService
  ) { }

  ngOnInit() {

    this.integrationService.getIntegrationSettings().subscribe(
      response => {
        
        // this.selectedSmsGateway = response.body['smsGateway'][0]['name'];

        response.body['smsGateway'].forEach( result => {

          if ( result.isSelected === 1 && result.name === 'Twilio' ) {
            this.twilioSelected = true;
            this.twilio = 1;

          }
        });

      },
      error => {
        
      }
    );



  }

  radioSelected(status, settingType, settingKey) {

    if (status === true) {

      const changeStatus = {settingType: settingType, settingKey: settingKey, status: 1};

      this.integrationService.changeStatus(changeStatus).subscribe(
        response => {
          if (response.body['error'] === 'false') {
            Swal({
              title: 'Success',
              text: 'SMS Type Enabled',
              type: 'success',
              confirmButtonText: 'Ok',
            });
          }
        },
        error => {
          
        }
      );

      if (settingKey === 'Twilio') {

        this.twilioSelected = true;

      }
    } else {

      const changeStatus = {settingType: settingType, settingKey: settingKey, status: 0};

      this.integrationService.changeStatus(changeStatus).subscribe(
        response => {
          if (response.body['error'] === 'false') {
            Swal({
              title: 'Success',
              text: 'SMS Type Disabled',
              type: 'success',
              confirmButtonText: 'Ok',
            });
          }
        },
        error => {
          
        }
      );

      if (settingKey === 'Twilio') {

        this.twilioSelected = false;

      }

    }

  }

}
