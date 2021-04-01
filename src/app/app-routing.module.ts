import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InstallComponent } from './install/install.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantViewComponent } from './restaurant/restaurant-view/restaurant-view.component';
import { AvailableCityComponent } from './available-city/available-city.component';
import { AddRestaurantComponent } from './restaurant/add-restaurant/add-restaurant.component';
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
import { SmtpMailComponent } from './integration/smtp-mail/smtp-mail.component';
import { FirebaseComponent } from './integration/push-notification/firebase/firebase.component';
import { SettingComponent } from './setting/setting.component';
import { CuisinComponent } from './cuisin/cuisin.component';
import { CuisinAddComponent } from './cuisin/cuisin-add/cuisin-add.component';
import { BannerComponent } from './banner/banner.component';
import { BannerAddComponent } from './banner/banner-add/banner-add.component';
import { RegisterMailComponent } from './mail/register-mail/register-mail.component';
import { RegisterAddMailComponent } from './mail/register-add-mail/register-add-mail.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { LocalizationComponent } from './localization/localization.component';
import { OutletComponent } from './outlet/outlet.component';
import { OutletAddComponent } from './outlet/outlet-add/outlet-add.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { OrderComponent } from './order/order.component';
import { OrderViewComponent } from './order/order-view/order-view.component';
import { OutletViewComponent} from './outlet/outlet-view/outlet-view.component';
import { OrderMailComponent } from './mail/order-mail/order-mail.component';
import { OrderAddMailComponent } from './mail/order-add-mail/order-add-mail.component';
import { DeliveryBoyComponent } from './delivery-boy/delivery-boy.component';
import { DeliveryViewComponent } from './delivery-boy/delivery-view/delivery-view.component';
import { LanguageComponent } from './language/language.component';
import { LanguageAddComponent } from './language/language-add/language-add.component';
import { MapGoogleComponent } from './map/map.component';
import { ChargesComponent } from './integration/charges/charges.component';
import { FreeKmComponent } from './integration/free-km/free-km.component';
import { ReportsComponent } from './reports/reports.component';
import { ManualAssignComponent } from './integration/manual-assign/manual-assign.component';
import {TransactionComponent } from './transaction/transaction.component';
import { TransactionComponent1 } from './outtransaction/transactionout.component'
import {ViewtranComponent } from './viewtran/viewtran.component';
import { ViewtranComponent1} from './viewtranout/viewtranout.component';
import { DetailviewComponent } from './detailview/detailview.component';
import { DetailviewoutComponent } from './detailviewout/detailviewout.component';
import { TypeComponent } from './type/type.component';
import { TypeaddComponent } from './type/typeadd/typeadd.component';
import { TypeeditComponent } from './type/typeedit/typeedit.component';
import { EditRestaurantComponent } from './restaurant/edit-restaurant/edit-restaurant.component';
import { TaxComponent } from './integration/tax/tax.component';
import { TaxesComponent } from './taxes/taxes.component';

