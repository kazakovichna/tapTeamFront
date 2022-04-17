<template>
  <div class="home-div">
    <div class="new-list-div">
      <div class="error-new-div">
        {{errorNewAuthor}}
      </div>
      <div class="new-auth-div">
          <input class="new-list-input" v-model="addAuthor" placeholder="New Author..." type="text">
          <div class="new-list-but-div"
               @click="addAuthorFunc(addAuthor)"
          >
            <div class="new-list-but-text">
              Add
            </div>
          </div>
      </div>
    </div>
    <div class="book-list">
      <div class="book-list-item"
           v-for="author in authors"
           :key="authors.indexOf(author)"
      >
        <div class="book-name-descr">
          <input class="book-name-input" v-model="author.author_name" placeholder="Author name" type="text">
        </div>
        <div class="book-year-author">
          3 Books
        </div>
        <div class="delete-author"
          @click="deleteAuthor(author.author_id)"
        >
          Delete
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'


export default {
  name: "Author-comp",
  data: () => ({
    addAuthor: '',
    errorNewAuthor: "",
    authors: []
  }),
  computed: {
    ...mapGetters([
        'GET_AUTHORS'
    ])
  },
  methods: {
    ...mapActions([
        'GET_ALL_AUTHORS',
        'ADD_AUTHOR',
        'DELETE_AUTHOR'
    ]),
    async addAuthorFunc(addAuthor) {
      if (addAuthor.length === 0 || addAuthor.length > 255) {
        this.errorNewAuthor = "Author name invalid"
      }
      this.errorNewAuthor = ""
      const formData = {
        author_name: addAuthor
      }

      await this.ADD_AUTHOR(formData)
      await this.GET_ALL_AUTHORS()
      this.authors = this.GET_AUTHORS
      this.addAuthor = ""
    },
    async deleteAuthor(author_id) {
      await this.DELETE_AUTHOR(author_id)

      await this.GET_ALL_AUTHORS()
      this.authors = this.GET_AUTHORS
    }
  },
  async mounted() {
    await this.GET_ALL_AUTHORS()
    this.authors = this.GET_AUTHORS
    // console.log(this.authors)
  }
}
</script>

<style scoped>
.home-div {
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
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.new-auth-div {
  width: 100%;
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
.error-new-div {
  width: 100%;
  text-align: center;
  color: #ff3131;
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
  width: 50%;
  margin-top: 4%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.book-list-item {
  padding: 2%;
  margin-bottom: 3%;
  width: 100%;
  border-style: solid;
  border-color: #232323;
  border-width: 1px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.book-name-descr {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
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

.book-year-author {
  width: 30%;
  color: rgba(255, 255, 255, 0.8);
}

.book-add-author input {
  width: 60%;
  outline: none;
  border: none;
}
.book-author-item input {
  width: 90%;
  background: none;
  outline: none;
  border: none;
  color: white;
}

.delete-author {
  color: white;
  border: white solid 1px;
  border-radius: 3px;
  padding: 10px 1px 10px 1px;
}
.delete-author:hover {
  border-color: red;
  color: red;
  background-color: floralwhite;
  cursor: pointer;
}
</style>