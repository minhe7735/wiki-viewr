import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    loadAsync,
    selectWiki,
    updateWikiSearch,
    selectResults,
} from "./wikiSlice";
import parse from "html-react-parser";

function Wiki() {
    const wiki = useSelector(selectWiki);
    const results = useSelector(selectResults);

    const dispatch = useDispatch();
    return (
        <div className="pt-10 flex flex-col justify-center items-center">
            <button
                className="bg-orange-300 p-3 rounded-lg hover:opacity-75"
                onClick={(e) => {
                    window.open("https://en.wikipedia.org/wiki/Special:Random");
                    e.preventDefault();
                }}
            >
                Click for random article
            </button>
            <br />
            <div>
                <form
                    onSubmit={(e) => {
                        dispatch(loadAsync(e.target.search.value));
                        e.preventDefault();
                    }}
                >
                    <input
                        type="text"
                        className="h-10 w-64 rounded-lg bg-gray-200 p-1"
                        placeholder="What do you want to search"
                        name="search"
                        onChange={(e) =>
                            dispatch(updateWikiSearch(e.target.value))
                        }
                    />
                    <button
                        type="submit"
                        className="ml-3 bg-orange-300 p-2 rounded-lg hover:opacity-75"
                    >
                        Search
                    </button>
                </form>
            </div>
            <div>
                {results.map((result) => (
                    <div
                        key={result.pageid}
                        onClick={(e) => {
                            window.open(
                                `https://en.wikipedia.org/wiki/${result.title
                                    .split(" ")
                                    .join("_")}`
                            );
                            e.preventDefault();
                        }}
                        className="bg-white my-5 mx-5  rounded-b-lg px-2 cursor-pointer hover:bg-red-400"
                    >
                        <h2 className="pb-3 font-bold">{result.title}</h2>
                        {parse(`<p>${result.snippet}</p>`)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wiki;
