import axios from 'axios'

export default {
    async ADD_BOOKS(formData) {
         await axios
            .post('http://127.0.0.1:8000/book',
                formData
                )
                .then((events) => {
                    console.log(events.data)
                    return events
                })
            .catch((error) => {
                console.log(error)
                return error
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
    async UPDATE_BOOK(updateBookData) {
        // await axios
        //     .post()
        console.log(updateBookData)
    }
}