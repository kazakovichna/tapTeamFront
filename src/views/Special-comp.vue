<template>
  <div class="special-div">
    <div class="special-div-logo">
      S SQL R<br>
      SQL Request
    </div>
    <div class="special-div-request-dem">
      SELECT book_name <br>
      FROM book AS b INNER JOIN <br>
      book_author AS ba ON b.id = ba.book_id <br>
      GROUP BY b.book_name <br>
      HAVING count(ba.book_id) > 2;
    </div>
    <div class="sql-div" v-for="value in Object.values(requestSQL)" :key="value.book_name">
      <div class="sql-div-text">
        {{ value.book_name }}
      </div>
    </div>
    <div class="special-div-logo">
      ORM Request
    </div>
    <div class="special-div-request-dem">

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "Special-comp",
  data: () => ({
    requestSQL: '',
    requestORM: []
  }),
  computed: {
    ...mapGetters([
        'GETTER_SQL_SPECIAL'
    ])
  },
  methods: {
    ...mapActions([
        'GET_SQL_SPECIAL'
    ])
  },
  async mounted() {
    await this.GET_SQL_SPECIAL()
    this.requestSQL = this.GETTER_SQL_SPECIAL
  }
}
</script>

<style scoped>
  .special-div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .special-div-logo {
    text-align: center;
    margin-top: 10px;
    color: white;
    font-size: 24px;
  }
  .special-div-request-dem {
    margin-top: 30px;
    margin-bottom: 20px;
    color: rgba(255, 255, 255, 0.8);
  }
  .sql-div {
    margin-bottom: 10px;
    width: 250px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid white;
    padding: 5px 5px 1px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #232323;
  }
</style>