<template>
  <h1>Products</h1>
  <pagination-component
    :initialCurrentPage="currentPage"
    :initialMaxPages="maxPages"
    :initialPaginationUrl="paginationUrl"
  />
  <select @change="filterItemsByCategorie">
    <option value="0">unfilter</option>
    <option v-for="(categorie, key) in getCategories" :value="categorie" :key="key">
      {{ categorie }}
    </option>
  </select>
  <section class="parent">
    <article
      v-for="(item, key) in getItemsFromStore"
      :key="key"
      class="child"
      v-show="filter == 0 || filter == item.category"
    >
      <div class="container">
        <img :src="item.image" :alt="item.description" width="200" height="200" />
        <div class="child_container">
          <p style="margin: 0">{{ item.name }}</p>
          <p style="margin: 0">{{ item.price }}$</p>
        </div>
      </div>
    </article>
  </section>
  <pagination-component
    :initialCurrentPage="currentPage"
    :initialMaxPages="maxPages"
    :initialPaginationUrl="paginationUrl"
  />
</template>
<script>
import paginationComponent from "./paginationComponent.vue";
export default {
  components: { paginationComponent },
  data() {
    return {
      currentPage: 1,
      maxPages: 10,
      paginationUrl: "?page=",
      filter: 0,
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    filterItemsByCategorie(e) {
      this.filter = parseInt(e.target.value);
    },
    async getItems() {
      if (this.$route.query.page) {
        let page = this.$route.query.page;
        await axios
          .get(
            "https://trayvonnorthern.com/Edgewood-API/public/api/products" +
              "?page=" +
              page
          )
          .then((html) => {
            this.setItems(html.data.data);
            this.currentPage = html.data.current_page;
            this.maxPages = html.data.last_page;
          });
      } else {
        await axios
          .get("https://trayvonnorthern.com/Edgewood-API/public/api/products")
          .then((html) => {
            this.setItems(html.data.data);
            this.currentPage = html.data.current_page;
            this.maxPages = html.data.last_page;
          });
      }
    },
    setItems(payload) {
      this.$store.commit("setItems", payload);
      this.$store.commit("setUniqueCategories", payload);
    },
    loadData() {
      var params = { page: this.$route.query.page };
      this.getItems();
    },
  },
  computed: {
    getItemsFromStore() {
      return this.$store.getters.getItems;
    },
    getCategories() {
      return this.$store.getters.getCategories;
    },
  },
  watch: {
    $route: "loadData",
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
.parent {
  display: flex;
  flex-wrap: wrap;
}

.child {
  flex: 1 0 21%;
}
.container {
  position: relative;
  width: 43%;
}

.container img {
  display: block;
  width: 100%;
}
.child_container {
  background-color: rgba(0, 0, 0, 0.39);
  color: #fff;
  text-align: center;
  position: absolute;
  bottom: 0;

  width: 100%;
}
</style>
