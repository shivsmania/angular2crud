"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var app_component_1 = require("./app.component");
var home_component_1 = require("./components/home.component");
var nav_component_1 = require("./components/nav.component");
var news_component_1 = require("./components/news.component");
var user_component_1 = require("./components/user.component");
var profile_component_1 = require("./components/profile.component");
var app_routing_1 = require("./app.routing");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing, forms_1.FormsModule, http_1.HttpModule, ng_bootstrap_1.NgbModule.forRoot(), ng2_slim_loading_bar_1.SlimLoadingBarModule.forRoot()],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, nav_component_1.NavComponent, news_component_1.NewsComponent, user_component_1.UserComponent, profile_component_1.ProfileComponent],
            providers: [
                common_1.Location,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
            ],
            bootstrap: [app_component_1.AppComponent, nav_component_1.NavComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map