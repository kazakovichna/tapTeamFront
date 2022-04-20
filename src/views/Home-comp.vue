<template>
  <div class="home-div">
    <div class="new-list-div">
      <div class="new-book-error-div">
        {{newBookErrors}}
      </div>
      <div class="new-list-form-div">
        <input class="new-list-input" v-model="addBookObj.book_name" placeholder="New book..." type="text">
        <input class="new-list-input" v-model="addBookObj.book_year" placeholder="New book year..." type="number">
        <div class="new-list-but-div"
             @click="addBook(addBookObj.book_name, addBookObj.book_year)"
        >
          <div class="new-list-but-text">
            Add
          </div>
        </div>
      </div>
    </div>
    <div class="book-list">
      <div class="book-list-item"
        v-for="book in books"
           :key="book.book_id"
      >

         <div class="book-img"></div>

          <div class="book-name-descr">
            <div class="book-name-year">
              <input class="book-name-input" v-model="book.book_name" @change="updateBook(book.book_id)" placeholder="Book name" type="text">

              <div class="book-year">
                <div class="book-year-text">
                  Year:
                </div>
                <input class="book-year-input"
                       v-model="book.book_year"
                       @change="updateBook(book.book_id)"
                       placeholder="add year"
                       type="number">
              </div>
            </div>
            <textarea class="book-descr" spellcheck="false" v-model="book.book_description" @change="updateBook(book.book_id)" placeholder="Book description"/>
            <div class="error-mes">
              {{errorMas[books.indexOf(book)]}}
            </div>
          </div>

          <div class="book-year-author">

            <div class="delete-btn-div">
              <div class="delete-btn-text"
                @click="deleteBook(book.book_id)"
              >
                Delete Book
              </div>
            </div>

