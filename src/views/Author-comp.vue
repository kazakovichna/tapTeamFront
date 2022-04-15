<template>
  <div class="home-div">
    <div class="new-list-div">
      <input class="new-list-input" v-model="addAuthor" placeholder="New Author..." type="text">
      <div class="new-list-but-div"
           @click="addAuthorFunc"
      >
        <div class="new-list-but-text">
          Add
        </div>
      </div>
    </div>
    <div class="book-list">
      <div class="book-list-item"
           v-for="author in authorList"
           :key="author.id"
      >
        <div class="book-name-descr">
          <input class="book-name-input" v-model="author.name" placeholder="Author name" type="text">
        </div>
        <div class="book-year-author">
          <div class="book-author-item"
               v-for="book in author.books"
               :key="book.id"
          >
            <input type="text" v-model="book.name" placeholder="add Author">
          </div>
        </div>
        <div class="delete-author">
          Delete
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Author-comp",
  data: () => ({
    addAuthor: '',
    authorList: [
      {
        id: 0,
        name: 'Author1',
        books: [
          {
            'id': 0,
            'name': 'levin',
          },
          {
            'id': 1,
            'name': 'lexus',
          },
        ]
      },
      {
        id: 1,
        name: 'Author2',
        books: [
          {
            'id': 0,
            'name': 'levin',
          },
          {
            'id': 1,
            'name': 'lexus',
          },
        ]
      },
      {
        id: 3,
        name: 'Author3',
        books: [
          {
            'id': 0,
            'name': 'levin',
          },
          {
            'id': 1,
            'name': 'lexus',
          },
        ]
      }
    ]
  }),
  methods: {
    addAuthorFunc() {
      console.log(this.addAuthor)
    }
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