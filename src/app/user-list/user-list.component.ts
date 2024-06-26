import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2; // Default number of users per page
  filteredUsers: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
    this.applyFilter();
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }

  editUser(user: any) {
    const index = this.users.indexOf(user);
    this.router.navigate(['/edit-user', index]);
  }

  deleteUser(user: any) {
    const index = this.users.indexOf(user);
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(index);
      this.loadUsers();
    }
  }

  applyFilter() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1; // Reset to first page when filtering
  }

  getPaginatedUsers(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  changeItemsPerPage(value: any) {
    const selectedValue = parseInt(value, 10); // Parse the value to integer
    if (!isNaN(selectedValue)) {
      this.itemsPerPage = selectedValue;
      this.currentPage = 1; // Reset to first page when changing items per page
    }
  }
}
