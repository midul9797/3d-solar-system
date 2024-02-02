import { createSlice } from "@reduxjs/toolkit";

const initialState: Record<string, string | boolean> = {
  planet: "",
  closed: true,
};
const planetSlice = createSlice({
  name: "planet",
  initialState,
  reducers: {
    setPlanet: (state, action) => {
      state.planet = action.payload;
    },
    setClosed: (state, action) => {
      state.closed = action.payload;
    },
  },
});

export const { setPlanet, setClosed } = planetSlice.actions;

export default planetSlice.reducer;
