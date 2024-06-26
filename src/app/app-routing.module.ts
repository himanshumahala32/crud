import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

const routes: Routes = [
  // { path: '', redir, pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'add-user', component: AddEditUserComponent },
  { path: 'edit-user/:id', component: AddEditUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
