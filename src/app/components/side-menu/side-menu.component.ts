import { Component } from '@angular/core';
import { ROUTERS_ICONS_MAP } from '../../utils/routers-icons-map';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  item_menu_home = {
    title: 'Home',
    icon: ROUTERS_ICONS_MAP.home
  };

  item_menu_registration_employee = {
    title: 'Cadastrar funcionário',
    icon: ROUTERS_ICONS_MAP.person_add
  };
  item_menu_view_employee = {
    title: 'Visualizar funcionário',
    icon: ROUTERS_ICONS_MAP.person_search
  };

  item_menu_registration_user = {
    title: 'Cadastrar usuario',
    icon: ROUTERS_ICONS_MAP.person_add
  };
  item_menu_view_user = {
    title: 'Visualizar usuario',
    icon: ROUTERS_ICONS_MAP.person_search
  };

  item_menu_registration_donation = {
    title: 'Cadastrar doação',
    icon: ROUTERS_ICONS_MAP.volunteer_activism
  };
  item_menu_view_donation = {
    title: 'Visualizar doação',
    icon: ROUTERS_ICONS_MAP.manage_search
  };
  item_menu_report_donation = {
    title: 'Relatório de doações',
    icon: ROUTERS_ICONS_MAP.monitoring
  };

  item_menu_registration_animal = {
    title: 'Cadastrar animal',
    icon: ROUTERS_ICONS_MAP.pets
  };
  item_menu_view_animal = {
    title: 'Visualizar animal',
    icon: ROUTERS_ICONS_MAP.sound_detection_dog_barking
  };
  item_menu_report_animal = {
    title: 'Relatório de animais',
    icon: ROUTERS_ICONS_MAP.monitor_heart
  };

  item_menu_registration_adoption = {
    title: 'Adoção',
    icon: ROUTERS_ICONS_MAP.adoption
  };

  item_menu_view_profile = {
    title: 'Perfil',
    icon: ROUTERS_ICONS_MAP.person
  };
  item_menu_logout = {
    title: 'Logout',
    icon: ROUTERS_ICONS_MAP.logout
  };
}
