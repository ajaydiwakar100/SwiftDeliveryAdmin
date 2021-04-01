import { Component, OnInit } from '@angular/core';
import { deliveryBoyService } from './transactionout.service';
import { deliveryboyList } from './transactionout.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../localisation/localisation';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: '../outtransaction/transactionout.component.html',
  styleUrls: ['../outtransaction/transactionout.component.css']
})
export class TransactionComponent1 implements OnInit {
bal:any= [];
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
  amt:any ;
  transid: any;
  del: any;
  opt: number = null;

  constructor(
    private deliveryBoyService: deliveryBoyService,
    private router: Router, private modalService : NgbModal
  ) { }
  
  open(content,delivery) {
    this.amt = delivery.balanceAmount
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // if(result == 'Others')
      // {
      // result= this.other;
      // }
      // console.log(delivery.balanceAmount)
      // console.log(this.amt)
      // console.log(this.transid)
      this.closeResult = `Closed with: ${result}`;
      // var request = {
      //  // bookingId:this.paramsid,
      //   cancelReason:result
      // }
      
        if(this.amt <= delivery.balanceAmount){
          if(this.amt < 0){
            Swal({
              title: "Transfered Failed",
              text: "Amount should not be negative",
              type: 'error',  
              showConfirmButton: true 
            });
          }
          else{
          if(this.transid == null){
            Swal({
              title: "Transfered Failed",
              text: "Transaction Id should not be empty",
              type: 'error',  
              showConfirmButton: true 
            });
          }
          else{
          var data = { id: delivery.id, amount: this.amt, transactionId: this.transid, option: this.opt}
          this.deliveryBoyService.getPaystaff(data).subscribe(
            res => {
    
              
    
              if (res.body['error'] === 'false') {
                Swal({
                  title: "Transfered Sucessfully",
                  text: "Amount Transfered Sucessfully",
                  type: 'success',
                  timer: 1000,   
                  showConfirmButton: false 
                });
                this.router.navigateByUrl('/viewtransaction1')
              } 
              else{
                Swal(
                  "Amount Not Transfered",
                  "Try Again",
                  'warning'
                );
              }
            },
            err => {
              this.router.navigateByUrl('/serverError');
            }
          );
          }
        }
        }
        else{
          Swal({
            title: "Transfered Failed",
            text: "Amount should be less than or equal to your Balance",
            type: 'error',  
            showConfirmButton: true 
          });
        }
      
      // else{
      //   Swal(
      //     "Amount Not Transfered",
      //     "Try Again amount and transactid id is required",
      //     'warning'
      //   );
      // }
     
     
     
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
  ngOnInit() {
     // Add active class to the current button (highlight it)
     var header = document.getElementById("mine");
     var btns = header.getElementsByClassName("one");
     for (var i = 0; i < btns.length; i++) {
       btns[i].addEventListener("click", function() {
       var current = document.getElementsByClassName("active1");
       current[0].className = current[0].className.replace(" active1", "");
       this.className += " active1";
       });
     }
    this.deliveryBoyService.getdeliveryBoyPage(this.page).subscribe(
      response => {
        this.deliveryBoyList = response.body['listOrders'].data
        this.pages = response.body['listOrders'].last_page * 10;
       
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }
month(){
  var data = { option: 1 ,page: this.page}
  this.deliveryBoyService.monthyear(data).subscribe(
    response => {
      this.deliveryBoyList = response.body['listOrders'].data
       this.pages = response.body['listOrders'].last_page * 10;
     
    },
    err => {
      this.router.navigateByUrl('/serverError');
    }
  );
this.opt =1
}
year(){
  var data = { option: 2 ,page: this.page}
  this.deliveryBoyService.monthyear(data).subscribe(
    response => {
      this.deliveryBoyList = response.body['listOrders'].data
       this.pages = response.body['listOrders'].last_page * 10;
     
    },
    err => {
      this.router.navigateByUrl('/serverError');
    }
  );
  this.opt =2
}
reset(){
  this.deliveryBoyService.getdeliveryBoyPage(this.page).subscribe(
    response => {
      this.deliveryBoyList = response.body['listOrders'].data
      this.pages = response.body['listOrders'].last_page * 10;
     
    },
    err => {
      this.router.navigateByUrl('/serverError');
    }
  );
  this.opt =null;
}
  getdeliveryBoy(page) {


    this.deliveryBoyService.getdeliveryBoyPage(page).subscribe(
      response => {
        this.deliveryBoyList = response.body['listOrders'].data
        this.pages = response.body['listOrders'].last_page * 10;
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
        this.deliveryBoyList = res.body['listOrders'].data
        this.search_pages = res.body['listStaff'].last_page * 10;
    
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
         this.deliveryBoyList = res.body['listOrders'].data;
         this.search_pages = res.body['listStaff'].last_page * 10;
       },
       err => {
         console.log(err);
       });
    }

}
