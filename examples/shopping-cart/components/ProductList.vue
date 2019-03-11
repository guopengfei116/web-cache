<template>
  <section>
    <ul>
      <li
        v-for="product in products"
        :key="product.id">
        {{ product.title }} - {{ product.price }}
      </li>
    </ul>
    <Pagination @prev="getPrevProducts()" @next="getNextProducts()"/>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Pagination from './Pagination';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      getAllParams: {
        pageSize: 10,
        pageIndex: 1,
      },
    };
  },
  computed: {
    ...mapState('products', {
      'products': 'all',
      'productsTotalPage': 'totalPage',
    }),
  },
  methods: {
    ...mapActions('products', [
      'getProducts',
    ]),
    getPrevProducts() {
      const { pageIndex } = this.getAllParams;
      this.getAllParams.pageIndex = pageIndex > 1 ? pageIndex - 1 : pageIndex;
      this.getProducts(this.getAllParams);
    },
    getNextProducts() {
      const { pageIndex } = this.getAllParams;
      this.getAllParams.pageIndex = pageIndex < this.productsTotalPage ? pageIndex + 1 : pageIndex;
      this.getProducts(this.getAllParams);
    },
  },
  created() {
    this.getProducts(this.getAllParams);
  },
};
</script>

<style scoped>

</style>