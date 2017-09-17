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
var NewsComponent = (function () {
    function NewsComponent(modalService, modalActive, _newsUpdateService) {
        this.modalService = modalService;
        this.modalActive = modalActive;
        this._newsUpdateService = _newsUpdateService;
        this.newsUpdate = new NewsUpdate_1.NewsUpdate();
    }
    NewsComponent.prototype.ngOnInit = function () {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        if (this.currentUser != null) {
            this.newsUpdate.UserId = this.currentUser.UserId;
        }
        this.loadAllNews();
    };
    NewsComponent.prototype.loadAllNews = function () {
        var _this = this;
        this._newsUpdateService.getAllNews("http://localhost:49897/api/NewsUpdate")
            .subscribe(function (data) {
            if (data.length > 0) {
                _this.allNews = data;
            }
            else {
                _this.message = "News not found";
                _this.alertType = "info";
            }
        });
    };
    NewsComponent.prototype.onAddNewsSubmit = function () {
        var _this = this;
        this._newsUpdateService.addNews("http://localhost:49897/api/NewsUpdate", this.newsUpdate)
            .subscribe(function (data) {
            if (data == "Ok") {
                _this.message = "News added successfully";
                _this.alertType = "success";
                _this.loadAllNews();
                _this.modalActive.close();
            }
            else {
                _this.modalActive.close();
                _this.message = "Something went wrong!";
                _this.alertType = "danger";
            }
        });
    };
    NewsComponent.prototype.open = function (addnews) {
        this.modalActive = this.modalService.open(addnews);
    };
    NewsComponent = __decorate([
        core_1.Component({
            selector: 'news-app',
            templateUrl: 'app/templates/news.template.html',
            providers: [newsupdate_service_1.NewsUpdateService, ng_bootstrap_1.NgbActiveModal]
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal, ng_bootstrap_1.NgbActiveModal, newsupdate_service_1.NewsUpdateService])
    ], NewsComponent);
    return NewsComponent;
}());
exports.NewsComponent = NewsComponent;
//# sourceMappingURL=news.component.js.map