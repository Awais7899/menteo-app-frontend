import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {makeApiRequest} from '../src/Axios/ApiRequests';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userData = createAsyncThunk(
  'userData',
  async (data, {rejectWithValue}) => {
    try {
      const result = await makeApiRequest(
        data.endPoint,
        data.method,
        data.data,
      );
      return result;
    } catch (error) {
      Toast.show(error.message);
      return rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLaoding: false,
    data: {},
  },
  reducers: {
    updateUserData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(userData.pending, state => {
      state.isLaoding = true;
    });
    builder.addCase(userData.fulfilled, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
      AsyncStorage.setItem('user-data', JSON.stringify(action.payload));
    });
    builder.addCase(userData.rejected, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
    });
  },
});

export const {updateUserData} = userSlice.actions;
export default userSlice.reducer;
