import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {makeApiRequest} from '../src/Axios/ApiRequests';
import Toast from 'react-native-simple-toast';
export const userAppData = createAsyncThunk(
  'userAppData',
  async (data, {rejectWithValue}) => {
    try {
      const result = await makeApiRequest(
        data.endPoint,
        data.method,
        data.data,
        data.headers,
      );
      return result;
    } catch (error) {
      Toast.show(error.message);
      return rejectWithValue(error.message);
    }
  },
);

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    isLaoding: false,
    data: {},
  },
  extraReducers: builder => {
    builder.addCase(userAppData.pending, state => {
      state.isLaoding = true;
    });
    builder.addCase(userAppData.fulfilled, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
    });
    builder.addCase(userAppData.rejected, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
    });
  },
});

export default userDataSlice.reducer;
