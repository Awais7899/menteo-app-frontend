import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {makeApiRequest} from '../src/Axios/ApiRequests';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const personDataAction = createAsyncThunk(
  'personDataAction',
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
const personaDataSlice = createSlice({
  name: 'personaData',
  initialState: {
    isLaoding: true,
    data: {},
    completedPersona: [],
  },
  reducers: {
    updateCompletedPersona: (state, action) => {
      state.completedPersona.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(personDataAction.pending, state => {
      state.isLaoding = true;
    });
    builder.addCase(personDataAction.fulfilled, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
      AsyncStorage.setItem(
        'no-of-personas',
        JSON.stringify(action.payload.data.length),
      );
    });
    builder.addCase(personDataAction.rejected, (state, action) => {
      state.isLaoding = false;
      state.data = action.payload;
    });
  },
});

export const {updateCompletedPersona} = personaDataSlice.actions;
export default personaDataSlice.reducer;
