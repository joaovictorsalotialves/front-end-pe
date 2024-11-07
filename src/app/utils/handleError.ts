// handleError.js
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export const handleError = (error: HttpErrorResponse) => {
  let errorMessage = 'An unknown error has occurred';

  if (error instanceof HttpErrorResponse) {
    errorMessage = `${error.status}: ${error.error?.message}` || `Error ${error.status}: ${error.statusText}`;
  }

  console.error('ERROR:', error);
  return throwError(() => new Error(errorMessage));
};
