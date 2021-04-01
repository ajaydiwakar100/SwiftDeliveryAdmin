import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { IntegrationService } from '../../integration.service';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.css']
})
export class FirebaseComponent implements OnInit {

  submitted = false;
  errorMessage: String;
  other: boolean;
  user: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private integrationService: IntegrationService
  ) { }

  pushForm: FormGroup;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('is_edit'))
     if( this.user == 1){
       this.other = true;
     }if(this.user == 0){
       this.other =false;
     }
     
    this.pushForm = this.fb.group({
      firebaseKey: ['', Validators.required],
    });

    this.integrationService.getPushNotification().subscribe(
      response => {
        this.pushForm = new FormGroup({
          firebaseKey: new FormControl(response.body['FireBasekey']),
        });
      },
      error => {
        console.log(error);
      }
    );

  }

  onSubmit() {
    this.submitted = true;

    if (this.pushForm.invalid) {

      this.errorMessage = 'All Fields are Mandatory';

      return;
    }

    const pushData = this.pushForm.value;

    this.integrationService.updatePushNotification(pushData).subscribe(
      response => {

        if (response.body['error'] === 'false') {
          Swal({
            title: 'Success',
            text: 'Firebase Key Saved',
            type: 'success',
            confirmButtonText: 'Ok',
          });
        } else {
          Swal({
            title: 'Error',
            text: response.body['errorMessage'],
            type: 'error',
            confirmButtonText: 'Ok',
          });
        }
      }
    );

  }

}
