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
      this._router.navigate(['/employees/create']);
    }
  };

  item_menu_view_employee = {
    title: 'Visualizar funcionários',
    icon: ROUTERS_ICONS_MAP.person_search,
    redirection: () => {
      this._router.navigate(['/employees/view']);
    }
  };

  item_menu_registration_user = {
    title: 'Cadastrar usuário',
    icon: ROUTERS_ICONS_MAP.person_add,
    redirection: () => {
      this._router.navigate(['/users/create']);
    }
  };

  item_menu_view_user = {
    title: 'Visualizar usuários',
    icon: ROUTERS_ICONS_MAP.person_search,
    redirection: () => {
      this._router.navigate(['/users/view']);
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

  item_menu_registration_donation_category = {
    title: 'Cadastrar categoria de doação',
    icon: ROUTERS_ICONS_MAP.add_circle,
    redirection: () => {
      this._router.navigate(['/donation-categories/create']);
    }
  };

  item_menu_view_donation_category = {
    title: 'Visualizar categorias doações',
    icon: ROUTERS_ICONS_MAP.wysiwyg,
    redirection: () => {
      this._router.navigate(['/donation-categories/view']);
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
    title: 'Visualizar animais',
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

  item_menu_registration_species = {
    title: 'Cadastrar espécies',
    icon: ROUTERS_ICONS_MAP.add_circle,
    redirection: () => {
      this._router.navigate(['/species/create']);
    }
  };

  item_menu_view_species = {
    title: 'Visualizar espécies',
    icon: ROUTERS_ICONS_MAP.wysiwyg,
    redirection: () => {
      this._router.navigate(['/species/view']);
    }
  };

  item_menu_registration_race = {
    title: 'Cadastrar raça',
    icon: ROUTERS_ICONS_MAP.add_circle,
    redirection: () => {
      this._router.navigate(['/races/create']);
    }
  };

  item_menu_view_race = {
    title: 'Visualizar raça',
    icon: ROUTERS_ICONS_MAP.wysiwyg,
    redirection: () => {
      this._router.navigate(['/races/view']);
    }
  };

  item_menu_registration_adoption = {
    title: 'Adoção',
    icon: ROUTERS_ICONS_MAP.adoption,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_registration_expense = {
    title: 'Cadastrar despensa',
    icon: ROUTERS_ICONS_MAP.add_card,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_view_expense = {
    title: 'Visualizar despensa',
    icon: ROUTERS_ICONS_MAP.wysiwyg,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_report_expense = {
    title: 'Relatório de despensa',
    icon: ROUTERS_ICONS_MAP.payments,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_registration_expense_category = {
    title: 'Cadastrar categoria de despensa',
    icon: ROUTERS_ICONS_MAP.add_circle,
    redirection: () => {
      this._router.navigate(['/expense-categories/create']);
    }
  };

  item_menu_view_expense_category = {
    title: 'Visualizar categoria de despensa',
    icon: ROUTERS_ICONS_MAP.wysiwyg,
    redirection: () => {
      this._router.navigate(['/expense-categories/view']);
    }
  };

  item_menu_registration_supplement = {
    title: 'Cadastrar insumo',
    icon: ROUTERS_ICONS_MAP.set_meal,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_view_supplement = {
    title: 'Visualizar insumos',
    icon: ROUTERS_ICONS_MAP.wysiwyg,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_report_supplement = {
    title: 'Relatório de insumos',
    icon: ROUTERS_ICONS_MAP.inventory,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_registration_supplement_category = {
    title: 'Cadastrar categoria de insumo',
    icon: ROUTERS_ICONS_MAP.add_circle,
    redirection: () => {
      this._router.navigate(['/supplement-categories/create']);
    }
  };

  item_menu_view_supplement_category = {
    title: 'Visualizar categorias de insumos',
    icon: ROUTERS_ICONS_MAP.wysiwyg,
    redirection: () => {
      this._router.navigate(['/supplement-categories/view']);
    }
  };

  item_menu_registration_supplement_input = {
    title: 'Cadastrar entrada de insumos',
    icon: ROUTERS_ICONS_MAP.input,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_view_supplement_input = {
    title: 'Visualizar entrada de insumos',
    icon: ROUTERS_ICONS_MAP.wysiwyg,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_registration_supplement_output = {
    title: 'Cadastrar saída de insumos',
    icon: ROUTERS_ICONS_MAP.output,
    redirection: () => {
      this._router.navigate(['/home']);
    }
  };

  item_menu_view_supplement_output = {
    title: 'Visualizar saídas de insumos',
    icon: ROUTERS_ICONS_MAP.wysiwyg,
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
