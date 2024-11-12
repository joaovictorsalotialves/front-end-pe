import { ROUTERS_ICONS_MAP } from "./routers-icons-map";

export const INPUTS_FORM_MAP = {
  inputEmail: {
    type: 'email',
    id: 'email',
    name: 'email',
    placeholder: 'Email',
    icon: ROUTERS_ICONS_MAP.email,
  },
  inputPassword: {
    type: 'password',
    id: 'password',
    name: 'password',
    placeholder: 'Senha',
    icon: ROUTERS_ICONS_MAP.lock,
  },
  inputNewPassword: {
    type: 'password',
    id: 'newPassword',
    name: 'newPassword',
    placeholder: 'Senha',
    icon: ROUTERS_ICONS_MAP.lock,
  },
  inputPasswordCheck: {
    type: 'password',
    id: 'passwordCheck',
    name: 'passwordCheck',
    placeholder: 'Repetir Senha',
    icon: ROUTERS_ICONS_MAP.lock,
  },
  inputCode: {
    type: 'text',
    id: 'code',
    name: 'code',
    placeholder: 'Código de verificação',
    icon: ROUTERS_ICONS_MAP.lock,
  },
  inputFullName: {
    type: 'text',
    id: 'fullName',
    name: 'fullName',
    placeholder: 'Nome Completo',
  },
  inputCellPhone: {
    type: 'text',
    id: 'cellPhoneNumber',
    name: 'cellPhoneNumber',
    placeholder: 'Número de Telefone',
  },
  inputPublicPlace: {
    type: 'text',
    id: 'publicPlace',
    name: 'publicPlace',
    placeholder: 'Logradouro',
  },
  inputNeighborhood: {
    type: 'text',
    id: 'neighborhood',
    name: 'neighborhood',
    placeholder: 'Bairro',
  },
  inputNumber: {
    type: 'text',
    id: 'number',
    name: 'number',
    placeholder: 'Número',
  },
  inputAutocompleteState: {
    type: 'text',
    id: 'state',
    name: 'state',
    placeholder: 'Estado',
  },
  inputAutocompleteCity: {
    type: 'text',
    id: 'city',
    name: 'city',
    placeholder: 'Cidade',
  },
  inputAutocompletePosition: {
    type: 'text',
    id: 'position',
    name: 'position',
    placeholder: 'Cargo',
  },
}
