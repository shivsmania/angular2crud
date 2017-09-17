import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
    Router,
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';


import { UserService } from '../services/user.service';
import { IUser } from '../models/IUser';

@Component({
    selector: 'nav-app',
    templateUrl: 'app/templates/nav.template.html',
    providers: [UserService, NgbActiveModal]
})
export class NavComponent implements OnInit {
    
    currentUser: IUser;
    user = new IUser();
    closeResult: string;
    message: string;
    alertType: string;

    constructor(private _router: Router, private slimLoadingBarService: SlimLoadingBarService, private modalService: NgbModal, private modalActive: NgbActiveModal, private _userService: UserService) {
        _router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event)
        })
    }

    open(login: any) {
        this.modalActive = this.modalService.open(login);
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));                   
    }

    onLoginSubmit() {
        this._userService.loginUser("http://localhost:49897/api/user/login", this.user)
            .subscribe(
            (data) => {
                if (data == null) {
                    this.message = "Wrong username or password";
                    this.alertType = "danger";
                } else {
                    sessionStorage.setItem("currentUser", JSON.stringify(data));
                    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
                    this.modalActive.close();
                    this._router.navigate(['home']);
                    window.location.reload();
                }
            });        
    }

    logout(): void {
        console.log("logout");
        sessionStorage.removeItem('currentUser');
        this.currentUser = null;
        //window.location.reload();
    }
   
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.slimLoadingBarService.start();
        }
        if (event instanceof NavigationEnd) {
            this.slimLoadingBarService.complete();
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.slimLoadingBarService.stop();
        }
        if (event instanceof NavigationError) {
            this.slimLoadingBarService.stop();
        }
    }

}