import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-type',
  templateUrl: './login-type.component.html',
  styleUrls: ['./login-type.component.css']
})
export class LoginTypeComponent implements OnInit {

  otpSelected: Boolean = false;
  passwordSelected: Boolean = false;

  constructor(
    private integrationService: IntegrationService
  ) { }

  ngOnInit() {
    this.integrationService.getIntegrationSettings().subscribe(
      response => {
        console.log(response.body);
        // this.selectedSmsGateway = response.body['smsGateway'][0]['name'];

        response.body['loginType'].forEach( result => {

          if ( result.isSelected === 1 && result.name === 'otpLogin' ) {
            this.otpSelected = true;

          }

          if ( result.isSelected === 1 && result.name === 'passwordLogin' ) {

            this.passwordSelected = true;
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
              text: 'Login Type Changed',
              type: 'success',
              confirmButtonText: 'Ok',
            });
          }
        },
        error => {
          console.log(error);
        }
      );
    }

  }

}
