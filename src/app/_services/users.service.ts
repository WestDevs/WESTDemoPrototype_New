import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../_models/Users';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl: string = environment.baseUrl + 'api/';

    constructor(private http: HttpClient) { }

    public addUser(user: Users) {
        return this.http.post(this.baseUrl + 'users', user);
    }

    public updateUser(id: number, user: Users) {
        return this.http.put(this.baseUrl + 'users/' + id, user);
    }

    public getUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(this.baseUrl + `users`);
    }

    public deleteUser(id: number) {
        return this.http.delete(this.baseUrl + 'users/' + id);
    }

    public getUserById(id): Observable<Users> {
        return this.http.get<Users>(this.baseUrl + 'users/' + id);
    }

    public searchUsers(searchedValue: string): Observable<Users[]> {
        return this.http.get<Users[]>(`${this.baseUrl}users/search-book-with-category/${searchedValue}`);
    }
}