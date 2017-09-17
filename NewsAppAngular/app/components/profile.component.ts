import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NewsUpdate } from '../models/NewsUpdate';
import { IUser } from '../models/IUser';
import { NewsUpdateService } from '../services/newsupdate.service';

@Component({
    selector: 'profile-app',
    templateUrl: 'app/templates/profile.template.html',
    providers: [NewsUpdateService, NgbActiveModal]
})
export class ProfileComponent {
    userNews: NewsUpdate[];
    newsUpdate: NewsUpdate = new NewsUpdate();
    message: string;
    alertType: string;
    currentUser: IUser;
    id: number;

    constructor(private modalService: NgbModal, private modalActive: NgbActiveModal, private _newsUpdateService: NewsUpdateService) { }

    ngOnInit(): void {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        if (this.currentUser != null) {
            this.newsUpdate.UserId = this.currentUser.UserId;
        }
        this.loadUserNews();
    }

    loadUserNews(): void {
        this._newsUpdateService.getUserNews("http://localhost:49897/api/NewsUpdate/NewsByUserId/" + this.currentUser.UserId)
            .subscribe((data) => {
                if (data.length > 0) {
                    this.userNews = data;
                } else {
                    this.message = "News not found";
                    this.alertType = "info";                    
                }
            });
    }

    onEditNewsSubmit(): void {
        this._newsUpdateService.editNews("http://localhost:49897/api/NewsUpdate/" + this.newsUpdate.NewsId, this.newsUpdate)
            .subscribe((data) => {
                if (data == "Ok") {
                    this.message = "News updated successfully";
                    this.alertType = "success";
                    this.loadUserNews();
                    this.modalActive.close();                    
                } else {
                    this.modalActive.close();
                    this.message = "Something went wrong!";
                    this.alertType = "danger";
                }
            });
    }

    onDeleteNews(id: number): void {
        this._newsUpdateService.deleteNews("http://localhost:49897/api/NewsUpdate/" + id)
            .subscribe((data) => {
                if (data == "Ok") {
                    this.loadUserNews();
                    this.message = "Successfully Deleted";
                    this.alertType = "success";
                    this.modalActive.close();                                       
                } else {
                    this.message = "Something went wrong!";
                    this.alertType = "danger";
                    this.modalActive.close();
                }
            });
    }

    openEdit(editnews: any, id: number) {
        this.newsUpdate = this.userNews.filter(n => n.NewsId == id)[0];
        this.modalActive = this.modalService.open(editnews);
    }
    openDelete(deletenews: any, id: number) { 
        this.id = id;       
        this.modalActive = this.modalService.open(deletenews);
    }
}