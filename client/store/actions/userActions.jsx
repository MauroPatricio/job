// userActions.js

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const LOGOUT = 'LOGOUT';

// Atualizar nome e foto de perfil
export const updateProfile = (name, photo) => ({
  type: UPDATE_PROFILE,
  payload: { name, photo },
});

// Atualizar localização do usuário
export const updateLocation = (location) => ({
  type: UPDATE_LOCATION,
  payload: location,
});

// Fazer logout
export const logout = () => ({
  type: LOGOUT,
});
