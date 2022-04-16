<template>
  <div class="home-div">
    <div class="new-list-div">
      <input class="new-list-input" v-model="addBook" placeholder="New book..." type="text">
      <div class="new-list-but-div"
           @click="addBookFunc"
      >
        <div class="new-list-but-text">
          Add
        </div>
      </div>
    </div>
    <div class="book-list">
      <div class="book-list-item"
        v-for="book in books"
           :key="book.book_id"
      >
        <div class="error-div">
          {{errorMas[book.book_id - 1]}}
        </div>
        <div class="all-cont-div">
         <div class="book-img"></div>
          <div class="book-name-descr">
            <input class="book-name-input" v-model="book.book_name" @change="updateBook(book.book_id)" placeholder="Book name" type="text">
            <textarea class="book-descr" spellcheck="false" v-model="book.book_descr" @change="updateBook(book.book_id)" placeholder="Book description"/>
          </div>
          <div class="book-year-author">
            <div class="book-year">
              <div class="book-year-text">
                Year:
              </div>
              <input class="book-year-input"
                     v-model="book.book_year"
                     @change="updateBook(book.book_id)"
                     placeholder="Book name"
                     type="number">
            </div>
            <div class="book-author">
              <div class="book-add-author">
                <input type="text" v-model="newAuthor[book.book_id - 1]" placeholder="add Author">
                <div class="book-add-author-but"
                  @click="addAuthor(newAuthor[book.book_id - 1], book.book_id)"
                >
                  Add
                </div>
              </div>
              <div class="book-author-loop">
                <div class="book-author-item"
                  v-for="author in book.book_authorList"
                     :key="author.author_id"
                >
                  <input type="text" v-model="author.author_name" @change="updateBook(book.book_id)" placeholder="Author Name">
                  <div class="delete_author_from_book"
                      @click="removeAuthorFromBook(book.book_id, author.author_id)"
                  >
                    <a>X</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "Home-comp",
  data: () => ({
    addBook: '',
    newAuthor: [],
    errorMas: [],
    books: []
  }),
  computed: {
    ...mapGetters([
        'GET_BOOKS'
    ])
  },
  methods: {
    ...mapActions([
       'ADD_BOOKS',
       'GET_ALL_BOOKS',
        'UPDATE_BOOK'
    ]),
    async updateBook(bookId) {
      let updateBookData = this.books[bookId - 1]

      if (updateBookData.book_name === '') {
        this.errorMas[bookId - 1] = "Empty book name!"
        return ''
      } else { this.errorMas[bookId - 1] = '' }
      if (updateBookData.book_year === '') {
        this.errorMas[bookId - 1] = 'Invalid year of book!'
        return ''
      } else { this.errorMas[bookId - 1] = '' }
      if (updateBookData.book_authorList.length === 0) {
        this.errorMas[bookId - 1] = 'Empty author!'
        return ''
      } else { this.errorMas[bookId - 1] = '' }

      await this.UPDATE_BOOK(updateBookData);
      await this.GET_ALL_BOOKS()
      this.books = this.GET_BOOKS
    },
    updateAuthor() {
      console.log('Hey im update author')
    },
    addBookFunc() {
      this.ADD_BOOKS(this.addBook)
    },
    async addAuthor(author_name, book_id) {
      const newAuthor = {
            "author_id": 0,
            "author_name":author_name
      }
      console.log(newAuthor)
      this.books[book_id - 1].book_authorList.push(newAuthor)

      await this.updateBook(book_id)
      await this.GET_ALL_BOOKS()
      this.books = this.GET_BOOKS
      this.newAuthor[book_id - 1]= ""
    },
    async removeAuthorFromBook(book_id, author_id) {
      if (this.books[book_id - 1].book_authorList.length === 1) {
        this.errorMas[book_id - 1] = 'There is only one author!'
        return ''
      } else { this.errorMas[book_id - 1] = '' }
      let deletedElement = this.books[book_id - 1].book_authorList.find(item => item.author_id === author_id)
      let deletedIndex = this.books[book_id - 1].book_authorList.indexOf(deletedElement)

      this.books[book_id - 1].book_authorList.splice(deletedIndex, 1)
      // console.log(this.books[book_id - 1].book_authorList)
      await this.updateBook(book_id)
    }
  },
  async mounted() {
    await this.GET_ALL_BOOKS()
    this.books = this.GET_BOOKS
    console.log(JSON.stringify(this.books))
    this.newAuthor.length = this.books.length
    this.errorMas.length = this.books.length

  },
}
</script>

