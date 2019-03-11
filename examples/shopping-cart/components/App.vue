<template>
  <div id="app">
    <h1>Shopping Cart Example</h1>
    <hr>
    <h2>Products</h2>
    <ProductList/>
  </div>
</template>

<script>
import ProductList from './ProductList';

export default {
  components: {
    ProductList,
  },
};
</script>

<style scoped>

</style>