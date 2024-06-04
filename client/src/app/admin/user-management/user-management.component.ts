import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';

interface RoleItem {
  name: string;
  value: string;
  checked: boolean;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users?: Partial<User[]>; 
  bsModalRef?: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    });
  }

  openRolesModal(user?: User) {
    if (!user) return; 

    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe((values: RoleItem[]) => {
      const rolesToUpdate = {
        roles: [...values.filter((el: RoleItem) => el.checked).map((el: RoleItem) => el.name)]
      };
      if (rolesToUpdate.roles.length) {
        this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(() => {
          user.roles = [...rolesToUpdate.roles];
        });
      }
    });
  }

  private getRolesArray(user: User): RoleItem[] {
    const roles: RoleItem[] = [];
    const userRoles = user.roles;
    const availableRoles: RoleItem[] = [
      { name: 'Admin', value: 'Admin', checked: false },
      { name: 'Moderator', value: 'Moderator', checked: false },
      { name: 'Member', value: 'Member', checked: false }
    ];

    availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        roles.push(role);
      }
    });
    return roles;
  }
}