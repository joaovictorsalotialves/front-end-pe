import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export const handleError = (error: HttpErrorResponse): Observable<never> => {
  let errorMessage = 'An unknown error occurred!';
  if (error.error instanceof ErrorEvent) {
    // Erro no lado do cliente
    errorMessage = `Client-side error: ${error.error.message}`;
  } else {
    // Erro no lado do servidor
    switch (error.status) {
      case 400:
        errorMessage = 'Bad request: Verifique os dados de entrada.';
        break;
      case 404:
        errorMessage = 'Erro: Recurso não encontrado.';
        break;
      case 401:
        errorMessage = 'Unauthorized: Credenciais inválidas.';
        break;
      case 500:
        errorMessage = 'Internal server error: Tente novamente mais tarde.';
        break;
      default:
        errorMessage = `Erro: ${error.status} - ${error.message}`;
    }
  }
  console.error('Error details:', error);
  return throwError(() => new Error(errorMessage));
}
