<template>
  <div class="header-main">
    <div class="left-div"
         @click="$router.push('/')"
    >
      <div class="img-div">
        <img :src="require('../assets/bookshelf.svg')" alt="">
      </div>
      <div class="logo-div">BOOK SHELF</div>
    </div>
    <div class="right-div">
      <div class="book-but"
        @click="$router.push('/Book')"
      >
        BOOKS
      </div>
      <div class="book-but"
           @click="$router.push('/Author')"
      >
        AUTHORS
      </div>
      <div class="book-but"
           @click="$router.push('/Special')"
      >
        SPECIAL
      </div>
      <a class="book-but" style="text-decoration: none;"
           href="https://safe-wildwood-07342.herokuapp.com/admin/dashboard"
      >
        ADMIN
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "header-comp"
}
</script>

<style scoped>
  .header-main {
    width: 100%;
    height: 7%;
    border-width: 0 0 1px 0;
    border-color: #ffffff;
    border-style: solid;
    color: white;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left-div {
    margin-left: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    font-size: 30px;
  }
  .img-div {
    display: flex;
    align-items: center;
  }
  .img-div img {
    width: 70px;
  }
  .right-div {
    margin-right: 10%;
    width: 35%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    font-size: 22px;
  }
  .right-div a {
    color: white !important;
  }
  .book-but {
    transition: 100ms;
  }
  .book-but:hover {
    cursor: pointer;
    font-size: 24px;
  }
</style>