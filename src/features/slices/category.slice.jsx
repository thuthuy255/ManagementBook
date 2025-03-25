import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: []
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    }
  }
});

export const { setCategories } = categorySlice.actions;
export const getCategories = (state) => state.category.categories;
export default categorySlice.reducer;
