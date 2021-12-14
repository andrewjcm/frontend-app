// Return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// Return the token from the session session storage
export const getToken = () => {
  return sessionStorage.getItem('access') || null;
}

// Return the refresh token from the session storage
export const getRefresh = () => {
  return sessionStorage.getItem('refresh') || null;
}

// Remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('access');
  sessionStorage.removeItem('refresh');
  sessionStorage.removeItem('user');
}

// Set the token and user from the session storage
export const setUserSession = (access, refresh, user) => {
  sessionStorage.setItem('access', access);
  sessionStorage.setItem('refresh', refresh);
  sessionStorage.setItem('user', JSON.stringify(user));
}

export const setFormResponse = (response) => {
  sessionStorage.setItem('formResponse', JSON.stringify(response));
}

export const getFormResponse = () => {
  const responseStr = sessionStorage.getItem('formResponse');
  if (responseStr) return JSON.parse(responseStr);
  else return null;
}

export const removeFormResponse = () => {
  sessionStorage.removeItem('formResponse');
}
