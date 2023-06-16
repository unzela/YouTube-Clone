import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import store from '../utils/store';
import { cacheResults } from '../utils/searchSlice';

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    //Debouncing
    //Make an API call after every key press, but if the diff btwn 2 API calls is <200ms decline the API call
    const timer = setTimeout(() => {
      if(searchCache[searchQuery]){
        setSuggestions(searchCache[searchQuery]);
      }else{
        getSearchSuggestions();
      }
     }, 200);

    return () => {
      clearTimeout(timer);
    };
  },[searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    //Update cache
    dispatch(cacheResults({
      [searchQuery]: json[1]
    }));
  }

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  }

  return (
    <div className="grid grid-flow-col p-2 m-2 shadow-lg">

      <div className="flex col-span-1">
        <img onClick={()=>toggleMenuHandler()} className="h-12 cursor-pointer" alt="Menu" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4fCH_Pu_uWRgqR4bXUknjpz07igKC0GvSVQ&usqp=CAU" />
        <img className="h-12 mx-2 cursor-pointer" aly="youtube-logo" src="https://t3.ftcdn.net/jpg/03/00/38/90/240_F_300389025_b5hgHpjDprTySl8loTqJRMipySb1rO0I.jpg"/>
      </div>

      <div className="col-span-10 px-10">
        <div>
          <input 
            className=" px-5 w-1/2 border border-gray-400 p-2 rounded-l-full" type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(e) => setShowSuggestions(true)}
            onBlur={(e) => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 px-2 py-2 rounded-r-full bg-gray-100">🔍</button>
        </div>

        {showSuggestions && (<div className="absolute bg-white py-2 px-3 w-[26rem] shadow-lg rounded-lg border border-gray-200">
          <ul>
            {suggestions.map(s => <li key={s} className="py-2 px-1 shadow-sm hover:bg-gray-100">🔍 {s}</li> )}
          </ul>
        </div>)}
      </div>

      <div className="col-span-1">
        <img className="h-12" alt="user" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"/>
      </div>
    </div>
  )
}

export default Head;