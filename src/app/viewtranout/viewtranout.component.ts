import { Component, OnInit } from '@angular/core';
import { deliveryBoyService} from './viewtranout.service';
import { Router } from '@angular/router';
import { localisation } from 'src/localisation/localisation';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { deliveryboyList } from './viewtranout.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-viewtran',
  templateUrl: './viewtranout.component.html',
  styleUrls: ['./viewtranout.component.css']
})
export class ViewtranComponent1 implements OnInit {
 
  deliveryBoyList: deliveryboyList[];
  deliveryBoy: any;
  pages: any;
  page = 1;
  status = 1;
  search_key: any;
  search_pages: number;
  success: String = null;
  itemsPerPage: Number = 10;
  pagePrevious = 1;
  closeResult: string;
  other: any;

  constructor(
    private deliveryBoyService: deliveryBoyService,
    private router: Router, private modalService : NgbModal
  ) { }
  
  ngOnInit() {

   

    this.deliveryBoyService.getdeliveryBoyPage(this.page).subscribe(
      response => {
        console.log(response)
        this.deliveryBoyList = response.body['data'].data
        this.pages = response.body['data'].last_page * 10;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

  getdeliveryBoy(page) {

    this.deliveryBoyService.getdeliveryBoyPage(page).subscribe(
      response => {
        console.log(response)
        this.deliveryBoyList = response.body['data'].data
        this.pages = response.body['data'].last_page * 10;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

  confirmStatus(deliveryBoyId) {

    Swal({
      title: localisation.deleteTitle,
      text: localisation.confirmDeliveryBoyText,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: localisation.confirmDeliveryBoyButton
    }).then((result) => {
      if (result.value) {

        const confirmDate = {id: deliveryBoyId, status: 1};
        this.deliveryBoyService.confirmDeliveryBoy(confirmDate).subscribe(
          res => {

            

            if (res.body['error'] === 'false') {
              Swal({
                title: localisation.confirmedDeliveryBoyText,
                text: localisation.confirmedDeliveryBoyMessage,
                type: 'success',
                timer: 1000,   
                showConfirmButton: false 
              });
            } else {
              Swal(
                localisation.confirmedDeliveryBoyErrorText,
                localisation.confirmedDeliveryBoyErrorMessage,
                'warning'
              );
            }

            this.getdeliveryBoy(this.page);

          },
          err => {
            this.router.navigateByUrl('/serverError');
          }
        );
      }
    });

  }

  Search(params) {
    this.search_key = params;
    if (!params) {
   this.getdeliveryBoy(this.page);
    } else {
   this.status = 2;
     var data = {
       key: this.search_key,
       pageNumber: 1
     };
     this.deliveryBoyService.searchDeliveryBoy(data).subscribe(
      res => {
        this.deliveryBoyList = res.body['data'].data
        this.pages = res.body['data'].last_page * 10;
    
      },
      err => {
        console.log(err);
      }
    );
    }
   }
   
   searchdeliveryBoy(params) {
    this.status = 2;
      var data = {
        key: this.search_key,
        pageNumber: params
      };
      this.deliveryBoyService.searchDeliveryBoy(data).subscribe(
       res => {
        this.deliveryBoyList = res.body['data'].data
        this.pages = res.body['data'].last_page * 10;
       },
       err => {
         console.log(err);
       });
    }
}
