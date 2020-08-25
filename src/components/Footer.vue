<template>
  <footer>
    <a href="https://www.instagram.com/the_bikes_and_i/" rel="noopener">
      <Instagram :size="18" class="icon" />
    </a>
    <a href="https://www.youtube.com/channel/UCfWT24ZhU7KIr0CevzibZLQ" rel="noopener">
      <YouTube :size="18" class="icon" />
    </a>
  </footer>
</template>

<script>
import Instagram from "mdi-vue/Instagram.vue";
import YouTube from "mdi-vue/Youtube.vue";

export default {
  name: "Footer",
  components: {
      Instagram,
      YouTube
    }
}
</script>

<style scoped lang="scss">
  footer {
    display: flex;
    justify-content: center;
    margin-bottom: 80px;
    color: rgba(0,0,0,1);
    &:hover {
      .icon {
        color: rgba(0,0,0, 0.35);
        &:hover{
          color: rgba(0,0,0,1);
        }
      }
    }
    .icon {
      margin: 4px;
      color: rgba(0, 0, 0, 1);
      transition: all 0.25s ease-in-out;
    }
  }
</style>
