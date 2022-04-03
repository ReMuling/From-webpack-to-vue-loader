<template>
  <div>
    <div>
      <img v-if="isShowImg1" src="../public/mt.png" class="img" />
      <img v-show="isShowImg2" src="../public/rk.png" class="img" />
    </div>
    <button @click="showImg1">显示rk</button>
    <button @click="showImg2">显示mt</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowImg1: true,
      isShowImg2: false
    }
  },
  methods: {
    showImg1() {
      this.isShowImg1 = !this.isShowImg1;
    },
    showImg2() {
      this.isShowImg2 = !this.isShowImg2;
    }
  }
}
</script>

<style>
.img {
  width: 200px;
  height: 200px;
}
</style>