import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard2, authGuard, authGuard3, authGuard4 } from 'src/authentication/auth.guard';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'', redirectTo:'/Login', pathMatch:'full'},
  {path: 'Login', component: LoginComponent, canActivate: [authGuard2]},
  //{path: 'Home', component: AppComponent, canActivate: [authGuard]},
  {path:'DashBoard', component: DashBoardComponent, canActivate: [authGuard4]},
  {path:'User', component: UserComponent, canActivate: [authGuard3]},
  {path:'ProductDetails', component: ProductDetailsComponent, canActivate: [authGuard4]},
  {path:'NavBar', component: NavbarComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
