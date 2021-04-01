import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { OutletService } from '../outlet.service';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { } from '@agm/core/services/google-maps-types';
import Swal from 'sweetalert2';
import { localisation } from '../../../localisation/localisation';
declare const google: any;

interface Marker {
  lat: number;
  lng: number;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  zoom: number;
  marker?: Marker;
}

@Component({
  selector: 'app-outlet-add',
  templateUrl: './outlet-add.component.html',
  styleUrls: ['./outlet-add.component.css']
})
export class OutletAddComponent implements OnInit {

  ShowFilter = false;
  limitSelection = false;
  holiday = [];
  holiday1 =[];
  selectedItems:any[] = [];
  serviceSettings = {
  singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    //selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    //itemsShowLimit: 1,
    allowSearchFilter: true
  };

  day2:any;
  showFromTime:any;
  showToTime:any;
  formName: String = 'New Outlet';
  restaurants: any;
  restaurantEnabled: Boolean = true;
  latitude: any;
  longitude: any;
  searchLatitude: any;
  searchLongitude: any;
  password: any;
  selectedImage: File = null;
  url: any = '';
  f:any;
  submitted = false;
  outletData: any;
  isPureVeg: any;
  outletId: any = null;
  statusEnabled: Boolean = false;
  statusDisabled: Boolean = false;
  vegEnabled: Boolean = false;
  vegDisabled: Boolean = false;
  vegAndNonvegDisabled: Boolean = false;
  hideDelivery: Boolean = false;
  vegNonVegEnabled: any = false;
  hideRestaurant: Boolean = false;
  isRestaurant: any = 0;
  isrestaurant: any = false;
  geocoder: any;
  show: boolean;
  orderdata: any  ;
  typeOfDelivery: any;
  public location: Location = {
    lat: 13.665835664961236,
    lng: 79.27530869999998,
    marker: {
      lat: 13.665835664961236,
      lng: 79.27530869999998,
      draggable: true
    },
    zoom: 10
  };

  deliveryType = [{
    id: 1, name: 'Food'
  },
  {
    id: 2, name: 'Grocery'
  },
  {
    id: 3, name: 'Medicine'
  },
  ];

  
  @ViewChild(AgmMap) map: AgmMap;
  @ViewChild("search")
  
  public searchElementRef: ElementRef;
  minToTime: any;
  minToBreakTime: any;
  constructor(
  
    private fb: FormBuilder,
    private outletService: OutletService,
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper,
    private router: Router,
    private route: ActivatedRoute,
    

  ) {
    this.show = false;
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
   }

