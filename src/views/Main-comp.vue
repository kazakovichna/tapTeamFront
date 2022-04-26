<template>
  <div class="big-div">
    <div class="big-div-cont">
      <div class="toReviewer">
        <h2> Welcome to my test assignment.</h2> <br>
        First of all I have to thank Mark and Max for this great opportunity. <br>
        I really enjoyed getting involved and going through all the challenges along the way. <br>
        I've been want to ry out Linux for a long time and I was really excited about it. <br>
        <br>
        So here are the items that I was able to do in this test assignment: <br>
        - Displaying books, <br>
        - Inline editing of all the fields of the book, in this project, you can hover over each field and edit it and it will save <br>
        - Deleting a book <br>
        - A special listener that when you assign a book to an author, updates his field on his number of books <br>
        - Getting the list of authors and as editing the name and deleting it. <br>
        - Special query which shows only those books with more than two authors <br>
        - Admin panel <br>
        <br>
        Yes, and now what I have not been able to do: <br>
        - Uploading a picture <br>
        - Add, edit, delete data in admin panel for some unknown reason <br>
        - Implement authentication and authorization in the admin panel <br>
        - Filtering of books by field. <br>
        - Everything can break at any time, but it should not )) <br>
        <br>
        Damn it was great to work on this project, but due to lack of time and brains could not do all of the TOR. <br>
        Here is a link to the git, have fun ) \{^_^}/
      </div>
      <a class="book-but" style="text-decoration: none;"
         href="https://github.com/kazakovichna/tapTeamBack"
      >
        <h3>Go to GIT !</h3>
      </a>
      <img :src="require('../assets/ILovePHP.jpg')" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "Main-comp"
}
</script>

<style scoped>
  .big-div {
    width: 100%;
  }
  .big-div-cont {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 3%;
  }
  .toReviewer {
    font-size: 16px;
    font-family: Arial, sans-serif;
    line-height: 22px;
  }
  .big-div-cont img {
    width: 120px;
  }
  .big-div-cont a {
    /*margin: 20px 0 20px 0;*/
    color: white !important;
    transition: 100ms;
  }
  .big-div-cont a:hover {
    font-size: 17px;
  }
  .toReviewer {
    color: white;
    /*width: 60%;*/
  }
</style>