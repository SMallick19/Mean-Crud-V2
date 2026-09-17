import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserComponent } from './user/user.component';
import { UserService } from './../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [UserService],
})
export class AppComponent implements OnInit{
  title = 'frontend';
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  dataSource: MatTableDataSource<any[]>
  displayedColumns: string[] = ['name', 'email', 'age', 'address', 'action'];

  constructor(private userservice: UserService){}

  ngOnInit(): void {
    this.GetUserData()
  }

  addUser(){
    const dialogRef = this.dialog.open(UserComponent, {
      data: ''
    })
    dialogRef.afterClosed().subscribe(() => this.GetUserData());
  }

  GetUserData() {
    // check internet connectivity.
    if (window.navigator.onLine) {
      /* loader enable*/
      /* api call*/
      this.userservice.getUserData().subscribe({
        next: (res: any) => {
          // bind data
          if (res.status === 200) {
              this.dataSource = new MatTableDataSource(res.data)
          } else {
            this._snackBar.open("Something went wrong", "close");
          }
        },
        error: (err: any) => {
          this._snackBar.open("Something went wrong", "close");
        },
        complete: () => {
          this._snackBar.open("User loaded successfully", "close");
        },
      })
    } else {
      this._snackBar.open("Check your internet connection", "close");
    }
  }

  DeleteUserData(id) {
    // check internet connectivity.
    if (window.navigator.onLine) {
      /* loader enable*/
      /* api call*/
      this.userservice.deleteUserData(id).subscribe({
        next: (res: any) => {
          // bind data
          if (res.status === 200) {
              this.GetUserData()
          } else {
            this._snackBar.open("Something went wrong", "close");
          }
        },
        error: (err: any) => {
          this._snackBar.open("Something went wrong", "close");
        },
        complete: () => {
          this._snackBar.open("User loaded successfully", "close");
        },
      })
    } else {
      this._snackBar.open("Check your internet connection", "close");
    }
  }

  GetSingleUserData(id){
    if (window.navigator.onLine) {
      /* loader enable*/
      /* api call*/
      this.userservice.getSingleUserData(id).subscribe({
        next: (res: any) => {
          // bind data
          if (res.status === 200) {
            const dialogRef = this.dialog.open(UserComponent, {
              data: res.data
            })
            dialogRef.afterClosed().subscribe(() => this.GetUserData());
          } else {
            this._snackBar.open("Something went wrong", "close");
          }
        },
        error: (err: any) => {
          this._snackBar.open("Something went wrong", "close");
        },
        complete: () => {
          this._snackBar.open("User loaded successfully", "close");
        },
      })
    } else {
      this._snackBar.open("Check your internet connection", "close");
    }
  }
}
