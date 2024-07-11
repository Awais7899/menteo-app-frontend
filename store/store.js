import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import settingsReducer from './AppSettings';
import IntroReducer from './GetIntroQuestion';
import QuizReducer from './OnBoardingQuiz';
import LearningReducer from './Learnings';
import navigationReducer from './NavigationScreen';
import userAppDataReducer from './UserDataSlice';
import TestReducer from './Tests';
import unitDataReducer from './UnitData';
import personaDataReducer from './PersonaData';
export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
    intro: IntroReducer,
    quiz: QuizReducer,
    learnings: LearningReducer,
    navigation: navigationReducer,
    userAppData: userAppDataReducer,
    tests: TestReducer,
    unitData: unitDataReducer,
    personaData: personaDataReducer,
  },
});
