import { createSlice } from '@reduxjs/toolkit';
import { defaultState } from '../utils';
const initialState = defaultState();

const gameSlice = createSlice({
    name:'game',
    initialState,
    reducers:{

    }
})
export default gameSlice.reducer;
