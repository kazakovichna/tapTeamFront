import axios from 'axios'

export default {

    // This is books api requests
    async ADD_BOOKS({state}, bookData) {
        console.log(state.books)
         await axios
            .post('http://127.0.0.1:8000/book',
                JSON.stringify(bookData))
                .then((events) => {
                    console.log(events)
                })
            .catch((error) => {
                console.log(error)
            })
    },
    async GET_ALL_BOOKS({commit}) {
        await axios
            .get('http://127.0.0.1:8000/book')
            .then((events) => {
                commit('SET_BOOKS', events.data)
            })
            .catch((error) => {
                console.log('hey im here error')
                console.log(error.data)
                return error
            })
    },
    async UPDATE_BOOK({state}, updateBookData) {
        console.log("Im calling")
        console.log(state.books)
        await axios
            .post(`http://127.0.0.1:8000/book/${updateBookData.book_id}`,
                JSON.stringify(updateBookData))
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async DELETE_BOOK({state}, book_id) {
        console.log(state.books)
        await axios
            .delete(`http://127.0.0.1:8000/book/${book_id}`)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    // This is author api request, I'm gonna add store's modules later
    async GET_ALL_AUTHORS({commit}) {
        await axios
            .get('http://127.0.0.1:8000/author')
            .then((events) => {
                commit('SET_AUTHOR', events.data)
            })
            .catch((error) => {
                console.log('hey im here error')
                console.log(error.data)
                return error
            })
    },
    async ADD_AUTHOR({state}, authorData) {
        console.log(state.authors)
        console.log(JSON.stringify(authorData))
        await axios
            .post('http://127.0.0.1:8000/author',
                JSON.stringify(authorData))
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}