<!--            <div class="book-year">-->
<!--              <div class="book-year-text">-->
<!--                Year:-->
<!--              </div>-->
<!--              <input class="book-year-input"-->
<!--                     v-model="book.book_year"-->
<!--                     @change="updateBook(book.book_id)"-->
<!--                     placeholder="add year"-->
<!--                     type="number">-->
<!--            </div>-->

            <div class="book-author">
              <div class="book-add-author">
                <input type="text" v-model="newAuthor[books.indexOf(book)]" placeholder="add Author">
                <div class="book-add-author-but"
                  @click="addAuthor(newAuthor[books.indexOf(book)], book.book_id)"
                >
                  <div class="book-add-author-but-text">
                    Add
                  </div>
                </div>
              </div>
              <div class="book-author-loop">
                <div class="book-author-item"
                  v-for="author in book.book_authorList"
                     :key="book.book_authorList.indexOf(author)"
                >
                  <input type="text" v-model="author.author_name" @change="updateBook(book.book_id)" placeholder="Author Name">
                  <div class="delete_author_from_book"
                      @click="removeAuthorFromBook(book.book_id, author.author_id)"
                  >
                    <a>DEL</a>
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
    addBookObj: {
      book_name: "",
      book_year: ""
    },
    newBookErrors: "",
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
        'UPDATE_BOOK',
        'DELETE_BOOK',
        'GET_ALL_AUTHORS'
    ]),
    async updateBook(bookId) {
      let updateBookData = this.books.find(item => item.book_id === bookId)
      let updateIndex = this.books.indexOf(updateBookData)

      if (updateBookData.book_name === '') {
        this.errorMas[updateIndex] = "Empty book name!"
        return ''
      } else { this.errorMas[updateIndex] = '' }
      if (updateBookData.book_year === '') {
        this.errorMas[updateIndex] = 'Invalid year of book!'
        return ''
      } else { this.errorMas[updateIndex] = '' }
      if (updateBookData.book_authorList.length === 0) {
        this.errorMas[updateIndex] = 'Empty author!'
        return ''
      } else { this.errorMas[updateIndex] = '' }

      await this.UPDATE_BOOK(updateBookData);
      await this.GET_ALL_BOOKS()
      this.books = this.GET_BOOKS
    },

    async addBook(name, year) {
      this.newBookErrors = ''
      if ((name.length === 0 || name.length > 255) && (year.length === 0 || year.length > 4)) {
        this.newBookErrors = 'Fields are invalid (Name and Year cant be empty or too long)'
        console.log('Empty fields')
        return
      }
      await this.ADD_BOOKS(this.addBookObj)
      await this.GET_ALL_BOOKS()
      this.books = this.GET_BOOKS
      this.addBookObj.book_name = ""
      this.addBookObj.book_year = ""
    },

    async addAuthor(author_name, book_id) {
      const newAuthor = {
            "author_id": 0,
            "author_name":author_name
      }
      console.log(newAuthor)
      let curBook = this.books.find(item => item.book_id === book_id)
      let curIndex = this.books.indexOf(curBook)

      curBook.book_authorList.push(newAuthor)

      await this.updateBook(book_id)
      await this.GET_ALL_BOOKS()
      this.books = this.GET_BOOKS
      await this.GET_ALL_AUTHORS
      this.newAuthor[curIndex]= ""
    },

    async removeAuthorFromBook(book_id, author_id) {
      let curBook = this.books.find(item => item.book_id === book_id)
      let curIndex = this.books.indexOf(curBook)

      if (curBook.book_authorList.length === 1) {
        this.errorMas[curIndex] = 'There is only one author!'
        return ''
      } else { this.errorMas[curIndex] = '' }

      let deletedElement = curBook.book_authorList.find(item => item.author_id === author_id)
      let deletedIndex = curBook.book_authorList.indexOf(deletedElement)

      this.books[curIndex].book_authorList.splice(deletedIndex, 1)
      // console.log(this.books[book_id - 1].book_authorList)
      await this.updateBook(book_id)
      await this.GET_ALL_BOOKS()
      this.books = this.GET_BOOKS
      await this.GET_ALL_AUTHORS
    },

    async deleteBook(book_id) {
      await this.DELETE_BOOK(book_id)

      await this.GET_ALL_BOOKS()
      this.books = this.GET_BOOKS
    }
  },
  async mounted() {
    await this.GET_ALL_BOOKS()
    this.books = this.GET_BOOKS

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
    margin-top: 1%;
  }
  .new-list-div {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .new-book-error-div {
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
    color: #ff3131;
    font-size: 20px;
  }
  .new-list-form-div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .new-list-form-div input:focus {
    outline: #0f3443 solid 1px !important;
  }
  .new-list-form-div input:hover {
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
    width: 40%;
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-y: scroll;
  }
  .book-list-item {
    padding: 2% 2% 2% 2%;
    margin-bottom: 3%;
    width: 90%;
    border-style: solid;
    border-color: #232323;
    border-width: 1px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    height: 170px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    transition: 100ms;
  }
  .book-list-item:hover {
    box-shadow: 0 0 15px rgba(0,0,0,0.5);
  }
  .error-div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .error-mes {
    color: #ff3131;
    text-align: center;
    width: 70%;
    height: 30px;
  }
  .delete-btn-div {
    color: white;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .delete-btn-text {
    text-align: center;
    width: 100%;
    padding: 3% 3% 1% 3%;
    border-radius: 4px;
    border: solid 1px white;
    transition: 100ms;
  }
  .delete-btn-text:hover {
    border-radius: 1px;
    border-color: #ff3131;
    background-color: #232323;
    color: white;
    cursor: pointer;
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

  .book-name-year {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .book-name-input {
    width: 50%;
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    color: white;
    outline: none;
    background: none;
    border: none;
  }
  .book-year {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 20px;
  }
  .book-year-text {
    /*width: 50%;*/
    line-height: 16px;
  }
  .book-year-input {
    width: 35%;
    height: 100%;
    font-size: 20px;
    line-height: 20px;
    text-align: left;
    color: white;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .book-author {
    margin-top: 5%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .book-add-author {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 5%;
    align-items: center;
  }
  .book-add-author input {
    border-radius: 3px;
    height: 25px;
    width: 70%;
    outline: none;
    border: none;
  }
  .book-add-author-but {
    height: 22px;
    width: 15%;
    padding: 2px 2px 1px 2px;
    border: white solid 1px;
    border-radius: 3px;
    font-size: 14px;

    display: flex;
    justify-content: center;
    align-items: center;
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
    gap: 6px;
  }
  .book-author-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .book-author-item input {
    font-size: 14px;
    width: 80%;
    background: none;
    outline: none;
    border: none;
    color: white;
    transition: 100ms;
  }
  .book-author-item input:hover {
    background-color: #313131;
    border-radius: 5px;
  }
  .delete_author_from_book {
    padding: 2px 2px 1px 2px;
    border: 1px solid white;
    border-radius: 3px;
    cursor: pointer;
    height: 22px;
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 100ms;
  }
  .delete_author_from_book a {
    font-size: 14px;
    line-height: 16px;
  }
  .delete_author_from_book:hover {
    color: white;
    background-color: #232323;
    border-radius: 1px;
    border-color: #ff3131;
  }
</style>