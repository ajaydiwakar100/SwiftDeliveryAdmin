import { Component, OnInit } from '@angular/core';
import { LanguageService } from './language.service';
import { LanguageList } from './language-list.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../localisation/localisation';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
  providers: [LanguageService],
})
export class LanguageComponent implements OnInit {

  languageList: LanguageList[];
  pages: any;
  page = 1;
  success: String = null;
  itemsPerPage: Number = 10;

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) { }

  ngOnInit() {

    this.languageService.getlanguageList(this.page).subscribe(
      response => {

        this.languageList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.languageService.getlanguage(this.page).subscribe(
      response => {

        this.pages = response.body['totalPage'] * 10;
      },
      err => {
        this.router.navigateByUrl('/languages');
      }
    );
  }

  // getlanguage(page) {

  //   this.languageService.getlanguageList(page).subscribe(
  //     response => {

  //       this.languageList = response;

  //     },
  //     err => {
  //       this.router.navigateByUrl('/serverError');
  //     }
  //   );

  //   this.languageService.getlanguage(page).subscribe(
  //     response => {

  //       this.pages = response.body['totalPage'] * 10;
  //     },
  //     err => {
  //       this.router.navigateByUrl('/serverError');
  //     }
  //   );
  // }

  deletelanguage(languageId) {

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

        const cousineDelete = { languageesId: languageId };

        this.languageService.deletelanguage(cousineDelete).subscribe(
          res => {

            // this.languageList = this.languageList.filter(languageList => languageList.languageId !== languageId);

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
