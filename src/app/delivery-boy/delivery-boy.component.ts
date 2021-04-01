import { Component, OnInit } from "@angular/core";
import { deliveryBoyService } from "./delivery-boy.service";
import { deliveryboyList } from "./deliveryboy-list.model";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { localisation } from "../../localisation/localisation";

@Component({
  selector: "app-delivery-boy",
  templateUrl: "./delivery-boy.component.html",
  styleUrls: ["./delivery-boy.component.css"],
})
export class DeliveryBoyComponent implements OnInit {
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
  cashmode: Boolean = false;

  constructor(
    private deliveryBoyService: deliveryBoyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.deliveryBoyService.getDeliveryBoyList(this.page).subscribe(
      (response) => {
        this.deliveryBoyList = response;
      },
      (err) => {
        this.router.navigateByUrl("/serverError");
      }
    );

    this.deliveryBoyService.getdeliveryBoyPage(this.page).subscribe(
      (response) => {
        this.pages = response.body["totalPage"] * 10;
      },
      (err) => {
        this.router.navigateByUrl("/serverError");
      }
    );
  }

  getdeliveryBoy(page) {
    this.deliveryBoyService.getDeliveryBoyList(page).subscribe(
      (response) => {
        this.deliveryBoyList = response;
      },
      (err) => {
        this.router.navigateByUrl("/serverError");
      }
    );
  }

  confirmStatus(deliveryBoyId) {
    Swal({
      title: localisation.deleteTitle,
      text: localisation.confirmDeliveryBoyText,
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: localisation.confirmDeliveryBoyButton,
    }).then((result) => {
      if (result.value) {
        const confirmDate = { id: deliveryBoyId, status: 1 };
        this.deliveryBoyService.confirmDeliveryBoy(confirmDate).subscribe(
          (res) => {
            if (res.body["error"] === "false") {
              Swal({
                title: localisation.confirmedDeliveryBoyText,
                text: localisation.confirmedDeliveryBoyMessage,
                type: "success",
                timer: 1000,
                showConfirmButton: false,
              });
            } else {
              Swal(
                localisation.confirmedDeliveryBoyErrorText,
                localisation.confirmedDeliveryBoyErrorMessage,
                "warning"
              );
            }

            this.getdeliveryBoy(this.page);
          },
          (err) => {
            this.router.navigateByUrl("/serverError");
          }
        );
      }
    });
  }

  Search(params) {
    this.search_key = params;
    if (!params) {
      this.status = 1;
      this.getdeliveryBoy(this.page);
    } else {
      this.status = 2;
      var data = {
        key: this.search_key,
        pageNumber: 1,
      };
      this.deliveryBoyService.searchDeliveryBoy(data).subscribe(
        (res) => {
          this.deliveryBoyList = res.body["listStaff"];
          this.search_pages = res.body["totalPage"] * 10;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  searchdeliveryBoy(params) {
    this.status = 2;
    var data = {
      key: this.search_key,
      pageNumber: params,
    };
    this.deliveryBoyService.searchDeliveryBoy(data).subscribe(
      (res) => {
        this.deliveryBoyList = res.body["listStaff"];
        this.search_pages = res.body["totalPage"] * 10;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  confirmClicked(id) {
    // console.log(id);
    Swal({
      title: localisation.deleteTitle,
      text: "delete",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: localisation.deleteConfirmButton,
    }).then((result) => {
      if (result.value) {
        this.deliveryBoyService.deletestaff(id).subscribe((res) => {
          console.log(res);
          if (res["error"] === "true") {
            Swal({
              title: "Error",
              text: res["errorMessage"],
              type: "error",
              confirmButtonText: "Ok",
            });
          } else {
            Swal({
              title: localisation.deletedText,
              text: localisation.deletedMessage,
              type: "success",
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              this.getdeliveryBoy(1);
            });
          }
        });
      }
    });
  }

  onCashModeToggle(id, cashmode) {
    cashmode = cashmode == 0 ? 1 : 0;
    this.deliveryBoyService
      .updateCashmodeStatus({ id, type: 1, status: cashmode })
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
