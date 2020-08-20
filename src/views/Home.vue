<template>
  <div class="home">
    <p>{{$store.state.blogpreviews}}</p>

  </div>
</template>

<script>

export default {
  name: "Home",
  components: {

  },
  data() {
		return {
    }},
  methods: {
    getContent() {
			this.$prismic.client.query([
            this.$prismic.Predicates.at('document.type', 'blogpost')
            ],
            {
			orderings : '[document.first_publication_date desc]',
            pageSize : 4,
			fetch : ['blogpost.blog_title'] }).then((response) => {
            this.$store.dispatch('setBlogPreviewsFromPrismic', response.results);
      });
        },
  },
  created () {
    this.getContent();
  }
};
</script>
