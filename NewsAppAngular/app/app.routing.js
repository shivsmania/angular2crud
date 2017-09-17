"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home.component");
var news_component_1 = require("./components/news.component");
var user_component_1 = require("./components/user.component");
var profile_component_1 = require("./components/profile.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'news', component: news_component_1.NewsComponent },
    { path: 'register', component: user_component_1.UserComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map