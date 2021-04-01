import { Component, OnInit, destroyPlatform } from '@angular/core';
import { MailService } from '../mail.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-order-add-mail',
  templateUrl: './order-add-mail.component.html',
  styleUrls: ['./order-add-mail.component.css']
})
export class OrderAddMailComponent implements OnInit {

  templateId: any = null;
  public editorValue: String = '';
  mailToken: any;

  constructor(
    private mailService: MailService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  templateForm: FormGroup;

  ngOnInit() {

    this.route.params.subscribe( params => this.templateId = params.id );

    this.templateForm = this.fb.group({
      templateName: ['', Validators.required],
      template: ['', Validators.required],
    });

    this.templateForm = new FormGroup({
      templateName: new FormControl(''),
      template: new FormControl(),
    });

    if (this.templateId) {

      this.mailService.getEmailTemplate(this.templateId).subscribe(
        response => {
            this.templateForm = new FormGroup({
              templateName: new FormControl(response.body['mail'][0]['templateName']),
              template: new FormControl(response.body['mail'][0]['template']),
            });
        },
        err => {
          this.router.navigateByUrl('/serverError');
        }
      );
    }

    this.mailService.getMailTokenSignup().subscribe(
      response => {

        if (response.body['error'] === 'false') {
          this.mailToken = response.body['mailTokens']['Token'];

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

  onSubmit() {
    const mailForm = this.templateForm.value;

    if (this.templateId) {

      const mailDate = { templateId: this.templateId, template: mailForm.template, templateName: mailForm.templateName };

      this.mailService.updateEmailTemplate(mailDate).subscribe(
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
              this.router.navigateByUrl('/orderMail');
            });
          }

        },
        error => {
          this.router.navigateByUrl('/serverError');
        }
      );
    } else {
      const mailDate = { template: mailForm.template, templateName: mailForm.templateName, key: 'signup', status: 1 };

      this.mailService.addEmailTemplate(mailDate).subscribe(
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
              this.router.navigateByUrl('/orderMail');
            });
          }

        },
        error => {
          this.router.navigateByUrl('/serverError');
        }
      );
    }

  }

  ngOnDestroy() {

  }

}
