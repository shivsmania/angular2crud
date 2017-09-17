import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NewsUpdate } from '../models/NewsUpdate';
import { IUser } from '../models/IUser';
import { NewsUpdateService } from '../services/newsupdate.service';

@Component({
    selector: 'home-app',
    templateUrl: 'app/templates/home.template.html',
    providers: [NewsUpdateService, NgbActiveModal]
})
export class HomeComponent implements OnInit {
    featuredNews: NewsUpdate[];
    newsUpdate: NewsUpdate = new NewsUpdate();    
    message: string;
    alertType: string;
    currentUser: IUser;

    constructor(private modalService: NgbModal, private modalActive: NgbActiveModal, private _newsUpdateService: NewsUpdateService) { }

    ngOnInit(): void {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        if (this.currentUser != null) {
            this.newsUpdate.UserId = this.currentUser.UserId;
        }
        this.loadFeaturedNews();
    }

    loadFeaturedNews(): void {
        this._newsUpdateService.getFeaturedNews("http://localhost:49897/api/NewsUpdate/FeaturedNews")
            .subscribe((data) => {
                if (data.length > 0) {
                    this.featuredNews = data;
                } else {
                    this.message = "Featured news not found";
                    this.alertType = "info";
                }
            });
    }

    onAddNewsSubmit():void {
        this._newsUpdateService.addNews("http://localhost:49897/api/NewsUpdate", this.newsUpdate)
            .subscribe((data) => {
                if (data == "Ok") {                    
                    this.message = "News added successfully";
                    this.alertType = "success";
                    this.loadFeaturedNews();
                    this.modalActive.close();
                } else {
                    this.modalActive.close();
                    this.message = "Something went wrong!";
                    this.alertType = "danger";                    
                }
            });
    }

    open(addnews: any) {
        this.modalActive = this.modalService.open(addnews);
    }
}