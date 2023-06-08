import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Estados
const initialState = {
  loading: false,
  error: null,
  token: [],
};

// Comunicación con BACK.
export const registerUser = createAsyncThunk(
  'product/registerUser',
  async ({ user_email, user_password }) => {
    try {
      const response = await axios.post(
        'https://servidor-teesa.onrender.com/signup',
        { user_email, user_password }
      );
      return response.data;
    } catch (error) {
      // Manejar cualquier error aquí
      throw new Error(error.response.data);
    }
  }
);

// Slice Login
const registerSlice = createSlice({
  name: 'registerState',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    // Acciones relacionadas con el inicio de sesión
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      //state.token = payload.token
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
      //   state.error = action.error.message;
    });
  },
});

export default registerSlice.reducer;
