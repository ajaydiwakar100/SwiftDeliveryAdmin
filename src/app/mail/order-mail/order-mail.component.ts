import { Component, OnInit } from '@angular/core';
import { MailService } from '../mail.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-mail',
  templateUrl: './order-mail.component.html',
  styleUrls: ['./order-mail.component.css']
})
export class OrderMailComponent implements OnInit {

  orderMailList: any;
  selected: any;
  mailToken: any;

  constructor(
    private mailService: MailService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.mailService.getRegisterMailList().subscribe(
      response => {

        if (response.body['error'] === 'false') {
          this.orderMailList = response.body['mail']['order'];

        } else {
          Swal({
            title: 'Error',
            text: response.body['errorMessage'],
            type: 'error',
            confirmButtonText: 'Ok',
          });
        }

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

  updateStatus(key, status, templateId) {

    const statusData = {key: key, status: status, templdateId: templateId};

    this.mailService.updateStatus(statusData).subscribe(
      response => {

        if (response.body['error'] === 'false') {
          Swal({
            title: 'Success',
            text: response.body['errorMessage'],
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

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

}
