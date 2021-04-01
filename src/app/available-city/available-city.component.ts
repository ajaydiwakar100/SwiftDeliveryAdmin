import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AvailableCityService } from '../available-city/available-city.service';
import Swal from 'sweetalert2';
import { localisation } from '../../localisation/localisation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-available-city',
  templateUrl: './available-city.component.html',
  styleUrls: ['./available-city.component.css']
})
export class AvailableCityComponent implements OnInit {
  cityForm: FormGroup;
  submitted = false;
  countryData: any;
  cityData: any;

  constructor(
    private formBuilder: FormBuilder,
    private availableCityService: AvailableCityService,
    private router: Router
    ) { }

  ngOnInit() {

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('add-city');

    this.cityForm = this.formBuilder.group({
      countryId: ['', Validators.required],
      cityId: ['', Validators.required]
    });

    this.availableCityService.getCountry().subscribe(
      res => {
        this.countryData = res.body['countryList'];
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }

    );

  }

  onSubmit() {

    this.submitted = true;
    const cityData = this.cityForm.value;

    this.availableCityService.saveLocation(cityData).subscribe(
      response => {

        if (response.body['error'] === 'true' ) {

          Swal({
            title: 'Error',
            text: response.body['errorMessage'],
            type: 'error',
            confirmButtonText: 'Ok',
          });


        } else {

          Swal({
            title: 'Success',
            text: response.body['errorMessage'],
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then(() => {
            this.router.navigateByUrl('/dashboard');
          });
        }

      },
      error => {

      }
    );

}

  getCity(countryId) {

    this.availableCityService.getCity(countryId).subscribe(
      res => {
        this.cityData = res.body['cityList'];
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }

    );
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('add-city');
    body.classList.add('theme-orange');
  }

}
