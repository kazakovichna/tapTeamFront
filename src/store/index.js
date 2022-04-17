import { createStore } from "vuex";
import getters from './getters'
import mutations from './mutations'
import commonActions from "./actions/common-actions"
import apies from "./actions/api-request"

const actions = {...commonActions, ...apies}

export default createStore({
    state: {
        books: [],
        authors: []
    },
    mutations: mutations,
    actions: actions,
    getters: getters
})