import { UserService } from './../../services/user.service';
import {ChangeDetectionStrategy, Component, Inject, inject, model, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  private _snackBar = inject(MatSnackBar)
  userForm: any
  constructor(private userservice: UserService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<UserComponent>
  ){
    this.userForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      age: new FormControl(''),
      address: new FormControl('')
    })
  }
  ngOnInit(): void {
    if(this.data !== ''){
      this.userForm.get('name').setValue(this.data.name)
      this.userForm.get('email').setValue(this.data.email)
      this.userForm.get('age').setValue(this.data.age)
      this.userForm.get('address').setValue(this.data.address)
    }
  }

  saveUser(){
    const payload = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      age:  this.userForm.value.age,
      address:  this.userForm.value.address
    };
    if(this.data !== ''){
      this.EditUserData(payload)
    }else{
      this.AddUserData(payload)
    }

  }

  AddUserData(data: any) {
    // check internet connectivity.
    if (window.navigator.onLine) {
      /* loader enable*/
      /* api call*/
      this.userservice.addUserData(data).subscribe({
        next: (res: any) => {
          // bind data
          if (res.status === 201) {
              this._snackBar.open("User added successfully", "close");
              this.dialogRef.close()
          } else {

          }
        },
        error: (err: any) => {
          this._snackBar.open("Something went wrong", "close");
        },
        complete: () => {
          this._snackBar.open("User added successfully", "close");
        },
      })
    } else {
      this._snackBar.open("Check your internet connection", "close");
    }
  }

  EditUserData(reqbody){
    if (window.navigator.onLine) {
      /* loader enable*/
      /* api call*/
      this.userservice.editSingleUserData(this.data._id, reqbody).subscribe({
        next: (res: any) => {
          // bind data
          if (res.status === 201) {
              this._snackBar.open("User added successfully", "close");
              this.dialogRef.close()
          } else {

          }
        },
        error: (err: any) => {
          this._snackBar.open("Something went wrong", "close");
        },
        complete: () => {
          this._snackBar.open("User added successfully", "close");
        },
      })
    } else {
      this._snackBar.open("Check your internet connection", "close");
    }
  }
}
