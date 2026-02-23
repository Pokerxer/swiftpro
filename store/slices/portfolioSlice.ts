import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

interface PortfolioState {
  activeFilter: string;
}

const initialState: PortfolioState = {
  activeFilter: "all",
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
    resetFilter: (state) => {
      state.activeFilter = "all";
    },
  },
});

export const { setFilter, resetFilter } = portfolioSlice.actions;
export default portfolioSlice.reducer;
