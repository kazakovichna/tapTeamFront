<template>
  <div class="home-div">
    <div class="new-list-div"
         :class="{book_list_small: this.screenWidth <= 1600}"
    >
      <div class="new-book-error-div">
        {{newBookErrors}}
      </div>
      <div class="new-list-form-div">
        <input class="new-list-input" v-model="addBookObj.bookName" placeholder="New book..." type="text">
        <input class="new-list-input"
               v-model="addBookObj.bookYear"
               placeholder="New book year..."
               type="number">

        <div class="choose-author">
          <input class="choose-author-input"
                 placeholder="Add author"
                 v-model="authorInput"
                 @change="checkAuthorInput(authorInput)"
                 @click="choseAuthorIsActive = true"
                 type="text">
          <div class="choose-author-list" v-if="choseAuthorIsActive === true">
            <div class="choose-author-close-but"
                @click="closeAuthorList()"
            >
              Close
            </div>
            <div class="choose-author-item"
                   v-for="author in authors"
                   :key="author.id"
                 @click="checkAuthorInput(author.authorName)"
              >
                {{author.authorName}}
            </div>
          </div>
        </div>

        <div class="new-list-but-div"
             @click="addBook(addBookObj)"
        >
          <div class="new-list-but-text">
            Add
          </div>
        </div>
      </div>
    </div>
    <div class="book-list"
         :class="{book_list_small: this.screenWidth <= 1600}"
    >
      <div class="book-list-item"
        v-for="book in books"
           :key="book.id"
      >

         <div class="book-img"></div>

          <div class="book-name-descr">
            <div class="book-name-year">
              <input class="book-name-input"
                     v-model="book.bookName"
                     @change="updateBookSimpleData(book.id)"
                     placeholder="Book name"
                     type="text">

              <div class="book-year">
                <div class="book-year-text">
                  Year:
                </div>
                <input class="book-year-input"
                       v-model="book.bookYear"
                       @change="updateBookSimpleData(book.id)"
                       placeholder="add year"
                       type="number">
              </div>
            </div>
            <textarea class="book-descr"
                      spellcheck="false"
                      v-model="book.bookDescription"
                      @change="updateBookSimpleData(book.id)"
                      placeholder="add book description"/>
            <div class="error-mes">
              {{errorMas[books.indexOf(book)]}}
            </div>
          </div>

          <div class="book-year-author">

            <div class="delete-btn-div">
              <div class="delete-btn-text"
                @click="deleteBook(book.id)"
              >
                Delete Book
              </div>
            </div>

            <div class="book-author">
              <div class="book-add-author">

                <div class="add-author-input-list">
                  <input type="text" v-model="newAuthor[books.indexOf(book)]" placeholder="add Author"
                    @click="authorListActiveMas[books.indexOf(book)] = true"
                    @change="checkAddBookAuthor(newAuthor[books.indexOf(book)], books.indexOf(book))"
                  >

                  <div class="author-add-list"
                    v-if="authorListActiveMas[books.indexOf(book)] === true"
                  >
                    <div class="author-add-close-but"
                      @click="closeAddAuthorList(books.indexOf(book))"
                    >
                      Close
                    </div>
                    <div class="author-add-item"
                      v-for="author in authors.reduce( (resMas, item) => {
                                        if (book.authorList.find(
                                            item2 =>  item2.id === item.id
                                            ) === undefined) { resMas.push(item) }
                                          return resMas
                                        }, [])"
                     :key="author.id"
                     @click="checkAddBookAuthor(author.authorName, books.indexOf(book))"
                    >
                      {{author.authorName}}
                    </div>
                  </div>

                </div>

                <div class="book-add-author-but"
                  @click="addAuthor(newAuthor[books.indexOf(book)], book.id)"
                >
                  <div class="book-add-author-but-text">
                    Add
                  </div>
                </div>
              </div>
              <div class="book-author-loop">
                <div class="book-author-item"
                  v-for="author in book.authorList"
                     :key="book.authorList.indexOf(author)"
                >
                  <input type="text" v-model="author.authorName" @change="updateBookAuthorName(book.id, author.id)" placeholder="Author Name">
                  <div class="delete_author_from_book"
                      @click="updateBookDeleteAuthor(book.id, author.id)"
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
      bookName: "",
      bookYear: "",
      chosenAuthor: ""
    },
    authorInput: "",
    choseAuthorIsActive: false,
    newBookErrors: "",
    newAuthor: [],
    errorMas: [],
    books: [],
    authors: [],
    authorListActiveMas: [],
    screenWidth: window.innerWidth
  }),
  computed: {
    ...mapGetters([
        'GET_BOOKS',
        'GET_AUTHORS'
    ])
  },
  methods: {
    ...mapActions([
       'ADD_BOOKS',
       'GET_ALL_BOOKS',
        'DELETE_BOOK',
        'GET_ALL_AUTHORS',
        'UPDATE_BOOK_SIMPLE_DATA',
        'UPDATE_BOOK_AUTHOR_NAME',
        'UPDATE_BOOK_DELETE_AUTHOR',
        'UPDATE_BOOK_ADD_AUTHOR'
    ]),
    checkAuthorInput(authorInput) {
      if (authorInput === '' || authorInput.length > 255) {
        this.authorInput = ''
        this.choseAuthorIsActive = false
        return
      }
      this.authorInput = authorInput
      this.addBookObj.chosenAuthor = authorInput
      this.choseAuthorIsActive = false
    },
    closeAuthorList() {
      setTimeout(() => {
        this.choseAuthorIsActive = false
      }, 100)

    },
    checkAddBookAuthor(newAuthor, bookId) {
      if (newAuthor.length === 0 || newAuthor.length > 255) {
        return
      }
      this.newAuthor[bookId] = newAuthor

      this.authorListActiveMas[bookId] = false
    },
    closeAddAuthorList(bookId) {
      setTimeout(() => {
        this.authorListActiveMas[bookId] = false
      }, 100)
    },

    async updateBookSimpleData(bookId) {
      let jsonUpdateData = {
        bookName: "",
        bookYear: 0,
        bookDescription: ""
      }

      let updateBook = this.books.find(item => item.id === bookId)
      let updateIndex = this.books.indexOf(updateBook)

      if (updateBook.bookName === '' ||
          updateBook.bookName.length > 255) {
        this.errorMas[updateIndex] = "Invalid book Name!"
        return ''
      } else { this.errorMas[updateIndex] = '' }
      if (updateBook.bookYear === '' ||
          isNaN(parseInt(updateBook.bookYear)) ||
          parseInt(updateBook.bookYear) < 0) {
        this.errorMas[updateIndex] = 'Invalid year of book!'
        return ''
      } else { this.errorMas[updateIndex] = '' }
      if (updateBook.bookDescription === null ||
          updateBook.bookDescription === '' ||
          updateBook.bookDescription.length > 255) {
        this.errorMas[updateIndex] = "Invalid book Description!"
        return ''
      } else { this.errorMas[updateIndex] = '' }

      jsonUpdateData.bookName = updateBook.bookName
      jsonUpdateData.bookYear = updateBook.bookYear
      jsonUpdateData.bookDescription = updateBook.bookDescription

      let requestData = {
        data: jsonUpdateData,
        id: bookId
      }

      await this.UPDATE_BOOK_SIMPLE_DATA(requestData)
      await this.GET_ALL_BOOKS()
      this.books = this.GET_BOOKS

      console.log(jsonUpdateData)
    },


    async updateBookAuthorName(bookId, authorId) {
      console.log(bookId)
      console.log(authorId)

      let updateAuthorData = {
        authorId: 0,
        authorName: ""
      }

      let updateBookData = this.books.find(item => item.id === bookId)
      let updateIndex = this.books.indexOf(updateBookData)
      let updateBookAuthor = updateBookData.authorList.find(item => item.id === authorId)

      if (updateBookAuthor.authorName === '' ||
          updateBookAuthor.authorName.length > 255) {
        this.errorMas[updateIndex] = "Invalid Author Name!"
        return ''
      } else { this.errorMas[updateIndex] = '' }

      updateAuthorData.authorName = updateBookAuthor.authorName
      updateAuthorData.authorId = updateBookAuthor.id

      let goData = {
        bookId: bookId,
        data: updateAuthorData
      }

      await this.UPDATE_BOOK_AUTHOR_NAME(goData)
      await this.GET_ALL_BOOKS()
      this.books = this.GET_BOOKS

      console.log(updateAuthorData)
    },

    async updateBookDeleteAuthor(bookId, authorId) {
      let curBook = this.books.find(item => item.id === bookId)
      let curIndex = this.books.indexOf(curBook)

      if (curBook.authorList.length === 1) {
        this.errorMas[curIndex] = 'There is only one author!'
        setTimeout(() => {
          this.errorMas[curIndex] = ''
        }, 1000)
        return ''
      } else { this.errorMas[curIndex] = '' }

      let delData = {
        bookId: bookId,
        authorId: authorId
      }

      await this.UPDATE_BOOK_DELETE_AUTHOR(delData)
      await this.GET_ALL_BOOKS()
      this.books = this.GET_BOOKS
    },

    async addBook(addBookObj) {
      this.newBookErrors = ''
      if ((addBookObj.bookName.length === 0 || addBookObj.bookName.length > 255) ||
          (addBookObj.bookYear.length === 0 || addBookObj.bookYear.length > 4) ||
          (isNaN(parseInt(addBookObj.bookYear)) || parseInt(addBookObj.bookYear) < 0) ||
          (addBookObj.chosenAuthor.length === 0 || addBookObj.chosenAuthor.length > 255)) {
        this.newBookErrors = 'Fields are invalid (Name, Year and Author cant be empty or too long)'
        console.log('Empty fields')
        return
      }
      await this.ADD_BOOKS(this.addBookObj)
      await this.GET_ALL_BOOKS()
      this.books = this.GET_BOOKS
      this.addBookObj.bookName = ""
      this.addBookObj.bookYear = ""
      this.addBookObj.chosenAuthor = ""
      this.authorInput = ""
    },

    async addAuthor(author_name, book_id) {
      // console.log(author_name, ' ', book_id)
      let curBook = this.books.find(item => item.id === book_id)

      if ( author_name.length === 0 || author_name.length > 255 ) {
        this.errorMas[this.books.indexOf(curBook)] = "Invalid Author Name!"
        setTimeout(() => {
          this.errorMas[this.books.indexOf(curBook)] = ''
        }, 1000)
        return
      }else { this.errorMas[this.books.indexOf(curBook)] = '' }
      if (curBook.authorList.find(item => item.authorName === author_name) !== undefined) {
        this.errorMas[this.books.indexOf(curBook)] = "Author already exist!"
        setTimeout(() => {
          this.errorMas[this.books.indexOf(curBook)] = ''
        }, 1000)
        return
      }

      const addData = {
            bookId: book_id,
            authorName: author_name
      }
      let curIndex = this.books.indexOf(curBook)

      await this.UPDATE_BOOK_ADD_AUTHOR(addData)
      await this.GET_ALL_BOOKS()
      this.books = this.GET_BOOKS
      await this.GET_ALL_AUTHORS
      this.authors = this.GET_AUTHORS
      this.newAuthor[curIndex]= ""
    },

    async deleteBook(book_id) {
      await this.DELETE_BOOK(book_id)

      await this.GET_ALL_BOOKS()
      this.books = this.GET_BOOKS
    },

    set_scale() {
      this.screenWidth = window.innerWidth
    }
  },
  created() {
    window.addEventListener('resize', this.set_scale)
  },
  async mounted() {
    await this.GET_ALL_BOOKS()
    this.books = this.GET_BOOKS
    this.newAuthor.length = this.books.length
    this.newAuthor.fill("")
    this.errorMas.length = this.books.length
    this.authorListActiveMas.length = this.books.length
    this.authorListActiveMas.fill(false)

    await this.GET_ALL_AUTHORS()
    this.authors = this.GET_AUTHORS
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
  .choose-author {
    height: 100%;
    width: 200px;
    border-radius: 1px;
    background-color: white;
    transition: 100ms;
  }
  .choose-author input {
    outline: none;
    border: none;
  }
  .choose-author input:active :hover :focus {
    outline: none;
    border: none;
  }
  .choose-author-input {
    width: 200px;
    height: 98%;
    font-size: 18px;
  }
  .choose-author-list {
    width: 205px;
    background-color: white;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .choose-author-close-but {
    width: 98%;
    padding: 10px 0 10px 5px;
    cursor: pointer;
    background-color: #323232;
    color: white;
    transition: 100ms;
    text-align: center;
  }
  .choose-author-close-but:hover {
    padding: 12px 0 12px 5px;
    background-color: #232323;
  }
  .choose-author-item {
    padding: 10px 0 10px 5px;
    cursor: pointer;
    width: 97%;
  }
  .choose-author-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .new-list-input {
    width: 200px;
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
  .book_list_small {
    width: 80%;
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
  .add-author-input-list {
    width: 70%;
  }
  .add-author-input-list input {
    border-radius: 3px;
    height: 25px;
    width: 100%;
    outline: none;
    border: none;
  }
  .author-add-list {
    position: absolute;
    width: 145px;
    background-color: white;
    border-radius: 0 0 5px 5px;
  }
  .author-add-close-but {
    width: 98%;
    padding: 5px 0 5px 0;
    border-width: 0 1px 0 1px;
    border-color: white;
    border-style: solid;
    cursor: pointer;
    background-color: #323232;
    color: white;
    transition: 100ms;
    text-align: center;
  }
  .author-add-close-but:hover {
    background-color: #232323;
    padding: 7px 0 7px 0;
  }
  .author-add-item {
    color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
    padding: 5px 0 5px 0;
    transition: 100ms;
  }
  .author-add-item:hover {
    color: black;
    padding: 6px 0 6px 0;
    background-color: rgba(0, 0, 0, 0.1);
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