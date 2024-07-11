import {createSlice} from '@reduxjs/toolkit';
import {makeApiRequest} from '../src/Axios/ApiRequests';
import Toast from 'react-native-simple-toast';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    data: {},
  },
  reducers: {
    navigationScreen: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {navigationScreen} = navigationSlice.actions;
export default navigationSlice.reducer;