const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },

  // App routes goes here here
  {
      path: '',
      component: LayoutComponent,
      children: [
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
        { path: 'userList', component: UserComponent, canActivate: [AuthGuard] },
        { path: 'userAdd', component: UserAddComponent, canActivate: [AuthGuard] },
        { path: 'restaurantAdd', component: AddRestaurantComponent, canActivate: [AuthGuard] },
        { path: 'restaurantList', component: RestaurantComponent, canActivate: [AuthGuard] },
        { path: 'restaurantView/:id', component: RestaurantViewComponent, canActivate: [AuthGuard] },
        { path: 'integrations', component: IntegrationComponent, canActivate: [AuthGuard] },
        { path: 'smsGateway', component: SmsGatewayComponent, canActivate: [AuthGuard] },
        { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
        { path: 'charges', component: ChargesComponent, canActivate: [AuthGuard] },
        { path: 'freekm', component: FreeKmComponent, canActivate: [AuthGuard] },
        { path: 'push', component: PushNotificationComponent, canActivate: [AuthGuard] },
        { path: 'smsFormTwilio', component: SmsFormComponent, canActivate: [AuthGuard] },
        { path: 'paymentGateway', component: PaymentGatewayComponent, canActivate: [AuthGuard] },
        { path: 'stripe', component: StripeComponent, canActivate: [AuthGuard] },
        { path: 'loginType', component: LoginTypeComponent, canActivate: [AuthGuard] },
        { path: 'mail', component: MailComponent, canActivate: [AuthGuard] },
        { path: 'smtpMail', component: SmtpMailComponent, canActivate: [AuthGuard] },
        { path: 'firebase', component: FirebaseComponent, canActivate: [AuthGuard] },
        { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
        { path: 'cuisinList', component: CuisinComponent, canActivate: [AuthGuard] },
        { path: 'cuisinAdd', component: CuisinAddComponent, canActivate: [AuthGuard] },
        { path: 'cuisinEdit/:id', component: CuisinAddComponent, canActivate: [AuthGuard] },
        { path: 'bannerList', component: BannerComponent, canActivate: [AuthGuard] },
        { path: 'bannerAdd', component: BannerAddComponent, canActivate: [AuthGuard] },
        { path: 'registerMail', component: RegisterMailComponent, canActivate: [AuthGuard] },
        { path: 'orderMail', component: OrderMailComponent, canActivate: [AuthGuard] },
        { path: 'orderAddMail', component: OrderAddMailComponent, canActivate: [AuthGuard] },
        { path: 'orderEditMail/:id', component: OrderAddMailComponent, canActivate: [AuthGuard] },
        { path: 'registerAddMail', component: RegisterAddMailComponent, canActivate: [AuthGuard] },
        { path: 'registerEditMail/:id', component: RegisterAddMailComponent, canActivate: [AuthGuard] },
        { path: 'localization', component: LocalizationComponent, canActivate: [AuthGuard] },
        { path: 'outletList', component: OutletComponent, canActivate: [AuthGuard] },
        { path: 'outletAdd', component: OutletAddComponent, canActivate: [AuthGuard] },
        { path: 'outletEdit/:id', component: OutletAddComponent, canActivate: [AuthGuard] },
        { path: 'userView/:id', component: UserViewComponent, canActivate: [AuthGuard] },
        { path: 'orderList', component: OrderComponent, canActivate: [AuthGuard] },
        { path: 'orderView/:id', component: OrderViewComponent, canActivate: [AuthGuard] },
        { path: 'outletView/:id', component: OutletViewComponent, canActivate: [AuthGuard] },
        { path: 'deliveryBoyList', component: DeliveryBoyComponent, canActivate: [AuthGuard] },
        { path: 'deliveryView/:id', component: DeliveryViewComponent, canActivate: [AuthGuard] },
        { path: 'languageList', component: LanguageComponent, canActivate: [AuthGuard] },
        { path: 'languageAdd', component: LanguageAddComponent, canActivate: [AuthGuard] },
        { path: 'languageEdit/:id', component: LanguageAddComponent, canActivate: [AuthGuard] },
        { path: 'mapDeliveryBoy', component: MapGoogleComponent, canActivate: [AuthGuard] },
        { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
        { path: 'manualAssign', component: ManualAssignComponent, canActivate: [AuthGuard] },
        { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] },
        { path: 'outtransaction', component: TransactionComponent1, canActivate: [AuthGuard] },
        { path: 'viewtransaction', component: ViewtranComponent, canActivate: [AuthGuard] },
        { path: 'viewtransaction1', component: ViewtranComponent1, canActivate: [AuthGuard] },
        { path: 'detailview/:id', component: DetailviewComponent, canActivate: [AuthGuard] },
        { path: 'detailviewout/:id', component: DetailviewoutComponent, canActivate: [AuthGuard] },
        { path: 'type', component: TypeComponent, canActivate: [AuthGuard] },
        { path: 'typeadd', component: TypeaddComponent, canActivate: [AuthGuard] },
        { path: 'typeedit/:id', component: TypeeditComponent, canActivate: [AuthGuard] },
        { path: 'restaurantEdit/:id', component: EditRestaurantComponent, canActivate: [AuthGuard] },
        { path: 'tax', component: TaxComponent, canActivate: [AuthGuard] },
        { path: 'taxesList', component: TaxesComponent, canActivate: [AuthGuard] }
      ],
      canActivate: [AuthGuard]
  },
  {
    path: 'install',
    component: InstallComponent
  },
  {
    path: 'available_city',
    component: AvailableCityComponent
  },

  { path: 'serverError', component: ServerErrorComponent },

  { path: '**', component: NotFoundComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
