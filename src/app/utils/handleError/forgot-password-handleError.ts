import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export const ForgotPasswordHandleError = (error: HttpErrorResponse): Observable<never> => {
  let errorMessage = 'An unknown error occurred!';

  if (error.error instanceof ErrorEvent) {
    // Erro no lado do cliente
    errorMessage = `Client-side error: ${error.error.message}`;
  } else {
    // Erro no lado do servidor
    switch (error.status) {
      case 400:
        errorMessage = 'Bad request: Faltam campos obrigatórios ou a solicitação está mal formada.';
        break;
      case 404:
        errorMessage = 'No account found: Não há conta vinculada a este e-mail.';
        break;
      case 500:
        if (error.error && error.error.message) {
          errorMessage = `Erro interno do servidor: ${error.error.message}`;
        } else {
          errorMessage = 'Internal server error: Ocorreu um problema no servidor, tente novamente mais tarde.';
        }
        break;
      default:
        errorMessage = `Erro inesperado: ${error.status} - ${error.message}`;
    }
  }

  console.error('Error details:', error);
  return throwError(() => new Error(errorMessage));
};
