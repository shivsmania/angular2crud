"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var IUser_1 = require("../models/IUser");
var user_service_1 = require("../services/user.service");
var UserComponent = (function () {
    function UserComponent(_userService) {
        this._userService = _userService;
        this.user = new IUser_1.IUser();
    }
    UserComponent.prototype.ngOnInit = function () {
    };
    UserComponent.prototype.fileChange = function (files) {
        console.log(files);
        this.displayPic = files[0];
    };
    UserComponent.prototype.onSubmit = function () {
        var _this = this;
        var _formData = new FormData();
        _formData.append("FullName", this.user.FullName);
        _formData.append("Username", this.user.Username);
        _formData.append("Password", this.user.Password);
        _formData.append("Email", this.user.Email);
        _formData.append("Address", this.user.Address);
        _formData.append("Mobile", this.user.Mobile);
        _formData.append("DisplayPic", this.displayPic);
        console.log(_formData);
        this._userService.addUser("http://localhost:49897/api/User", _formData).subscribe(function (data) {
            if (data == "Ok") {
                _this.message = "Successfully registered.";
                _this.alertType = "success";
                _this.reset();
            }
            else {
                _this.message = "Something went wrong";
                _this.alertType = "danger";
            }
        });
    };
    UserComponent.prototype.reset = function () {
        this.user.FullName = "";
        this.user.Username = "";
        this.user.Email = "";
        this.user.Password = "";
        this.user.Mobile = "";
        this.user.Address = "";
        this.user.DisplayPic = null;
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'user-app',
            templateUrl: 'app/templates/register.template.html',
            providers: [user_service_1.UserService]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map