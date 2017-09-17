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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var NewsUpdateService = (function () {
    function NewsUpdateService(_http) {
        this._http = _http;
    }
    NewsUpdateService.prototype.addNews = function (url, formData) {
        var body = formData;
        var header = new http_1.Headers();
        var options = new http_1.RequestOptions({
            headers: header
        });
        return this._http.post(url, body, options)
            .map(function (response) { return response.json(); });
    };
    NewsUpdateService.prototype.editNews = function (url, formData) {
        var body = JSON.stringify(formData);
        var headers = new http_1.Headers({
            "Content-Type": "application/json"
        });
        var options = new http_1.RequestOptions({
            headers: headers
        });
        return this._http.put(url, body, options)
            .map(function (response) { return response.json(); });
    };
    NewsUpdateService.prototype.deleteNews = function (url) {
        return this._http.delete(url)
            .map(function (response) { return response.json(); });
    };
    NewsUpdateService.prototype.getFeaturedNews = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    NewsUpdateService.prototype.getAllNews = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    NewsUpdateService.prototype.getUserNews = function (url) {
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    NewsUpdateService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], NewsUpdateService);
    return NewsUpdateService;
}());
exports.NewsUpdateService = NewsUpdateService;
//# sourceMappingURL=newsupdate.service.js.map