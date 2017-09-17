import { Component, OnInit } from '@angular/core';

import { IUser } from '../models/IUser';
import { UserService } from '../services/user.service';

@Component({
    selector: 'user-app',
    templateUrl: 'app/templates/register.template.html',
    providers: [UserService]
})
export class UserComponent implements OnInit {
    users: IUser[];
    user = new IUser();
    message: string;  
    alertType: string;
    displayPic: File; 
    
    constructor(private _userService: UserService) { }

    ngOnInit(): void {
        
    }

    fileChange(files: any){
        console.log(files);
        this.displayPic = files[0];
    }   

    onSubmit(): void {
        let _formData = new FormData();
        _formData.append("FullName", this.user.FullName);
        _formData.append("Username", this.user.Username);
        _formData.append("Password", this.user.Password);
        _formData.append("Email", this.user.Email);
        _formData.append("Address", this.user.Address);
        _formData.append("Mobile", this.user.Mobile);
        _formData.append("DisplayPic", this.displayPic);
        console.log(_formData);
        this._userService.addUser("http://localhost:49897/api/User", _formData).subscribe(
            (data) => {
                if (data == "Ok") {
                    this.message = "Successfully registered.";
                    this.alertType = "success";
                    this.reset();                    
                } else {
                    this.message = "Something went wrong";
                    this.alertType = "danger";
                }
            });
    }

    reset(): void {
        this.user.FullName = "";
        this.user.Username = "";
        this.user.Email = "";
        this.user.Password = "";
        this.user.Mobile = "";
        this.user.Address = "";
        this.user.DisplayPic = null;
    }

}