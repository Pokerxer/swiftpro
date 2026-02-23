import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isMobileMenuOpen: boolean;
  activeModal: string | null;
  theme: "light" | "dark";
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  activeModal: null,
  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const {
  toggleMobileMenu,
  closeMenu,
  openModal,
  closeModal,
  setTheme,
  toggleTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
