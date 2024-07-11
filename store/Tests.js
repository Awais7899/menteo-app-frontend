import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {makeApiRequest} from '../src/Axios/ApiRequests';
import Toast from 'react-native-simple-toast';
export const testsData = createAsyncThunk(
  'testsData',
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

const testSlice = createSlice({
  name: 'test',
  initialState: {
    isLaoding: false,
    data: {},
    testNo: 0,
    testsProgressBar: [],
  },
  reducers: {
    updateTest: (state, action) => {
      state.testNo = action.payload + 1;
    },
    setTestInitialState: (state, action) => {
      state.testNo = action.payload.testNo;
      state.testsProgressBar = action.payload.progressBar;
    },
    updateTestProgressBar: (state, action) => {
      state.testsProgressBar.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(testsData.pending, state => {
      state.isLaoding = true;
    });
    builder.addCase(testsData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLaoding = false;
    });
    builder.addCase(testsData.rejected, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
    });
  },
});

export const {updateTestProgressBar} = testSlice.actions;
export const {setTestInitialState} = testSlice.actions;
export const {updateTest} = testSlice.actions;
export default testSlice.reducer;
