import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { UserDetail } from './user-detail.model';
import { UserAddress } from './user-address.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})

export class UserAddComponent implements OnInit {

  submitted = false;
  userDetail: UserDetail;
  userAddress: UserAddress[] = new Array();
  userAdd: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
    ) { }

  userForm: FormGroup;
  itemname: any;

  ngOnInit() {

    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      countryCode: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mobile: ['', Validators.required],
      itemRows: this.fb.array([this.initItemRows()]) // here
    });

    this.userAdd = this.userForm.controls;
  }

  get f() { return this.userForm.controls; }

  onSubmit() {
    this.userAddress = new Array();

    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    let userData = this.userForm.value;

    userData.itemRows.forEach(address => {

      let userAddress = new UserAddress(address.addressType, address.flatNumber, address.address, address.landmark);

      this.userAddress.push(userAddress)

    });

    let userAddress = JSON.stringify(this.userAddress);

    this.userDetail = new UserDetail(userData.userName, userData.email, userData.countryCode, userData.mobile, userData.password, userAddress);
    // console.log(this.userDetail);

    this.userService.addUser(this.userDetail).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }

    );

  }

  initItemRows() {
    return this.fb.group({
        // list all your form controls here, which belongs to your form array
        flatNumber: [''],
        address: [''],
        landmark: [''],
        addressType: ['']
    });
  }

  addNewRow() {
    // control refers to your formarray
    const control = <FormArray>this.userForm.controls['itemRows'];
    // add new formgroup
    control.push(this.initItemRows());
  }

  deleteRow(index: number) {
      // control refers to your formarray
      const control = <FormArray>this.userForm.controls['itemRows'];
      // remove the chosen row
      control.removeAt(index);
  }


}
