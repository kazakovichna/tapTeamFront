export default {
    GET_BOOKS: state => {
        return state.books
    },
    GET_AUTHORS: state => {
        return state.authors
    },
    GETTER_SQL_SPECIAL: state => {
        return state.sql_data
    },
    GETTER_ORM_SPECIAL: state => {
        return state.orm_data
    }
}