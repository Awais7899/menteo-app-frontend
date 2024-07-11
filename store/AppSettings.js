import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {makeApiRequest} from '../src/Axios/ApiRequests';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const appSettings = createAsyncThunk(
  'appSettings',
  async (data, {rejectWithValue}) => {
    try {
      const result = await makeApiRequest(data.endPoint, data.method);
      return result;
    } catch (error) {
      Toast.show(error.message);
      return rejectWithValue(error.message);
    }
  },
);
const settingSlice = createSlice({
  name: 'settings',
  initialState: {
    isLaoding: true,
    data: {},
  },
  reducers: {
    updateAppSettings: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(appSettings.pending, state => {
      state.isLaoding = true;
    });
    builder.addCase(appSettings.fulfilled, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
      AsyncStorage.setItem('app-settings', JSON.stringify(action.payload));
    });
    builder.addCase(appSettings.rejected, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
    });
  },
});

export const {updateAppSettings} = settingSlice.actions;
export default settingSlice.reducer;
