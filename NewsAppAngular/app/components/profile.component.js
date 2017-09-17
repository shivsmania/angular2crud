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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var NewsUpdate_1 = require("../models/NewsUpdate");
var newsupdate_service_1 = require("../services/newsupdate.service");
var ProfileComponent = (function () {
    function ProfileComponent(modalService, modalActive, _newsUpdateService) {
        this.modalService = modalService;
        this.modalActive = modalActive;
        this._newsUpdateService = _newsUpdateService;
        this.newsUpdate = new NewsUpdate_1.NewsUpdate();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        if (this.currentUser != null) {
            this.newsUpdate.UserId = this.currentUser.UserId;
        }
        this.loadUserNews();
    };
    ProfileComponent.prototype.loadUserNews = function () {
        var _this = this;
        this._newsUpdateService.getUserNews("http://localhost:49897/api/NewsUpdate/NewsByUserId/" + this.currentUser.UserId)
            .subscribe(function (data) {
            if (data.length > 0) {
                _this.userNews = data;
            }
            else {
                _this.message = "News not found";
                _this.alertType = "info";
            }
        });
    };
    ProfileComponent.prototype.onEditNewsSubmit = function () {
        var _this = this;
        this._newsUpdateService.editNews("http://localhost:49897/api/NewsUpdate/" + this.newsUpdate.NewsId, this.newsUpdate)
            .subscribe(function (data) {
            if (data == "Ok") {
                _this.message = "News updated successfully";
                _this.alertType = "success";
                _this.loadUserNews();
                _this.modalActive.close();
            }
            else {
                _this.modalActive.close();
                _this.message = "Something went wrong!";
                _this.alertType = "danger";
            }
        });
    };
    ProfileComponent.prototype.onDeleteNews = function (id) {
        var _this = this;
        this._newsUpdateService.deleteNews("http://localhost:49897/api/NewsUpdate/" + id)
            .subscribe(function (data) {
            if (data == "Ok") {
                _this.loadUserNews();
                _this.message = "Successfully Deleted";
                _this.alertType = "success";
                _this.modalActive.close();
            }
            else {
                _this.message = "Something went wrong!";
                _this.alertType = "danger";
                _this.modalActive.close();
            }
        });
    };
    ProfileComponent.prototype.openEdit = function (editnews, id) {
        this.newsUpdate = this.userNews.filter(function (n) { return n.NewsId == id; })[0];
        this.modalActive = this.modalService.open(editnews);
    };
    ProfileComponent.prototype.openDelete = function (deletenews, id) {
        this.id = id;
        this.modalActive = this.modalService.open(deletenews);
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile-app',
            templateUrl: 'app/templates/profile.template.html',
            providers: [newsupdate_service_1.NewsUpdateService, ng_bootstrap_1.NgbActiveModal]
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal, ng_bootstrap_1.NgbActiveModal, newsupdate_service_1.NewsUpdateService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map