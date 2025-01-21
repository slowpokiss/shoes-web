import { createSlice } from "@reduxjs/toolkit";
import { cardInterface } from "../interface/interface";

export interface initialMainSliceInterface {
  currCategory: {
    offset: number;
    currOffset: number;
    id: number | string;
    currItems: cardInterface[];
  };
  searchState: boolean;
}

const mainSlice = createSlice({
  name: "categorySlice",
  initialState: {
    currCategory: {
      offset: 6,
      currOffset: 0,
      id: 10,
      currItems: [],
    },
    searchState: true,
  } satisfies initialMainSliceInterface as initialMainSliceInterface,
  reducers: {
    setCategory(state, action) {
      state.currCategory.id = action.payload.settingCategory;
    },
    setOffset(state, action) {
      state.currCategory.offset = action.payload.settingOffset;
    },
    updateCurrOffset(state, action) {
      state.currCategory.currOffset = action.payload.offset;
    },
    updateCurrItems(state, action) {
      state.currCategory.currItems.push(...action.payload.newItems);
    },
    clearCurrItems(state) {
      state.currCategory.currItems = [];
    },
    setSearchState(state) {
      state.searchState = !state.searchState;
    },
  },
});

export const {
  setCategory,
  setSearchState,
  setOffset,
  updateCurrOffset,
  updateCurrItems,
  clearCurrItems,
} = mainSlice.actions;
export default mainSlice.reducer;
