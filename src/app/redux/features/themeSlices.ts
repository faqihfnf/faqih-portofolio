import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string; // "dark" atau "" (light)
}

const initialState: ThemeState = {
  theme: "", // default light
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "" : "dark";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