  outletForm: FormGroup;
  ngOnInit() {
  this.outletForm = this.fb.group({
      "isRestaurant": [ '0', Validators.required],
      "restaurantId": [''],
      "showFromTime": ['',Validators.required],
      "showToTime": ['',Validators.required],
      "breakFromTime": ['',Validators.required],
      "breakToTime": ['',Validators.required],
      "outletName": ['', [ Validators.required, Validators.minLength(4)]],
      "email": ['', [Validators.required, Validators.email]],
      "password": ['', [ Validators.required, Validators.minLength(6)]],
      "commission": ['', [Validators.required, Validators.max(50), Validators.min(0)]],
      "convenienceFee": ['', Validators.min(0)],
      //"costForTwo": ['', Validators.required, Validators.min(0)],
      "preparationTime": ['', Validators.required],
      "addressLineOne": ['', Validators.required],
      "addressLineTwo": [''],
      "area": ['', Validators.required],
      "city": ['', Validators.required],
      "street": ['', Validators.required],
      "isPureVeg": [''],
      "contactNumber": ['', Validators.required],
      "status": ['', Validators.required],
      "latitude": [''],
      "longitude": [''],
      "outletImage": [''],
      "holiday" : ['']

    });

    

  this.holiday = [{ "item_id": '1', "item_text": 'none' },
                  { "item_id": '2', "item_text": 'sunday' },
                  { "item_id": '3', "item_text": 'monday' },
                  { "item_id": '4', "item_text": 'tuesday' },
                  { "item_id": '5', "item_text": 'wednesday' }, 
                  { "item_id": '6', "item_text": 'thursday' }, 
                  { "item_id": '7', "item_text": 'friday' }, 
                  { "item_id": '8', "item_text": 'saturday' },
                  
                ]
  
  this.searchLongitude = '';
  this.searchLatitude  = '';

    this.route.queryParams
      .filter(params => params.res)
      .subscribe(params => {
        if (params.res === 'restaurant') {
          this.changeRestaurant('1');
          this.isRestaurant = 1;
          this.isrestaurant = true;
        } else {
          this.changeRestaurant('0');
          this.isRestaurant = 0;
        }
      });

    navigator.geolocation.getCurrentPosition((position) => {
      this.location.lat = position.coords.latitude;
      this.location.lng = position.coords.longitude;
      this.location.marker.lat = position.coords.latitude;
      this.location.marker.lng = position.coords.longitude;
    });

    this.route.params.subscribe( params => this.outletId = params.id );

    this.location.marker.draggable = true;

    this.outletService.getRestaurantList().subscribe(
      response => {
        this.restaurants = response.body['restaurants'];
      },
      err => {
        this.restaurants.navigateByUrl('/serverError');
      }
    );

    if (this.outletId) {

      this.hideRestaurant = true;
      this.hideDelivery   = true;
      // this.vegNonVegEnabled = true;
      this.formName = 'Edit Outlet';

      this.outletService.getOutletEdit(this.outletId).subscribe(
        response => {
            console.log(response);
            this.getHoliday(response['holiday'])
            this.outletForm = this.fb.group({
            isRestaurant: [ response['status']],
            restaurantId: [response['restaurantId']],
            showFromTime: [response['showFromTime'],Validators.required],
            showToTime: [response['showToTime'],Validators.required],
            breakFromTime: [response['breakFromTime']],
            breakToTime: [response['breakToTime']],
           
           // typeOfDelivery: [response['type']],
            outletName: [response['outletName'], [ Validators.required, Validators.minLength(4)]],
            email: [response['email'], [Validators.required, Validators.email]],
           // password: [''],
            commission: [response['commission'], [Validators.required, Validators.max(50), Validators.min(0)]],
            // deliveryCharges: [''],
            convenienceFee: [response['convenienceFee']],
            //costForTwo: [response['costForTwo'], Validators.required],
            preparationTime: [response['preparationTime'], Validators.required],
            addressLineOne: [response['addressLineOne'], Validators.required],
            addressLineTwo: [response['addressLineTwo']],
            area: [response['area'], Validators.required],
            city: [response['city'], Validators.required],
            street: [response['street'], Validators.required],
            isPureVeg: [response['isPureVeg'], Validators.required],
            contactNumber: [response['contactNumber'], Validators.required],
            status: [response['status'], Validators.required],
            latitude: [response['latitude']],
            longitude: [response['longitude']],
            outletImage: [''],
            holiday : ['', Validators.required]
          });

          if (response['status'] == 1) {
            this.statusEnabled = true;
          } else {
            this.statusDisabled = true;
          }

          if (response['type'] == 'food'){
            this.vegNonVegEnabled = true;
          } 

          if (response['isPureVeg'] === 1) {
            this.vegEnabled = true;
          } else if (response['isPureVeg'] === 0) {
            this.vegDisabled = true;
          } else {
            this.vegAndNonvegDisabled = true;
          }

          this.url = response['image'];
          this.location.lat = response['latitude'];
          this.location.lng = response['longitude'];
          this.location.marker.lat = response['latitude'];
          this.location.marker.lng = response['longitude'];
          this.latitude = response['latitude'];
          this.longitude = response['longitude'];
        },
        err => {
          this.router.navigateByUrl('/serverError');
        }
      );
    }

  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57  ) ) {
      return false;
    }
    return true;

  }

  getHoliday(holidayRes: any) {
    holidayRes = holidayRes.split(',');
     let resp = this.holiday.filter(x => holidayRes.includes(x.item_text) );
     console.log("OUTPUT ~ file: outlet-add.component.ts ~ line 282 ~ OutletAddComponent ~ getHoliday ~ resp", resp)
     this.selectedItems = this.selectedItems.concat(resp)
     console.log('this.selectedItems :>> ', this.selectedItems);
     return resp;
  }

  get outletValidation() { return this.outletForm.controls; }


  password1(){
    this.show = !this.show;

  }
  markerDragEnd(m: any) {
    this.outletForm.value['latitude'] = '';
    this.outletForm.value['longitude'] = '';
    this.latitude = m.coords.lat;
    this.longitude = m.coords.lng;
    this.latitude = this.latitude.toFixed(6);
    this.longitude = this.longitude.toFixed(6);

   }

  onSubmit() 
  {

    if (this.searchLongitude != '' && this.searchLatitude != '') {
      this.longitude = this.searchLongitude;
      this.latitude  = this.searchLatitude;
    } else {
      if (this.outletForm.value['latitude'] != '' && this.outletForm.value['longitude'] != '') {
        this.latitude = parseFloat(this.outletForm.value['latitude']).toFixed(6);
        this.longitude = parseFloat(this.outletForm.value['longitude']).toFixed(6);
      }
    }

  
    this.submitted = true;
    
    console.log("OUTPUT ~ file: outlet-add.component.ts ~ line 326 ~ OutletAddComponent ~ this.selectedItems", this.selectedItems)
    if ((this.outletForm.invalid && this.isrestaurant) || this.selectedItems.length == 0) {
      console.log('this.outletForm :>> ', this.outletForm);
      Swal({
        title: 'Error',
        text: localisation.errorMandatory,
        type: 'error',
        confirmButtonText: 'Ok',
      });

      return false;
    }

    
 
    if(this.showFromTime < this.showToTime && this.showFromTime != this.showToTime){
      Swal({
        title: 'Error',
        text: 'To Time should be greater than From Time',
        type: 'error',
        confirmButtonText: 'Ok',
      });

      return false;
    }  
   
    const outletData = this.outletForm.value;

    if (outletData.isPureVeg == ''){
     this.isPureVeg = '5';
    } else {
     this.isPureVeg = outletData.isPureVeg;
    }
    if (outletData.convenienceFee == null){
      outletData.convenienceFee = 0;
    }
    const formData = new FormData();
    this.password = outletData.password;
    formData.append('outletName', outletData.outletName);
    formData.append('email', outletData.email);
    formData.append('password', this.password);
    formData.append('showFromTime',outletData.showFromTime);
    formData.append('showToTime',outletData.showToTime);
    formData.append('breakFromTime',outletData.breakFromTime);
    formData.append('breakToTime',outletData.breakToTime);
    
    formData.append('convenienceFee', outletData.convenienceFee);
    //formData.append('costForTwo', outletData.costForTwo);
    formData.append('preparationTime', outletData.preparationTime);
    formData.append('addressLineOne', outletData.addressLineOne);
    formData.append('addressLineTwo', outletData.addressLineTwo);
    formData.append('area', outletData.area);
    formData.append('city', outletData.city);
    formData.append('isRestaurant', this.isRestaurant);
    formData.append('commission', outletData.commission);
    formData.append('isPureVeg', this.isPureVeg);
    formData.append('contactNumber', outletData.contactNumber);
    formData.append('latitude', this.latitude);
    formData.append('longitude', this.longitude);
    formData.append('outletImage', this.selectedImage);
    formData.append('street', outletData.street);
    formData.append('status', outletData.status);
    formData.append('restaurantId', outletData.restaurantId);
    // if (outletData.typeOfDelivery == 1){
    //   this.vegNonVegEnabled = 1;
    //   this.typeOfDelivery = 'Food';
    // } else if(outletData.typeOfDelivery == 2) {
    //   this.vegNonVegEnabled = 0;
    //   this.typeOfDelivery = 'Grocery';
    // } else {
    //   this.vegNonVegEnabled = 0;
    //   this.typeOfDelivery = 'Medicine';
    // }
   // formData.append('type', this.typeOfDelivery);
   //console.log(this.orderdata);
   let day= []
    if (this.holiday != null && this.selectedItems.length>0) {
      this.holiday1 =[]
      for (var u = 0, len1 = this.selectedItems.length; u < len1; u++) {
      
        day.push(this.selectedItems[u].item_text);

      }
      
    } 
    this.day2 = day.join(",");
    
    formData.append('holiday',day.join(","));

    if (this.outletId) {

      if (this.selectedImage) {
        formData.append('outletId', this.outletId);
        this.editoutlet(formData, this.outletId);
      } else {
        this.editoutlet(outletData, this.outletId);
      }

      return false;
    }
   
    this.outletService.outletAdd(formData).subscribe(
      response => {
        // console.log(response);

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
          this.router.navigateByUrl('/outletList');
        });
        }

      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

   generatePassword() {
    this.password = Math.random().toString(36).slice(-8);
    this.outletForm.value['password'] = this.password;
  }

  changeRestaurant(event) {
    if (event === '0') {
      this.restaurantEnabled = true;
      this.isRestaurant = 0;
      this.isrestaurant = false;
    } else {
      this.isRestaurant = 1;
      this.restaurantEnabled = false;
      this.isrestaurant = true;
    }
  }

  handleFileInput(file: FileList) {

    this.selectedImage = file[0];

    const reader = new FileReader();

    reader.readAsDataURL(this.selectedImage); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = reader.result;
    };

    }

     
    editoutlet(outletEdit, id) {

      if (this.selectedImage) {
        this.outletData = outletEdit;
      } else {
        this.outletData = {
          outletId: id,
          restaurantId: outletEdit.restaurantId,
          showFromTime: outletEdit.showFromTime,
          showToTime: outletEdit.showToTime,
          convenienceFee: outletEdit.convenienceFee,
         // costForTwo: outletEdit.costForTwo,
          preparationTime: outletEdit.preparationTime,
          addressLineOne: outletEdit.addressLineOne,
          addressLineTwo: outletEdit.addressLineTwo,
          area: outletEdit.area,
          isPureVeg: outletEdit.isPureVeg,
          contactNumber: outletEdit.contactNumber,
          latitude: this.latitude,
          longitude: this.longitude,
          street: outletEdit.street,
          status: outletEdit.status,
          email: outletEdit.email,
          commission: outletEdit.commission,
          outletName: outletEdit.outletName,
          city: outletEdit.city,  
          holiday : this.day2,
          breakFromTime : outletEdit.breakFromTime,
          breakToTime : outletEdit.breakToTime,
            
        };
      }
      
     
      this.outletService.outletEdit(this.outletData).subscribe(
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
              this.router.navigateByUrl('/outletList');
            });
          }

        },
        error => {
          this.router.navigateByUrl('/serverError');
        }
      );

    }
