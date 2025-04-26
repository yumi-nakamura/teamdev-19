import React from "react";
import Style from "./SearchBar.module.css";

export const SearchBar = () => {
  return (
    <div className={Style.searchBerUI}>
      <input
        type="text"
        placeholder="Search..."
        className={Style.searchBerInput}
      />
      <span className={Style.searchIcon}></span>
    </div>
  );
};
