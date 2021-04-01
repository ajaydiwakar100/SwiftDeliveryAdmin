import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SettingService } from '../setting/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  submitted = false;
  outletRadiusSelected: Boolean = false;
  outletConvienceSelected: Boolean = false;
  
  timeoutSelected: Boolean = false;
  showRatingPopupAfterSelected: Boolean = false;
  radius: String;
  convience: String;
  outletRadius : string;
  timeout: String;
  showRatingPopupAfter: String;
  user: any;
  other: boolean;
  radiusSelected: Boolean = false;
  ConvienceSelected: Boolean = false;
  s2_level: String;

  constructor(
    private fb: FormBuilder,
    private settingService: SettingService
  ) { }

  settingForm: FormGroup;

  ngOnInit() {    this.user = JSON.parse(sessionStorage.getItem('is_edit'))
  if( this.user == 1){
    this.other = true;
  }if(this.user == 0){
    this.other =false;
  }
    this.settingForm = this.fb.group({
      outletRadius: [],
      resendOtpTime: []
    });

    this.settingService.getSetting().subscribe(
      response => {
        this.settingForm = new FormGroup({
          outletRadius: new FormControl(response.body['outletRadius']),
          resendOtpTime: new FormControl(response.body['resendOtpTime']),
          showRatingPopupAfter: new FormControl(response.body['showRatingPopupAfter']),
          radius: new FormControl(response.body['radius']),
          convience : new FormControl(response.body['convience'])
          
        });
        this.outletRadius = response.body['outletRadius'];
        this.timeout = response.body['resendOtpTime'];
        this.showRatingPopupAfter = response.body['showRatingPopupAfter'];
        this.radius = response.body['radius'];
        this.convience = response.body['convience'];
      },
      error => {
        console.log(error);
      }
    );
  }

  editOutletRadius() {

    this.outletRadiusSelected = true;
  }

    
  saveOutletRadius() {

    const formData = this.settingForm.value;

    const changeStatus = {settingKey: 'outletRadius', settingValue: formData.outletRadius};

    this.settingService.saveSetting(changeStatus).subscribe(
      response => {

        Swal({
          title: 'Success',
          text: 'Outlet Radius Updated',
          type: 'success',
          confirmButtonText: 'Ok',
        });

        this.radius = formData.outletRadius;
      },
      error => {
        console.log(error);
      }
    );

    this.outletRadiusSelected = false;

  }

  editResendOtpTimeout() {

    this.timeoutSelected = true;
  }

  saveResendOtpTimeout() {

    const formData = this.settingForm.value;

    const changeStatus = {settingKey: 'resendOtpTime', settingValue: formData.resendOtpTime};

    this.settingService.saveSetting(changeStatus).subscribe(
      response => {

        Swal({
          title: 'Success',
          text: 'Resend Otp Time Updated',
          type: 'success',
          confirmButtonText: 'Ok',
        });

        this.timeout = formData.resendOtpTime;
      },
      error => {
        console.log(error);
      }
    );

    this.timeoutSelected = false;

  }

  saveShowRatingPopup() {

    const formData = this.settingForm.value;

    const changeStatus = {settingKey: 'showRatingPopupAfter', settingValue: formData.showRatingPopupAfter};

    this.settingService.saveSetting(changeStatus).subscribe(
      response => {

        Swal({
          title: 'Success',
          text: 'showRatingPopup Time Updated',
          type: 'success',
          confirmButtonText: 'Ok',
        });

        this.showRatingPopupAfter = formData.showRatingPopupAfter;
      },
      error => {
        console.log(error);
      }
    );

    this.showRatingPopupAfterSelected = false;

  }
  editShowRatingPopup() {

    this.showRatingPopupAfterSelected = true;
  }

  editRadius() {

    this.radiusSelected = true;
  }

  saveRadius() {

    const formData = this.settingForm.value;

    var data = formData.radius

    const changeStatus = {settingKey: 'radius', settingValue: formData.radius};

    this.saveLevel(data)

    this.settingService.saveSetting(changeStatus).subscribe(
      response => {

        Swal({
          title: 'Success',
          text: 'Radius Updated',
          type: 'success',
          confirmButtonText: 'Ok',
        });

        this.radius = formData.radius;
      },
      error => {
        console.log(error);
      }
    );

    this.radiusSelected = false;

  }

  editConvience() {

    this.ConvienceSelected = true;
  }

  saveConvience() {

    const formData = this.settingForm.value;

    var data = formData.convience

    const changeStatus = {settingKey: 'convience', settingValue: formData.convience};

    this.saveLevel(data)

    this.settingService.saveSetting(changeStatus).subscribe(
      response => {

        Swal({
          title: 'Success',
          text: 'convience fee Updated',
          type: 'success',
          confirmButtonText: 'Ok',
        });

        this.convience = formData.convience;
      },
      error => {
        console.log(error);
      }
    );

    this.ConvienceSelected = false;

  }

  saveLevel(data) {

    if(data < 2){
      this.s2_level = '12';
    }else if(data >= 2 && data <= 5){
      this.s2_level = '11';
    }else if(data >= 6 && data <= 10){
      this.s2_level = '10';
    }else if(data >= 11 && data <= 20){
      this.s2_level = '09';
    }else if(data >= 21 && data <= 39){
      this.s2_level = '08';
    }else if(data >= 40 && data <= 78){
      this.s2_level = '07';
    }else if(data >= 79 && data <= 156){
      this.s2_level = '06';
    }else if(data >= 157 && data <= 315){
      this.s2_level = '05';
    }else if(data >= 316 && data <= 636){
      this.s2_level = '04';
    }else if(data >= 637 && data <= 1310){
      this.s2_level = '03';
    }else if(data >= 1311 && data <= 2489){
      this.s2_level = '02';
    }else if(data >= 2490 && data <= 5004){
      this.s2_level = '01';
    }else if(data >= 5005){
      this.s2_level = '00';
    } else{
      this.s2_level = '00';
    }

    const changeLevel = {settingKey: 'S2_LEVEL', settingValue: this.s2_level};

    this.settingService.saveSetting(changeLevel).subscribe(
      response => {
      },
      error => {
        console.log(error);
      }
    );


  }
}
