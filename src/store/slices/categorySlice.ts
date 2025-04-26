import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface CategoryState {
  activeCategory: string | null
}

const initialState: CategoryState = {
  activeCategory: "men", 
}

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload
    },
  },
})

export const { setActiveCategory } = categorySlice.actions
export default categorySlice.reducer