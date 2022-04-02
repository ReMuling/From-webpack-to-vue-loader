import './App.css';

export default {
    name: 'App',
    template: `
      <div>
        <div>
          <img v-if="isShowImg1" src="./rk.png" class="img" />
          <img v-show="isShowImg2" src="./mt.png" class="img" />
        </div>
        <button @click="showImg1">显示rk</button>
        <button @click="showImg2">显示mt</button>
      </div>
  `,
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