mapSearch() {
  this.mapsApiLoader.load().then(() => {

    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"]
    });

    autocomplete.addListener("place_changed", () => {
      this.zone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        //set latitude, longitude and zoom
        this.location.lat = place.geometry.location.lat();
        this.location.lng = place.geometry.location.lng();
        this.location.marker.lat = place.geometry.location.lat();
        this.location.marker.lng = place.geometry.location.lng(); 
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.searchLatitude = place.geometry.location.lat();
        this.searchLongitude = place.geometry.location.lng();
      });
    });
  });
}
onChange(data){
if (data == 1){
  this.vegNonVegEnabled = 1;
  this.typeOfDelivery = 'Food';
} else if(data == 2) {
  this.vegNonVegEnabled = 0;
  this.typeOfDelivery = 'Grocery';
} else {
  this.vegNonVegEnabled = 0;
  this.typeOfDelivery = 'Medicine';
}
}


onItemSelect(item: any) {
  console.log(item);
  
}
onSelectAll(items: any) {
  console.log(items);
}

onDeSelect(item: any) {
  console.log(item);
}

timeChanged(event, section)
{
  console.log({"event":event, "section":section})

  if(section =="frmTime")
  {
    this.minToTime = event
  }
  else if(section =="frmBreakTime")
  {
    this.minToBreakTime = event
  }

  
}


}
