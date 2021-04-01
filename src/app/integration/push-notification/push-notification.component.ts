import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css']
})
export class PushNotificationComponent implements OnInit {

  firebase: Number;
  firebaseSelected: Boolean = false;
  user: number;
  other: boolean = false;

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
        console.log(response.body);

        response.body['pushNotification'].forEach( result => {

          if ( result.isSelected === 1 && result.name === 'fireBase' ) {
            this.firebaseSelected = true;
            this.firebase = 1;

          }
        });

      },
      error => {
        console.log(error);
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
          console.log(error);
        }
      );

      if (settingKey === 'FireBasekey') {

        this.firebaseSelected = true;

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
          console.log(error);
        }
      );

      if (settingKey === 'FireBasekey') {

        this.firebaseSelected = false;

      }

    }

  }

}
