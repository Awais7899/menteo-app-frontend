import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {makeApiRequest} from '../src/Axios/ApiRequests';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const introQuestion = createAsyncThunk(
  'introQuestion',
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
const introSlice = createSlice({
  name: 'intro',
  initialState: {
    isLaoding: true,
    data: {},
  },
  reducers: {
    updateIntroQuestion: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(introQuestion.pending, state => {
      state.isLaoding = true;
    });
    builder.addCase(introQuestion.fulfilled, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
      AsyncStorage.setItem('intro-questions', JSON.stringify(action.payload));
    });
    builder.addCase(introQuestion.rejected, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
    });
  },
});
export const {updateIntroQuestion} = introSlice.actions;
export default introSlice.reducer;
