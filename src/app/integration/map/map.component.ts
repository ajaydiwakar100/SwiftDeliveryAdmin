import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { IntegrationService } from '../integration.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  submitted = false;
  errorMessage: String;
  androidkey: String;
  ioskey: String;
  user: number;
  other: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private integrationService: IntegrationService
  ) { }

  mapForm: FormGroup;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('is_edit'))
    if( this.user == 1){
      this.other = true;
    }if(this.user == 0){
      this.other =false;
    }
    this.mapForm = this.fb.group({
      androidMapKey: ['', Validators.required],
      iosMapKey: ['', Validators.required]
    });

    this.integrationService.getMapKey().subscribe(
      response => {
        this.mapForm = new FormGroup({
          androidMapKey: new FormControl(response.body['androidMapkey']),
          iosMapKey: new FormControl(response.body['iosMapkey']),
        });
      },
      error => {
        console.log(error);
      }
    );

  }

  onSubmit() {
    this.submitted = true;

    if (this.mapForm.invalid) {

      this.errorMessage = 'All Fields are Mandatory';

      return;
    }

    const mapApiData = this.mapForm.value;

    this.integrationService.updateMapKey(mapApiData).subscribe(
      response => {

        if (response.body['error'] === 'false') {
          Swal({
            title: 'Success',
            text: 'Api Keys Saved',
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
