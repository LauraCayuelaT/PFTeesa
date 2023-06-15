import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

const cookies = new Cookies();

// Estados
const initialState = {
  user: null,
  userData: {
    userId: null,
    userName: null,
    userType: null,
    userEmail: null,
    userNit: null,
    userAddress: null,
    userPhone: null,
  },
};

// Slice Login
const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = true;
  //     userEmail: null,
  //   userNit: null,
  //   userAddress: null,
  //   userPhone: null,
  // },
      state.userData.userId = action.payload.userId;
      state.userData.userName = action.payload.userName;
      state.userData.userType = action.payload.userType;
      state.userData.userEmail = action.payload.userEmail;
      state.userData.userNit = action.payload.userNit;
      state.userData.userAddress = action.payload.userAddress;
      state.userData.userPhone = action.payload.userPhone;
    },
    resetUserState: (state) => {
      state.user = false;
      state.userData.userId = null;
      state.userData.userName = null;
      state.userData.userType = null;
      state.userData.userEmail = null
      state.userData.userNit = null
      state.userData.userAddress = null
      state.userData.userPhone = null
      state.userIsLoaded = false; // Reiniciar el estado userIsLoaded
    },
    // Nuevo reducer para obtener la información de la cookie
    getUserDataFromCookie: (state) => {
      const userDataCookie = cookies.get('token');
      if (userDataCookie) {
        const userData = jwt_decode(userDataCookie);
        state.user = true;
        state.userData.userName = userData.nombre;
        state.userData.userType = userData.tipo;
        state.userData.userId = userData.sub;
        state.userData.userEmail = userData.correo;
        state.userData.userNit = userData.nit;
        state.userData.userAddress = userData.direccion;
        state.userData.userPhone = userData.telefono;
      }
    },

    //*Google Login
    saveUserNameToCookie: (state, action) => {
      const { nombre } = action.payload;
      cookies.set('nombreGoogle', nombre, { path: '/', overwrite: true });
      state.user = true;
      state.userData.userName = nombre;
    },
    getUserNameFromCookie: (state) => {
      const userNameCookie = cookies.get('nombreGoogle');
      if (userNameCookie) {
        state.user = true;
        state.userData.userName = userNameCookie;
      }
    },
  },
});

export const {
  setUser,
  resetUserState,
  getUserDataFromCookie,
  saveUserNameToCookie,
  getUserNameFromCookie,
} = userSlice.actions;

export default userSlice.reducer;
