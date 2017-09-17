import { IUser } from './IUser';


export class NewsUpdate {
    NewsId: number;
    Title: string;
    Exerpt: string;
    Source: string;
    Category: string;
    Region: string;
    PostedDate: string;
    UserId: number;
    TableUser: IUser;
}
