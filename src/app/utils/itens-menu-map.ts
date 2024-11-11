import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ROUTERS_ICONS_MAP } from "./routers-icons-map";

export class ItensMenuMap {
  private readonly _router = inject(Router);

  item_menu_home = {
    title: 'Home',
    icon: ROUTERS_ICONS_MAP.home,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_registration_employee = {
    title: 'Cadastrar funcionário',
    icon: ROUTERS_ICONS_MAP.person_add,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_view_employee = {
    title: 'Visualizar funcionário',
    icon: ROUTERS_ICONS_MAP.person_search,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_registration_user = {
    title: 'Cadastrar usuário',
    icon: ROUTERS_ICONS_MAP.person_add,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_view_user = {
    title: 'Visualizar usuário',
    icon: ROUTERS_ICONS_MAP.person_search,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_registration_donation = {
    title: 'Cadastrar doação',
    icon: ROUTERS_ICONS_MAP.volunteer_activism,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_view_donation = {
    title: 'Visualizar doação',
    icon: ROUTERS_ICONS_MAP.manage_search,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_report_donation = {
    title: 'Relatório de doações',
    icon: ROUTERS_ICONS_MAP.monitoring,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_registration_animal = {
    title: 'Cadastrar animal',
    icon: ROUTERS_ICONS_MAP.pets,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_view_animal = {
    title: 'Visualizar animal',
    icon: ROUTERS_ICONS_MAP.sound_detection_dog_barking,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_report_animal = {
    title: 'Relatório de animais',
    icon: ROUTERS_ICONS_MAP.monitor_heart,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_registration_adoption = {
    title: 'Adoção',
    icon: ROUTERS_ICONS_MAP.adoption,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_view_profile = {
    title: 'Perfil',
    icon: ROUTERS_ICONS_MAP.person,
    redirection: () => {
      this._router.navigate(['/profile']);
    }
  };

  item_menu_logout = {
    title: 'Logout',
    icon: ROUTERS_ICONS_MAP.logout,
    redirection: () => {
      this._router.navigate(['/logout']);
    }
  };
}
