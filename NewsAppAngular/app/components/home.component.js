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
var HomeComponent = (function () {
    function HomeComponent(modalService, modalActive, _newsUpdateService) {
        this.modalService = modalService;
        this.modalActive = modalActive;
        this._newsUpdateService = _newsUpdateService;
        this.newsUpdate = new NewsUpdate_1.NewsUpdate();
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        if (this.currentUser != null) {
            this.newsUpdate.UserId = this.currentUser.UserId;
        }
        this.loadFeaturedNews();
    };
    HomeComponent.prototype.loadFeaturedNews = function () {
        var _this = this;
        this._newsUpdateService.getFeaturedNews("http://localhost:49897/api/NewsUpdate/FeaturedNews")
            .subscribe(function (data) {
            if (data.length > 0) {
                _this.featuredNews = data;
            }
            else {
                _this.message = "Featured news not found";
                _this.alertType = "info";
            }
        });
    };
    HomeComponent.prototype.onAddNewsSubmit = function () {
        var _this = this;
        this._newsUpdateService.addNews("http://localhost:49897/api/NewsUpdate", this.newsUpdate)
            .subscribe(function (data) {
            if (data == "Ok") {
                _this.message = "News added successfully";
                _this.alertType = "success";
                _this.loadFeaturedNews();
                _this.modalActive.close();
            }
            else {
                _this.modalActive.close();
                _this.message = "Something went wrong!";
                _this.alertType = "danger";
            }
        });
    };
    HomeComponent.prototype.open = function (addnews) {
        this.modalActive = this.modalService.open(addnews);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home-app',
            templateUrl: 'app/templates/home.template.html',
            providers: [newsupdate_service_1.NewsUpdateService, ng_bootstrap_1.NgbActiveModal]
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal, ng_bootstrap_1.NgbActiveModal, newsupdate_service_1.NewsUpdateService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map