<style scoped>
  .home-div {
    height: 85%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 3%;
  }
  .new-list-div {
    width: 40%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .new-list-div input:focus {
    outline: #0f3443 solid 1px !important;
  }
  .new-list-div input:hover {
    outline: rgba(15, 52, 67, 0.54) solid 1px;
  }
  .new-list-input {
    border: none;
    border-radius: 2px;
    outline: none;
    font-size: 18px;
  }
  .new-list-but-div {
    padding: 2%;
    margin-left: 5%;
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ffffff;
    border-radius: 5px;
    color: #ffffff;
    transition: 100ms;
  }
  .new-list-but-div:hover {
    font-weight: 500;
    background-color: white;
    cursor: pointer;
    border-color: white;
    color: #323232;
  }
  .new-list-but-text::selection {
    background: transparent;
  }

  .book-list {
    width: 70%;
    margin-top: 4%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-y: scroll;
  }
  .book-list-item {
    padding: 2%;
    margin-bottom: 3%;
    width: 90%;
    border-style: solid;
    border-color: #232323;
    border-width: 1px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    height: 150px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
  .error-div {
    width: 100%;
    text-align: center;
    color: #ff3131;
  }
  .all-cont-div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .book-img {
    width: 100px;
    height: 140px;
    background-color: darkgray;
    border-radius: 5px;
  }

  .book-name-descr {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    color: white;
  }
  .book-name-input {
    width: 80%;
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    color: white;
    outline: none;
    background: none;
    border: none;
  }
  .book-descr {
    width: 100%!important;
    height: 80%!important;
    background: none;
    border: none;
    outline: none;
    overflow: auto;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.8);
  }
  .book-year {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 20px;
  }
  .book-year-input {
    width: 50%;
    height: 100%;
    font-size: 20px;
    text-align: left;
    color: rgba(255, 255, 255, 0.8);
    outline: none;
    background: none;
    border: none;
  }
  .book-year input[type="number"]::-webkit-outer-spin-button,
  .book-year input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .book-year input[type="number"] {
    -moz-appearance: textfield;
  }
  .book-year input[type="number"]:hover,
  .book-year input[type="number"]:focus {
    -moz-appearance: number-input;
  }
  .book-year-author {
    width: 30%;
    color: rgba(255, 255, 255, 0.8);
  }
  .book-author {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .book-add-author {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 5%;
    align-items: center;
  }
  .book-add-author input {
    width: 60%;
    outline: none;
    border: none;
  }
  .book-add-author-but {
    padding: 2px;
    border: white solid 1px;
    border-radius: 3px;
    font-size: 14px;
  }
  .book-add-author-but:hover {
    cursor: pointer;
    background-color: white;
    color: #232323;
  }
  .book-author-loop {
    margin-top: 6px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .book-author-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .book-author-item input {
    width: 80%;
    background: none;
    outline: none;
    border: none;
    color: white;

  }
  .delete_author_from_book {
    padding: 3px 2px 1px 2px;
    border: 1px solid white;
    cursor: pointer;
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .delete_author_from_book a {
    font-size: 16px;
    line-height: 16px;
  }
  .delete_author_from_book:hover {
    color: #323232;
    background-color: white;
  }
</style>