import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../../interfaces/employees/employee.interface';
import { PhonePipe } from '../../../pipes/phone.pipe';
import { UsersService } from '../../../services/users.service';
import { ROUTERS_ICONS_MAP } from '../../../utils/routers-icons-map';

@Component({
  selector: 'app-view-user-page',
  templateUrl: './view-user-page.component.html',
  styleUrl: './view-user-page.component.scss',
  providers: [PhonePipe]
})
export class ViewUserPageComponent {
  userLogged = {} as IEmployee;

  usersList: { id: number; values: { key: string; value: string | undefined | null; }[] }[] = [];

  routersIconsMap = ROUTERS_ICONS_MAP;

  private readonly _router = inject(Router);
  private readonly _usersService = inject(UsersService);

  constructor(private phonePipe: PhonePipe) { }

  loadingPage(user: IEmployee) {
    this.userLogged = user;
    this.filterUsersList();
  }

  filterUsersList(nameUser: string | undefined = undefined) {
    this._usersService.getUsers(nameUser).pipe().subscribe({
      next: (usersList) => {
        const transformedUsersList = usersList?.map((user) => ({
          id: user.idUser,
          values: [
            { key: 'Nome', value: user.nameUser },
            { key: 'Email', value: user.email },
            { key: 'Celular', value: this.phonePipe.transform(user.cellPhoneNumber) },
          ]
        }))
        this.usersList = transformedUsersList || [];
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  search(value: string) {
    this.filterUsersList(value);
  }
}
