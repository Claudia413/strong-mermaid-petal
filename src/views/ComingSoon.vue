<template>
  <main class="comingsoon">
    <div class="content">
      <img src="../assets/Logo3.png" alt="the Bikes & I" class="logo" />
      <h1>Coming back soon...</h1>
    </div>
  </main>
</template>

<script></script>

<style lang="scss" scoped>
.comingsoon {
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: #fcfcfc;
  margin: 64px 0;
  @media only screen and (max-width: 768px) {
    margin: 40px 0;
  }
}
.content {
  max-width: 1200px;
  padding: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 360px;
    height: auto;
  }
  h1 {
    margin: 64px;
  }
}
</style>
