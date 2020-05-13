import { configureStore } from "@reduxjs/toolkit";
import wikiReducer from "../features/wikiviewer/wikiSlice";

export default configureStore({
    reducer: {
        wiki: wikiReducer,
    },
});
