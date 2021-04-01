import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manual-assign',
  templateUrl: './manual-assign.component.html',
  styleUrls: ['./manual-assign.component.css']
})
export class ManualAssignComponent implements OnInit {

  manualAssign: Number;
  manualAssignSelected: Boolean = false;
  test: any;
  constructor(
    private integrationService: IntegrationService
  ) { }

  ngOnInit() {

    this.integrationService.getIntegrationSettings().subscribe(
      response => {
        
        this.test = response.body;
        var data = this.test['manualAssign'];
       data.forEach( result => {

          if ( result.isSelected === 1 && result.name === 'ManualAssign' ) {
            this.manualAssignSelected = true;
            this.manualAssign = 1;

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
              text: 'Manual Assign Enabled',
              type: 'success',
              confirmButtonText: 'Ok',
            });
          }
        },
        error => {
          
        }
      );

      if (settingKey === 'ManualAssign') {

        this.manualAssignSelected = true;

      }
    } else {

      const changeStatus = {settingType: settingType, settingKey: settingKey, status: 0};

      this.integrationService.changeStatus(changeStatus).subscribe(
        response => {
          if (response.body['error'] === 'false') {
            Swal({
              title: 'Success',
              text: 'Manual Assign Disabled',
              type: 'success',
              confirmButtonText: 'Ok',
            });
          }
        },
        error => {
          
        }
      );

      if (settingKey === 'ManualAssign') {

        this.manualAssignSelected = false;

      }

    }

  }

}

