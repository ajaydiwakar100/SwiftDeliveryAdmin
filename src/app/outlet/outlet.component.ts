import { Component, OnInit } from '@angular/core';
import { OutletService } from './outlet.service';
import { deliveryBoyService } from "../delivery-boy/delivery-boy.service";
import { OutletList } from './outlet-list.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../localisation/localisation';
import { environment } from '../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css']
})
export class OutletComponent implements OnInit {

  outletList: OutletList[];
  pages: any;
  page = 1;
  success: String = null;
  itemsPerPage: Number = 10;
  search_key: any;
  search_pages: number;
  status = 1; 
  restaurantAdminUrl: any = environment.restaurantAdminUrl;
  closeResult: string;
  restaurantList: any = [];
  restaurantCopyForm: FormGroup;
  cashmode: Boolean = false;




  constructor(
    private outletService: OutletService,
    private deliveryBoyService: deliveryBoyService,
    private router: Router,
    private modalService : NgbModal,
    private fb: FormBuilder,


  ) { }

  ngOnInit() {

    this.outletService.getOutletList(this.page).subscribe(
      response => {

         this.outletList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.outletService.getOutlet(this.page).subscribe(
      response => {
        this.pages = response.body['totalPage'] * 10;
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  getOutlet(page) {

    this.outletService.getOutletList(page).subscribe(
      response => {

        this.outletList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.outletService.getOutlet(page).subscribe(
      response => {

        this.pages = response.body['totalPage'] * 10;
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  restaurantAdminLogin(id) {

    const data = { outletId: id };
    this.outletService.restaurantAdminLogin(data).subscribe(
      response => {

        if (response.body['error']) {
          if (response.body['error'] === 'true') {
            Swal({
              title: 'Error',
              text: response.body['errorMessage'],
              type: 'error',
              confirmButtonText: 'Ok',
            });
          } else {
              sessionStorage.setItem('outletAccessToken', JSON.stringify(response.body['accessToken']));
              sessionStorage.setItem('userName', JSON.stringify(response.body['outlets']['outletName']));
              sessionStorage.setItem('email', JSON.stringify(response.body['outlets']['email']));
              window.open(this.restaurantAdminUrl);
          }
      }
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }
  Search(params) {
    this.search_key = params;
    if (!params) {
   this.status = 1;
   this.getOutlet(this.page);
    } else {
   this.status = 2;
     var data = {
       key: this.search_key,
       pageNumber: 1
     };
     this.outletService.searchOutlets(data).subscribe(
      res => {
        this.outletList = res.body['outlets'];
        this.search_pages = res.body['totalPage'] * 10;
    
      },
      err => {
        console.log(err);
      }
    );
    }
   }
   
   searchOutlets(params) {
    this.status = 2;
      var data = {
        key: this.search_key,
        pageNumber: params
      };
      this.outletService.searchOutlets(data).subscribe(
       res => {
         this.outletList = res.body['outlets'];
         this.search_pages = res.body['totalPage'] * 10;
       },
       err => {
         console.log(err);
       });
    }


   getRestaurantListModal(content) {

    
    
      this.outletService.getRestaurantListModal().subscribe(
       res => {
         this.restaurantList = res.body;
         this.copyMenuItems(content);
       },
       err => {
         console.log(err);
       });
    }






    // ==== 

    copyMenuItems(template) {


      this.restaurantCopyForm = this.fb.group({

        fromRest: ['', Validators.required],
        toRest: ['', Validators.required]

      });
  
      this.modalService.open(template, {ariaLabelledBy: 'modal-basic-title', backdropClass: "modal-backdrop"}).result.then((result) => {
       
        this.closeResult = `Closed with: ${result}`;
        
        let fromRest = this.restaurantCopyForm.value['fromRest'];
        let toRest = this.restaurantCopyForm.value['toRest'];

// debugger;
        if(fromRest.length == 0 || toRest.length == 0)
        {
          Swal({
            title: "Please select restaurants",
            text: "",
            type: 'success',
            timer: 1000,   
            showConfirmButton: false 
          });

          return;
        }

          let data = {copyFrom: fromRest, copyTo: toRest}

        this.outletService.copyMenuItems(data).subscribe(
          res => {
  
            if (res.body['error'] === 'false') {
              Swal({
                title: "Menus Copied Sucessfully",
                text: "Menus Copied Sucessfully",
                type: 'success',
                timer: 1000,   
                showConfirmButton: false 
              });
            } 
            else{
              Swal(
                "Menus Not Copied",
                "Try Again",
                'warning'
              );
            }
          },
          err => {
            this.router.navigateByUrl('/serverError');
          }
        );
      
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
  
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
  
    onCashModeToggle(id, cashmode) {
      cashmode = cashmode == 0 ? 1 : 0;
      this.deliveryBoyService
        .updateCashmodeStatus({ id, type: 2, status: cashmode })
        .subscribe(
          (response) => {
            if (response.body["error"] === "true") {
              Swal({
                title: "Error",
                text: 'Unable to update status, please try again later',
                type: "error",
                confirmButtonText: "Ok",
              });
            } else {
              Swal({
                title: "Success",
                text: 'Cashmode status updated successfully',
                type: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              });
            }
          },
          (err) => {
            this.router.navigateByUrl('/serverError');
          }
        );
    }
}
