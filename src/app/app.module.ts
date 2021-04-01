import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumToBool } from './pipe/numtobool.pipe';
import { InstallComponent } from './install/install.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { Observable } from 'rxjs/Observable';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAddComponent } from './user/user-add/user-add.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AvailableCityComponent } from './available-city/available-city.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AddRestaurantComponent } from './restaurant/add-restaurant/add-restaurant.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { IntegrationComponent } from './integration/integration.component';
import { SmsGatewayComponent } from './integration/sms-gateway/sms-gateway.component';
import { MapComponent } from './integration/map/map.component';
import { PushNotificationComponent } from './integration/push-notification/push-notification.component';
import { SmsFormComponent } from './integration/sms-gateway/sms-form/sms-form.component';
import { PaymentGatewayComponent } from './integration/payment-gateway/payment-gateway.component';
import { StripeComponent } from './integration/payment-gateway/stripe/stripe.component';
import { LoginTypeComponent } from './integration/login-type/login-type.component';
import { MailComponent } from './mail/mail.component';
import { RegisterFormComponent } from './integration/mail/register-form/register-form.component';
import { NgxEditorModule } from 'ngx-editor';
import { SmtpMailComponent } from './integration/smtp-mail/smtp-mail.component';
import { FirebaseComponent } from './integration/push-notification/firebase/firebase.component';
import { SettingComponent } from './setting/setting.component';
import { CuisinComponent } from './cuisin/cuisin.component';
import { CuisinAddComponent } from './cuisin/cuisin-add/cuisin-add.component';
import { BannerComponent } from './banner/banner.component';
import { BannerAddComponent } from './banner/banner-add/banner-add.component';
import { RegisterMailComponent } from './mail/register-mail/register-mail.component';
import { RegisterAddMailComponent } from './mail/register-add-mail/register-add-mail.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ServerErrorComponent } from './server-error/server-error.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LocalizationComponent } from './localization/localization.component';
import { OutletComponent } from './outlet/outlet.component';
import { OutletAddComponent } from './outlet/outlet-add/outlet-add.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MapGoogleComponent } from './map/map.component';
import { WidgetComponent } from './dashboard/widget/widget.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { OrderComponent } from './order/order.component';
import { OrderViewComponent } from './order/order-view/order-view.component';
import { RestaurantViewComponent } from './restaurant/restaurant-view/restaurant-view.component';
import { OutletViewComponent } from './outlet/outlet-view/outlet-view.component';
import { ChartComponent } from './dashboard/chart/chart.component';
import { MorrisJsModule } from 'angular-morris-js';
import { OrderMailComponent } from './mail/order-mail/order-mail.component';
import { OrderAddMailComponent } from './mail/order-add-mail/order-add-mail.component';
import { DeliveryBoyComponent } from './delivery-boy/delivery-boy.component';
import { DeliveryViewComponent } from './delivery-boy/delivery-view/delivery-view.component';
import { environment } from '../environments/environment';
import { LanguageComponent } from './language/language.component';
import { LanguageAddComponent } from './language/language-add/language-add.component';
import { EditableTableModule } from 'angular-inline-editable-table';
import { ChargesComponent } from './integration/charges/charges.component';
import { FreeKmComponent } from './integration/free-km/free-km.component';
import { ReportsComponent } from './reports/reports.component';
import { TransactionComponent1 } from './outtransaction/transactionout.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ManualAssignComponent } from './integration/manual-assign/manual-assign.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ViewtranComponent } from './viewtran/viewtran.component';
import { ViewtranComponent1 } from './viewtranout/viewtranout.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DetailviewComponent } from './detailview/detailview.component';
import { DetailviewoutComponent } from './detailviewout/detailviewout.component';
import { TypeComponent } from './type/type.component';
import { TypeaddComponent } from './type/typeadd/typeadd.component';
import { TypeeditComponent } from './type/typeedit/typeedit.component';
import { EditRestaurantComponent } from './restaurant/edit-restaurant/edit-restaurant.component';
import { NgxLanguageSelectorModule } from 'ngx-language-selector';
import {TranslateModule} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TaxComponent } from './integration/tax/tax.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { TypeaheadModule } from 'ngx-bootstrap';
import { TaxesComponent } from './taxes/taxes.component';
@NgModule({
  declarations: [
    AppComponent,
    InstallComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    TaxComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    UserComponent,
    UserAddComponent,
    RestaurantComponent,
    AvailableCityComponent,
    AddRestaurantComponent,
    IntegrationComponent,
    SmsGatewayComponent,
    MapComponent,
    PushNotificationComponent,
    SmsFormComponent,
    PaymentGatewayComponent,
    StripeComponent,
    LoginTypeComponent,
    MailComponent,
    RegisterFormComponent,
    SmtpMailComponent,
    FirebaseComponent,
    SettingComponent,
    CuisinComponent,
    CuisinAddComponent,
    BannerComponent,
    BannerAddComponent,
    RegisterMailComponent,
    RegisterAddMailComponent,
    ServerErrorComponent,
    LocalizationComponent,
    OutletComponent,
    OutletAddComponent,
    MapGoogleComponent,
    WidgetComponent,
    UserViewComponent,
    OrderComponent,
    OrderViewComponent,
    RestaurantViewComponent,
    OutletViewComponent,
    ChartComponent,
    OrderMailComponent,
    OrderAddMailComponent,
    DeliveryBoyComponent,
    DeliveryViewComponent,
    LanguageComponent,
    LanguageAddComponent,
    ChargesComponent,
    FreeKmComponent,
    ReportsComponent,
    ManualAssignComponent,
    TransactionComponent,
    ViewtranComponent,
    ViewtranComponent1,
    TransactionComponent1,
    DetailviewComponent,
    DetailviewoutComponent,
    TypeComponent,
    TypeaddComponent,
    TypeeditComponent,
    EditRestaurantComponent,
    TaxesComponent,
    NumToBool,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    NgxMaterialTimepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    NgxLanguageSelectorModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    NotifierModule,
    AngularMultiSelectModule,
    NgxSpinnerModule,
    NgxEditorModule,
    AngularEditorModule,
    CKEditorModule,
    NgProgressModule,
    NgProgressHttpModule,
    NgProgressRouterModule,
    LoadingBarHttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapApi,
      language: 'en',
      libraries: ['geometry', 'places']
    }),
    NgxContentLoadingModule,
    MorrisJsModule,
    EditableTableModule,
    DatePickerModule,
    MatSlideToggleModule,
    TypeaheadModule.forRoot()
  ],
  providers: [
    AuthGuard,
    GoogleMapsAPIWrapper,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    MatSlideToggleModule
],
  bootstrap: [AppComponent]
})
export class AppModule { }
