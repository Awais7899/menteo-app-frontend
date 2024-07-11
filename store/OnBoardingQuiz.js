import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {makeApiRequest} from '../src/Axios/ApiRequests';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const quizQuestion = createAsyncThunk(
  'quizQuestion',
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
const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    isLaoding: false,
    data: {},
    questionNo: 0,
  },
  reducers: {
    updateQuestion: (state, action) => {
      state.questionNo = action.payload + 1;
    },
    updateQuestionData: (state, action) => {
      state.data = action.payload;
    },
    getQuestionNo: (state, action) => {
      state.questionNo = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(quizQuestion.pending, state => {
      state.isLaoding = true;
    });
    builder.addCase(quizQuestion.fulfilled, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
      AsyncStorage.setItem('quiz-questions', JSON.stringify(action.payload));
    });
    builder.addCase(quizQuestion.rejected, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
    });
  },
});

export const {getQuestionNo} = quizSlice.actions;
export const {updateQuestionData} = quizSlice.actions;
export const {updateQuestion} = quizSlice.actions;
export default quizSlice.reducer;
