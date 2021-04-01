import { Component, OnInit } from '@angular/core';
import { BannerService } from './banner.service';
import { BannerList } from './banner-list.model';
import { Banner } from './banner.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../localisation/localisation';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  providers: [ BannerService ],
})
export class BannerComponent implements OnInit {

  bannerList: BannerList[];
  banner: Banner;
  pages: any;
  page = 1;
  success: String = null;
  itemsPerPage: Number = 10;

  constructor(
    private bannerService: BannerService,
    private router: Router
  ) { }

  ngOnInit() {

    this.bannerService.getbannerList(this.page).subscribe(
      response => {

         this.bannerList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.bannerService.getbanner(this.page).subscribe(
      response => {

        this.banner = new Banner(response.body['error'], response.body['errorMessage'], response.body['banners']['total']);

        this.pages = this.banner['totalPage'];

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  getbanner(page) {

    this.bannerService.getbannerList(page).subscribe(
      response => {

        this.bannerList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  editBanner(bannerId) {

    localStorage.removeItem('editbanner');
    localStorage.setItem('editbanner', bannerId.toString());
    this.router.navigate(['/bannerAdd']);

  }

  addBanner() {
    localStorage.removeItem('editbanner');
    this.router.navigate(['/bannerAdd']);
  }

  deleteBanner(bannerId) {

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

        this.bannerService.deleteBanner(bannerId).subscribe(
          res => {

            if (res.body['error'] === 'false') {
              Swal({
                title: localisation.deletedText,
                text: localisation.deletedMessage,
                type: 'success',
                showConfirmButton: false,
                timer: 1000
              });

              this.bannerList = this.bannerList.filter(bannerList => bannerList.bannerId !== bannerId);

              this.getbanner(this.page);
            } else {
              Swal({
                title: localisation.deletedErrorText,
                text: localisation.deletedErrorMessage,
                type: 'warning',
                showConfirmButton: false,
                timer: 1000
              });
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
