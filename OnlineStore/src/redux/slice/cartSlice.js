import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: []
  },
  reducers: {
    "addToCart": (state, action) => {
      let cart_items = [...state.value]
      if (cart_items.find(item => item.id == action.payload.id)) {
        cart_items = cart_items.map(item => {
          return { ...item, quantity: item.quantity + 1 }
        })
        state.value = [...cart_items]
      } else {
        let { id, image, title, price } = action.payload
        cart_items.push({
          id,
          title,
          price,
          image,
          quantity: 1
        })
        state.value = [...cart_items]
      }

    }

  }
})


export const { addToCart } = cartSlice.actions

export default cartSlice.reducer