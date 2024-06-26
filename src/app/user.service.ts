import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersKey = 'users';

  constructor() {
    if (!localStorage.getItem(this.usersKey)) {
      localStorage.setItem(this.usersKey, JSON.stringify([]));
    }
  }

  getUsers() {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }

  addUser(user: any) {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  updateUser(index: number, user: any) {
    const users = this.getUsers();
    users[index] = user;
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  deleteUser(index: number) {
    const users = this.getUsers();
    users.splice(index, 1);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}

