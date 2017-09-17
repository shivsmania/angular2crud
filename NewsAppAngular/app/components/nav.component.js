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
var router_1 = require("@angular/router");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var user_service_1 = require("../services/user.service");
var IUser_1 = require("../models/IUser");
var NavComponent = (function () {
    function NavComponent(_router, slimLoadingBarService, modalService, modalActive, _userService) {
        var _this = this;
        this._router = _router;
        this.slimLoadingBarService = slimLoadingBarService;
        this.modalService = modalService;
        this.modalActive = modalActive;
        this._userService = _userService;
        this.user = new IUser_1.IUser();
        _router.events.subscribe(function (event) {
            _this.navigationInterceptor(event);
        });
    }
    NavComponent.prototype.open = function (login) {
        this.modalActive = this.modalService.open(login);
    };
    NavComponent.prototype.ngOnInit = function () {
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    };
    NavComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        this._userService.loginUser("http://localhost:49897/api/user/login", this.user)
            .subscribe(function (data) {
            if (data == null) {
                _this.message = "Wrong username or password";
                _this.alertType = "danger";
            }
            else {
                sessionStorage.setItem("currentUser", JSON.stringify(data));
                _this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
                _this.modalActive.close();
                _this._router.navigate(['home']);
                window.location.reload();
            }
        });
    };
    NavComponent.prototype.logout = function () {
        console.log("logout");
        sessionStorage.removeItem('currentUser');
        this.currentUser = null;
        //window.location.reload();
    };
    NavComponent.prototype.navigationInterceptor = function (event) {
        if (event instanceof router_1.NavigationStart) {
            this.slimLoadingBarService.start();
        }
        if (event instanceof router_1.NavigationEnd) {
            this.slimLoadingBarService.complete();
        }
        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof router_1.NavigationCancel) {
            this.slimLoadingBarService.stop();
        }
        if (event instanceof router_1.NavigationError) {
            this.slimLoadingBarService.stop();
        }
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'nav-app',
            templateUrl: 'app/templates/nav.template.html',
            providers: [user_service_1.UserService, ng_bootstrap_1.NgbActiveModal]
        }),
        __metadata("design:paramtypes", [router_1.Router, ng2_slim_loading_bar_1.SlimLoadingBarService, ng_bootstrap_1.NgbModal, ng_bootstrap_1.NgbActiveModal, user_service_1.UserService])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map