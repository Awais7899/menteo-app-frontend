import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {makeApiRequest} from '../src/Axios/ApiRequests';
import Toast from 'react-native-simple-toast';
export const unitDataAction = createAsyncThunk(
  'unitDataAction',
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
const unitDataSlice = createSlice({
  name: 'unitData',
  initialState: {
    isLaoding: true,
    data: {},
  },
  extraReducers: builder => {
    builder.addCase(unitDataAction.pending, state => {
      state.isLaoding = true;
    });
    builder.addCase(unitDataAction.fulfilled, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
    });
    builder.addCase(unitDataAction.rejected, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
    });
  },
});

export default unitDataSlice.reducer;
