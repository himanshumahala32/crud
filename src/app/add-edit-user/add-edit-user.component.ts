
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  userForm: FormGroup;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.userId = +id;
        const user = this.userService.getUsers()[this.userId];
        this.userForm.setValue({
          name: user.name,
          email: user.email,
          role: user.role
        });
      }
    });
  }

  onSave() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      if (this.userId !== null) {
        this.userService.updateUser(this.userId, user);
      } else {
        this.userService.addUser(user);
      }
      this.router.navigate(['/users']);
    }
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}
