import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import insightsReducer from "./industry-slice";
import coverLetterReducer from "./cover-letter-slice";
import resumeReducer from "./resume-slice";
import assessmentsReducer from "./assessment-slice";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage"; 

const rootReducer = combineReducers({
  auth: authReducer,
  insights: insightsReducer,
  coverLetter: coverLetterReducer,
  resume: resumeReducer,
  assessments: assessmentsReducer
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {     
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
