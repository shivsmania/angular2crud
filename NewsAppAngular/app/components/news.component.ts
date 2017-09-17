import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NewsUpdate } from '../models/NewsUpdate';
import { IUser } from '../models/IUser';
import { NewsUpdateService } from '../services/newsupdate.service';

@Component({
    selector: 'news-app',
    templateUrl: 'app/templates/news.template.html',
    providers: [NewsUpdateService, NgbActiveModal]
})
export class NewsComponent implements OnInit { 
    allNews: NewsUpdate[];
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
        this.loadAllNews();
    }

    loadAllNews(): void {
        this._newsUpdateService.getAllNews("http://localhost:49897/api/NewsUpdate")
            .subscribe((data) => {
                if (data.length >0) {
                    this.allNews = data;
                } else {
                    this.message = "News not found";
                    this.alertType = "info";
                }
            });
    }

    onAddNewsSubmit(): void {
        this._newsUpdateService.addNews("http://localhost:49897/api/NewsUpdate", this.newsUpdate)
            .subscribe((data) => {
                if (data == "Ok") {
                    this.message = "News added successfully";
                    this.alertType = "success";
                    this.loadAllNews();
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