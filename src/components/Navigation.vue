<template>
  <div class="navbar">
    <router-link to="/" class="logo-section">
      <img src="../assets/Logo3.png" alt="the Bikes & I" class="logo" />
    </router-link>
    <nav>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/experiences" class="nav-link">Experiences</router-link>
      <router-link to="/reviews" class="nav-link">Reviews</router-link>
      <router-link to="/hacks" class="nav-link">Hacks</router-link>
      <router-link to="/maintenance" class="nav-link">Maintenance</router-link>
      <router-link to="/tools" class="nav-link">Tools</router-link>
    </nav>
    <div class="social">
      <a href="https://www.instagram.com/the_bikes_and_i/" rel="noopener">
        <Instagram :size="18" class="icon" />
      </a>
      <a href="https://www.youtube.com/channel/UCfWT24ZhU7KIr0CevzibZLQ" rel="noopener">
        <YouTube :size="18" class="icon" />
      </a>
    </div>
  </div>
</template>

<script>
import Instagram from "mdi-vue/Instagram.vue";
import YouTube from "mdi-vue/Youtube.vue";

export default {
  name: "Navigation",
  components: {
      Instagram,
      YouTube
    }
}
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 80px;
}

.logo-section {
  margin-right: auto;
}

.logo {
  width: 80px;
  height: auto;
}

nav {
  font-family: "Josefin Sans",
     Arial,
     sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  a {
    margin: 6px 12px;
    text-decoration: none;
    color:rgba(0, 0, 0, 1);
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
  }
  a:hover {
      color:rgba(0, 0, 0, 0.35);
    }
}

.social {
  color: rgba(0,0,0,1);
  margin-left: 24px;
  // Padding bottom to get the svgs to vertically align with the rest of navbar
  padding-bottom: 5px;
  &:hover {
    .icon {
      color: rgba(0,0,0, 0.35);
      &:hover{
        color: rgba(0,0,0,1);
      }
    }
  }
  a {
    display: inline-block;
    margin: 4px 0;
  }
  .icon {
    margin: 4px;
    color: rgba(0, 0, 0, 1);
    transition: all 0.3s ease-in-out;
  }
}
</style>
