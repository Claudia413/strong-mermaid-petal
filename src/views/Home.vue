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
            <BlogSlider :numberOfSlides="2" :title="slice.primary.category | capitalize" :showArrows="previews[slice.primary.category].length > 2">
              <template v-slot:slide1>
                <div v-for="(post, index) in selectedPreviews(slice.primary.category, 1)" :key="'post-' + index" class="post">
                    <prismic-image :field="post.data.cover_image" class="post-img" />
                    <h3 class="title">
                      <router-link :to="'/blog/' + post.uid">
                          {{ post.data.blog_title[0].text}}
                      </router-link>
                    </h3>
                    <prismic-rich-text :field="post.data.teaser" class="teaser"/>
                    <p class="publish-date">{{ readableDate(post.first_publication_date) }} </p>
                </div>
              </template>
              <template v-slot:slide2>
                <div v-for="(post, index) in selectedPreviews(slice.primary.category, 2)" :key="'post-' + index" class="post">
                  <prismic-image :field="post.data.cover_image" class="post-img" />
                  <h3 class="title">
                    <router-link :to="'/blog/' + post.uid">
                        {{ post.data.blog_title[0].text}}
                    </router-link>
                  </h3>
                  <prismic-rich-text :field="post.data.teaser" class="teaser"/>
                  <p class="publish-date">{{ readableDate(post.first_publication_date) }} </p>
                </div>
                <!-- Extra post to even out slider as well as show read more from this category when needed -->
                <div class="post">
                  <h3 v-if="previews[slice.primary.category].length > 4">Read more from {{slice.primary.category | capitalize}}</h3>
                </div>
              </template>
            </BlogSlider>


				</template>
    </section>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import BlogSlider from '@/components/BlogSlider.vue'
import moment from 'moment';

export default {
  name: "Home",
  components: {
    Navigation,
    BlogSlider
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
					// response is the response object, response.results holds the documents
      });
    },
    readableDate(date) {
          return moment(date).format("MMMM Do, YYYY")
    },
    selectedPreviews(category, sideToShow) {
      if(sideToShow === 1) {
        return this.previews[category].filter(function (post, index) {
          return index < 3
        })
      } else {
        return this.previews[category].filter(function (post, index) {
          return index >= 3
        })
      }
    },
  },
  created() {
    this.getContent();
  }
};
</script>

<style lang="scss" scoped>
.most_recent_posts, .posts_per_category {
  max-width: 1200px;
  margin: auto;
}

.parallax {
  width: 100%;
  height: 50px;
  object-fit: cover;
}

.post {
  width: 30%;
  min-width: 30%;
}

.post-img {
 width: 100%;
 max-height: 240px;
 object-fit: cover;
}

h3 {
  font-size: 20px;
  font-weight: 400;
  margin-block-start: 0;
  margin-block-end: 0;
  margin: 0 0 8px 0;
  a {
    text-decoration: none;
    color: black;
  }
}

p {
  font-size: 14px;
  margin: 0 0 8px 0;
  &.publish-date {
    font-size: 13px;
    color: rgba($color: #000000, $alpha: 0.7)
  }
}
</style>
