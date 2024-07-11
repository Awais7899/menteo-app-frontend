import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {makeApiRequest} from '../src/Axios/ApiRequests';
import Toast from 'react-native-simple-toast';
export const lessonsData = createAsyncThunk(
  'lessonsData',
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

const learningSlice = createSlice({
  name: 'lesson',
  initialState: {
    isLaoding: false,
    data: {},
    lessonNo: 0,
    learningProgressBar: [],
  },
  reducers: {
    updateLearning: (state, action) => {
      state.lessonNo = action.payload + 1;
    },
    setLearningInitialState: (state, action) => {
      state.lessonNo = action.payload.lessonNo;
      state.learningProgressBar = action.payload.progressBar;
    },
    updateLearningProgressBar: (state, action) => {
      state.learningProgressBar.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(lessonsData.pending, state => {
      state.isLaoding = true;
    });
    builder.addCase(lessonsData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLaoding = false;
    });
    builder.addCase(lessonsData.rejected, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
    });
  },
});

export const {updateLearningProgressBar} = learningSlice.actions;
export const {setLearningInitialState} = learningSlice.actions;
export const {updateLearning} = learningSlice.actions;
export default learningSlice.reducer;
