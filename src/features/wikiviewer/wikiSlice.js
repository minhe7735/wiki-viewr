import { createSlice } from "@reduxjs/toolkit";

export const wikiSlice = createSlice({
    name: "wiki",
    initialState: {
        wikiSearch: "",
        results: [],
    },
    reducers: {
        updateWikiSearch: (state, action) => {
            state.wikiSearch = action.payload;
            console.log(state.wikiSearch);
        },
        updateResults: (state, action) => {
            state.results = action.payload;
            console.log(state.results);
        },
    },
});

export const { updateWikiSearch, updateResults } = wikiSlice.actions;

export const loadAsync = (searchTerm) => async (dispatch) => {
    let response = await fetch(
        `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${searchTerm}&utf8=&format=json`
    );
    let wiki = await response.json();
    dispatch(updateResults(wiki.query.search));
};
export const selectWiki = (state) => state.wiki.wikiSeach;
export const selectResults = (state) => state.wiki.results;

export default wikiSlice.reducer;
