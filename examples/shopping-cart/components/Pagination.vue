<template>
  <ul class="pagination">
    <li>
      <button @click="$emit('prev')">上一页</button>
    </li>
    <li>
      <button @click="$emit('next')">下一页</button>
    </li>
  </ul>
</template>

<script>

export default {
  
}
</script>

<style scoped>
.pagination li {
  list-style: none;
  float: left;
}
</style>