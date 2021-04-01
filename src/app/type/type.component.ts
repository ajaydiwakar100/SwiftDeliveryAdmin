import { Component, OnInit } from '@angular/core';
import { CuisinService } from './type.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { localisation } from 'src/localisation/localisation';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  page = 1;
  cuisinList: any;
  pages: any;
  constructor(  private cuisinService: CuisinService,
    private router: Router) { }

  ngOnInit() {
    this.cuisinService.gettype().subscribe(
      response => {
        console.log(response)
         this.cuisinList = response.body['data'];
        // this.pages = response.body['totalPage'] * 10;
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }
  deletetype(cuisinId) {

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

        const cousineDelete = {id: cuisinId};

        this.cuisinService.deletetype(cousineDelete).subscribe(
          res => {

            this.cuisinList = this.cuisinList.filter(cuisinList => cuisinList.cuisinesId !== cuisinId);

            if (res.body['error'] === 'false') {
              Swal(
                localisation.deletedText,
                localisation.deletedMessage,
                'success'
              );
              this.cuisinService.gettype().subscribe(
                response => {
                  
                   this.cuisinList = response.body['data'];
                  // this.pages = response.body['totalPage'] * 10;
                },
                err => {
                  this.router.navigateByUrl('/serverError');
                }
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
