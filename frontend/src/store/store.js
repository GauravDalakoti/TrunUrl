import { configureStore } from "@reduxjs/toolkit"
import authentication from "./authentication.js"

const store = configureStore({

    reducer: {

        auth: authentication,
    }
})

export default store