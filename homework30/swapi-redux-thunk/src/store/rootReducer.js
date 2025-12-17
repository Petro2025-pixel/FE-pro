import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSwapiThunk = createAsyncThunk(
  'swapi/fetchAllSwapi',
  async (endpoint, { rejectWithValue }) => {
    try {
      const cleanEndpoint = endpoint
        .trim()
        .replace(/^\/+|\/+$/g, '')
        .toLowerCase();

      const res = await fetch(`https://swapi.info/api/${cleanEndpoint}`);
      
      if (!res.ok) {
            return rejectWithValue(`Endpoint "${cleanEndpoint}" not found (Error ${res.status})`);
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
  value: 0,
  swapis: [],
  loading: false, 
  error: null     
},
  reducers: {
    incremented: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    },
    clearSwapis: (state) => {
      state.swapis = []; 
    }
  },
  extraReducers: (builder) => {
  builder
    .addCase(fetchSwapiThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSwapiThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.swapis.push(action.payload); 
    })
    .addCase(fetchSwapiThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
},
})

export const { incremented, decremented, clearSwapis } = counterSlice.actions
export const {reducer} = counterSlice