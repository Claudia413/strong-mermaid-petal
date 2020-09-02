<template>
  <div class="home">
    <Navigation />
    <section v-for="(slice, index) in slices" :key="'slice-' + index" :class="slice.slice_type">
      <template v-if="slice.slice_type === 'most_recent_posts'">
					<p>most recent posts go here</p>
				</template>
				<template v-else-if="slice.slice_type === 'parallax'">
					<prismic-image :field="slice.primary.photo" class="parallax" />
				</template>
        <template v-else-if="slice.slice_type === 'posts_per_category'">
					<h2>{{slice.primary.category | capitalize }}</h2>
          <div v-for="(post, index) in previews[slice.primary.category]" :key="'post-' + index" :class="post">
            <prismic-image :field="post.data.cover_image" class="post-img" />
            <h3 class="title">
              <router-link :to="'/blog/' + post.uid">
                  {{ post.data.blog_title[0].text}}
              </router-link>
            </h3>
            <p class="teaser">
                <prismic-rich-text :field="post.data.teaser" />
            </p>
            <p class="publish-date">{{ readableDate(post.first_publication_date) }} </p>
          </div>
				</template>
    </section>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import moment from 'moment';

export default {
  name: "Home",
  components: {
    Navigation
  },
  data() {
    return {
      slices: [],
      previews: {
        reviews: [],
        experiences: [],
        hacks: [],
        maintenance: [],
        tools: []
      }
    };
  },
  methods: {
    getContent() {
      this.$prismic.client.getSingle("homepage").then(document => {
        this.slices = document.data.body;
        var that = this
        this.slices.forEach( function (slice) {
          console.log('slicetypes', slice);
          // for each category slice we'll need to get the content per category
          if (slice.slice_type === 'posts_per_category') {
            that.getCategoryContent(slice.primary.category)
          } else if (slice.slice_type === 'most_recent_posts') {


            console.log('hi, still need to do something here')
          // add function to get most recent posts


          }
        })
      }), reason => {
        console.log('uh-oh something went wrong! =(', reason);
      };
    },
    getCategoryContent(category, pageNumber) {
      this.$prismic.client
				.query(
					[
						this.$prismic.Predicates.at("document.type", "blogpost"),
						this.$prismic.Predicates.at("document.tags", [category]),
					],
					{
						orderings: "[document.first_publication_date desc]",
						pageSize: 5,
						page: pageNumber,
						fetch: ["blogpost.blog_title", "blogpost.teaser", "blogpost.cover_image"],
					}
				)
				.then((response) => {
          var category = response.results[0].tags[0]
          this.previews[category]=response.results
          console.log('preview categories', this.previews[category])
					// response is the response object, response.results holds the documents
				});
      },
      readableDate(date) {
            return moment(date).format("MMMM Do, YYYY")
      }
  },
  created() {
    this.getContent();
  }
};
</script>

<style lang="scss" scoped>
.parallax {
  width: 100%;
  height: 50px;
  object-fit: cover;
}

.post-img {
 width: 40px;
 height: auto;
}

</style>
