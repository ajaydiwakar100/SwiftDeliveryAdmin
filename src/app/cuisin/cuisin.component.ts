import { Component, OnInit } from '@angular/core';
import { CuisinService } from './cuisin.service';
import { CuisinList } from './cuisin-list.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../localisation/localisation';

@Component({
  selector: 'app-cuisin',
  templateUrl: './cuisin.component.html',
  styleUrls: ['./cuisin.component.css'],
  providers: [ CuisinService ],
})
export class CuisinComponent implements OnInit {

  cuisinList: CuisinList[];
  pages: any;
  page = 1;
  success: String = null;
  itemsPerPage: Number = 10;

  constructor(
    private cuisinService: CuisinService,
    private router: Router
  ) { }

  ngOnInit() {

    this.cuisinService.getcuisinList(this.page).subscribe(
      response => {

         this.cuisinList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.cuisinService.getcuisin(this.page).subscribe(
      response => {

        this.pages = response.body['totalPage'] * 10;
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  getcuisin(page) {

    this.cuisinService.getcuisinList(page).subscribe(
      response => {

        this.cuisinList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.cuisinService.getcuisin(page).subscribe(
      response => {

        this.pages = response.body['totalPage'] * 10;
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  deleteCuisin(cuisinId) {

    Swal({
      title: localisation.deleteTitle,
      text: localisation.deleteText,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: localisation.deleteConfirmButton
    }).then((result) => {
      if (result.value) {

        const cousineDelete = {cuisinesId: cuisinId};

        this.cuisinService.deletecuisin(cousineDelete).subscribe(
          res => {

            this.cuisinList = this.cuisinList.filter(cuisinList => cuisinList.cuisinesId !== cuisinId);

            if (res.body['error'] === 'false') {
              Swal(
                localisation.deletedText,
                localisation.deletedMessage,
                'success'
              );
            } else {
              Swal(
                localisation.deletedErrorText,
                localisation.deletedErrorMessage,
                'warning'
              );
            }

          },
          err => {
            this.router.navigateByUrl('/serverError');
          }
        );
      }
    });

  }

}
