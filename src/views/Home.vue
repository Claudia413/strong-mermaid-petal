<template>
  <div class="home">
    <Navigation />
    <p>{{ $store.state.blogpreviews }}</p>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  name: "Home",
  components: {
    Navigation
  },
  data() {
    return {};
  },
  methods: {
    getContent() {
      this.$prismic.client
        .query([this.$prismic.Predicates.at("document.type", "blogpost")], {
          orderings: "[document.first_publication_date desc]",
          pageSize: 4,
          fetch: ["blogpost.blog_title"]
        })
        .then(response => {
          this.$store.dispatch("setBlogPreviewsFromPrismic", response.results);
        });
    }
  },
  created() {
    this.getContent();
  }
};
</script>
