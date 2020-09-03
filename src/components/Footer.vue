<template>
  <footer>
    <div class="icons">
      <a href="https://www.instagram.com/the_bikes_and_i/" rel="noopener">
        <Instagram :size="18" class="icon" />
      </a>
      <a href="https://www.youtube.com/channel/UCfWT24ZhU7KIr0CevzibZLQ" rel="noopener">
        <YouTube :size="18" class="icon" />
      </a>
    </div>
    <p>Made with love by <a href="https://www.claudiaengelsman.com/" rel="noopener" class="credit">Claudia Engelsman</a></p>
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
    flex-direction: column;
    color: rgba(0,0,0,1);
    &:hover {
      .icon {
        color: rgba(0,0,0, 0.35);
        &:hover{
          color: rgba(0,0,0,1);
        }
      }
    }
    .icons {
      display: flex;
      justify-content: center;
      margin: 40px 0;
    }
    .icon {
      margin: 4px;
      color: rgba(0, 0, 0, 1);
      transition: all 0.25s ease-in-out;
    }
    p {
      font-family: "Josefin Sans",
      Arial,
      sans-serif;
      color: rgba(0,0,0, 0.75);
      text-align: center;
      font-size: 12px;
      margin: 48px;
    }
    .credit {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }
  }
</style>
