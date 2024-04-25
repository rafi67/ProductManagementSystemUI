import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/authentication/auth.service';
import { User } from 'src/models/user.model';
import { JwtHelper } from 'src/services/jwt-helper.service';
import { UsersService } from 'src/services/users.service';
import { UserData } from 'src/sharedService/userData.shared.service';
import { AddBrandDialogComponent } from '../add-brand-dialog/add-brand-dialog.component';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { AppComponent } from '../app.component';
import { CredentialDialogComponent } from '../credential-dialog/credential-dialog.component';
import { EditPersonalInfoDialogComponent } from '../edit-personal-info-dialog/edit-personal-info-dialog.component';
import { DashBoardComponent } from '../dash-board/dash-board.component';
import { UserComponent } from '../user/user.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  picPath: string = 'https://localhost:7071/Pictures';
  user: User = {
    userId: '',
    fullName: '',
    userName: '',
    password: '',
    userPhoto: '',
    userEmail: '',
    isAdmin: false,
    isDistributor: false,
    isAreaHead: false
  };


  constructor(private jwtHelper: JwtHelper, private router: Router, private authService: AuthService,
    private appComponent: AppComponent, private container: ViewContainerRef,
    private dialog: MatDialog, private sharedData: UserData, private userServices: UsersService) {}

  ngOnInit(): void {
    var data = this.jwtHelper.decodeToken();
    console.log(data.fullName);
    this.user.userId = data.Id;
    this.user.fullName = data.FullName;
    this.user.userName = data.UserName;
    this.user.userEmail = data.Email;
    this.user.userPhoto = data.UserPhoto;
    this.user.password = data.Password;
    if(data.UserType==="Admin") this.user.isAdmin = true;
    else if(data.UserType==="Distributor") this.user.isDistributor = true;
    else this.user.isAreaHead = true;
    this.sharedData.setData(this.user);
  }

  logout() {
    this.authService.logout();
    this.appComponent.token = this.jwtHelper.getToken();
    this.router.navigate(['/Login']);
  }

  addBrand() {
    this.dialog.open(AddBrandDialogComponent);
  }

  addCategory() {
    this.dialog.open(AddCategoryDialogComponent);
  }

  openPersonalInfoDialog() : void {
    this.dialog.open(EditPersonalInfoDialogComponent, {
      data: this.user,
    });
  }

  openCredentialDialog() : void {
    this.dialog.open(CredentialDialogComponent, {
      data: this.user,
    });
  }

  deleteAccount() {
    this.userServices.deleteUser(this.user.userId).subscribe({
      next: () => this.logout(),
      error: () => alert('failed to delete your account'),
    });
  }

  dashBoard() {
    this.container.clear();
    this.container.createComponent(DashBoardComponent);
  }

  userDetails() {
    this.container.clear();
    this.container.createComponent(UserComponent);
  }

  productDetails() {
    this.container.clear();
    this.container.createComponent(ProductDetailsComponent);
  }

}
