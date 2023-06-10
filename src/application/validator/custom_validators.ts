export const ValidatePassword = (password: string, throwErr: () => void) => {
  if (password.length < 8) {
    return throwErr();
  }
  if (
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return throwErr();
  }
  return password;
};
