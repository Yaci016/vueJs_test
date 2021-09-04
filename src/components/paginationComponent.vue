<template>
  <div id="pagination_div" v-if="maxPages > 1">
    <span v-if="currentPage > 1">
      <a v-if="currentPage > 2">
        <router-link :to="paginationUrl + 1">&lt;&lt;</router-link>
      </a>
      <a>
        <router-link :to="paginationUrl + (currentPage - 1)">&lt;</router-link>
      </a>
    </span>
    <span v-if="currentPage < 3">
      <a
        v-for="n in getRangeFromNumber(maxPages, 1, currentPage + 5)"
        :key="n"
        :data-page="n"
      >
        <router-link :to="paginationUrl + n">
          <span v-if="n === currentPage">
            <u>{{ n }}</u>
          </span>
          <span v-else>{{ n }}</span>
        </router-link>
      </a>
    </span>

    <span v-else-if="maxPages > 5 && currentPage >= maxPages - 3">
      <a
        v-for="n in getRangeFromNumber(maxPages, currentPage - 5, maxPages)"
        :key="n"
        :data-page="n"
      >
        <router-link :to="paginationUrl + n">
          <span v-if="n === currentPage">
            <u>{{ n }}</u>
          </span>
          <span v-else>{{ n }}</span>
        </router-link>
      </a>
    </span>
    <span v-else>
      <a
        v-for="n in getRangeFromNumber(maxPages, currentPage - 3, currentPage + 4)"
        :key="n"
        :data-page="n"
      >
        <router-link :to="paginationUrl + n">
          <span v-if="n === currentPage">
            <u>{{ n }}</u>
          </span>
          <span v-else>{{ n }}</span>
        </router-link>
      </a>
    </span>

    <span v-if="currentPage < maxPages">
      <a>
        <router-link :to="paginationUrl + (currentPage + 1)">></router-link>
      </a>
      <a v-if="currentPage < maxPages - 1">
        <router-link :to="paginationUrl + maxPages">>></router-link>
      </a>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: this.initialCurrentPage,
      maxPages: this.initialMaxPages,
      paginationUrl: this.initialPaginationUrl,
    };
  },
  props: {
    initialCurrentPage: { type: Number, required: true },
    initialMaxPages: { type: Number, required: true },
    initialPaginationUrl: { type: String, required: true },
  },
  methods: {
    getRangeFromNumber(maxNumber, start1, finish) {
      let arr = [];
      if (maxNumber < finish) finish = maxNumber;
      if (start1 == 0) start1 = 1;
      for (start1; start1 <= finish; start1++) {
        arr.push(start1);
      }
      return arr;
    },
  },
  watch: {
    initialCurrentPage(newVal, oldVal) {
      this.currentPage = newVal;
    },
    initialMaxPages(newVal, oldVal) {
      this.maxPages = newVal;
    },
    initialPaginationUrl(newVal, oldVal) {
      this.paginationUrl = newVal;
    },
  },
};
</script>
<style scoped>
#pagination_div {
  text-align: center;
}
#pagination_div a {
  margin: 3px;
}
</style>
