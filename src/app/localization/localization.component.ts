import { Component, Input, ViewChild,Renderer,ElementRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { localizationService } from './localization.service';
import { Localization } from './localization.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { localisation } from '../../localisation/localisation';
import { LanguageService } from '../language/language.service';

interface tableData {
  id:number,
  key:string;
  value:string;
}

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.css']
})

export class LocalizationComponent implements OnInit {

  dataLoaded: boolean = false;
  private tableData: any
  private tableDataBetween: any
  private tableDataMax: any
  private tableDataMin: any
  private tableDataSize: any
  private tableDataCustom: any
  private tableDataAttributes: any
  private yourMessage = []
  private languageISO: String = 'en';
  languageList: any;

  constructor(
    private localizationService: localizationService,
    private router: Router,
    private languageService: LanguageService
  ) {

  }

  ngOnInit() {

    this.languageService.getlanguageList(1).subscribe(
      response => {

        this.languageList = response;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.localizationService.getlocalizationList(this.languageISO).subscribe (
      (response) => {
        const CUSTOMER_DATA = response.body['languageString']
        const CUSTOMER_DATA_BETWEEN: tableData[] = response.body['between']
        const CUSTOMER_DATA_MAX: tableData[] = response.body['max']
        const CUSTOMER_DATA_MIN: tableData[] = response.body['min']
        const CUSTOMER_DATA_SIZE: tableData[] = response.body['size']
        const CUSTOMER_DATA_CUSTOM: tableData[] = response.body['custom']
        const CUSTOMER_DATA_ATTRIBUTES: tableData[] = response.body['attributes']

        this.tableData = CUSTOMER_DATA;
        this.tableDataBetween = CUSTOMER_DATA_BETWEEN;
        this.tableDataMin = CUSTOMER_DATA_MIN;
        this.tableDataMax = CUSTOMER_DATA_MAX;
        this.tableDataSize = CUSTOMER_DATA_SIZE;
        this.tableDataCustom = CUSTOMER_DATA_CUSTOM;
        this.tableDataAttributes = CUSTOMER_DATA_ATTRIBUTES;

        this.tableData.forEach(element => {

          element.value = element.value.replace(':attribute', '');
          element.value = element.value.replace(':values', '');
          element.value = element.value.replace(':digits', '');
          element.value = element.value.replace(':min', '');
          element.value = element.value.replace(':max', '');
          element.value = element.value.replace(':other', '');
          
        });
        this.dataLoaded=true;
      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    )

  }

  ngAfterViewInit(): void {  

//     var myEl = document.querySelector( '#mat-icon' );
// myEl.remove;
    // const body = ('mat-icon')[5];
    //     body.classList.remove('material-icons mat-icon mat-primary ng-star-inserted');
    //     body.classList.add('theme-orange');
    }  

  private action(row: any, masterKey) { console.log(masterKey);
    if (row.operation === 'updated') {
    this.update(row, masterKey); // This is your update call to API
    this.yourMessage.push('success','updated successfully') // Show update success notification
            this.yourMessage = []; // make sure you empty it
    }
    
    if (row.operation === 'deleted') {
    // this.delete(row.id); // This is your delete call to API
    this.yourMessage.push('success','deleted successfully') // Show delete success notification
    this.yourMessage = []; // make sure you empty it
    }
    }

    update(row, masterKey) {

      const updateData = {iso: this.languageISO, key: row.key, value: row.value, masterKey: masterKey};

      this.localizationService.updateLocalization(updateData).subscribe (
        response => {

          if(response.body['error'] = false) {
            
          }
         
        },
        error => {
          this.router.navigateByUrl('/serverError');
        }
      )
      
    }

    changeLang(iso) {
      this.dataLoaded=false;
      this.languageISO = iso;

      this.localizationService.getlocalizationList(iso).subscribe (
        response => {
          const CUSTOMER_DATA: tableData[] = response.body['languageString']
          const CUSTOMER_DATA_BETWEEN: tableData[] = response.body['between']
          const CUSTOMER_DATA_MAX: tableData[] = response.body['max']
          const CUSTOMER_DATA_MIN: tableData[] = response.body['min']
          const CUSTOMER_DATA_SIZE: tableData[] = response.body['size']
          const CUSTOMER_DATA_CUSTOM: tableData[] = response.body['custom']
          const CUSTOMER_DATA_ATTRIBUTES: tableData[] = response.body['attributes']
  
          this.tableData = CUSTOMER_DATA;
          console.log(this.tableData)
          this.tableDataBetween = CUSTOMER_DATA_BETWEEN;
          this.tableDataMin = CUSTOMER_DATA_MIN;
          this.tableDataMax = CUSTOMER_DATA_MAX;
          this.tableDataSize = CUSTOMER_DATA_SIZE;
          this.tableDataCustom = CUSTOMER_DATA_CUSTOM;
          this.tableDataAttributes = CUSTOMER_DATA_ATTRIBUTES;

          this.tableData.forEach(element => {

            element.value = element.value.replace(':attribute', '');
            element.value = element.value.replace(':values', '');
            element.value = element.value.replace(':digits', '');
            element.value = element.value.replace(':min', '');
            element.value = element.value.replace(':max', '');
            element.value = element.value.replace(':other', '');
            
          });
          
          this.dataLoaded=true;
        },
        error => {
          this.router.navigateByUrl('/serverError');
        }
      )

    }

  

}
