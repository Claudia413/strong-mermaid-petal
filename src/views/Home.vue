<template>
  <div class="home">
    <Navigation />
    <section v-for="(slice, index) in slices" :key="'slice-' + index" :class="slice.slice_type">

      <template v-if="slice.slice_type === 'most_recent_posts'">
        <div class="recent-reel">
          <div v-for="(post, index) in latestBlogs" :key="'post-' + index" class="post">
              <router-link :to="'/blog/' + post.uid"><prismic-image :field="post.data.cover_image" class="post-img" /></router-link>
              <p class="publish-date">{{ readableDate(post.first_publication_date) }} </p>
              <h3 class="title">
                <router-link :to="'/blog/' + post.uid">
                    {{ post.data.blog_title[0].text}}
                </router-link>
              </h3>
            </div>
        </div>
				</template>

				<template v-else-if="slice.slice_type === 'parallax'">
          <Parallax :parallax="true" :speedFactor="0.35" breakpoint='(min-width: 250px)' :sectionHeight="40">
					  <prismic-image :field="slice.primary.photo" />
          </Parallax>
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
                  <router-link :to="'/blog/' + post.uid"><prismic-image :field="post.data.cover_image" class="post-img" /></router-link>
                  <h3 class="title">
                    <router-link :to="'/blog/' + post.uid">
                        {{ post.data.blog_title[0].text}}
                    </router-link>
                  </h3>
                  <prismic-rich-text :field="post.data.teaser" class="teaser"/>
                  <p class="publish-date">{{ readableDate(post.first_publication_date) }} </p>
                </div>
                <!-- Extra post to even out slider as well as show read more from this category when needed -->
                <div class="post extra">
                  <h3 v-if="previews[slice.primary.category].length > 4"><router-link :to="'/category/' + slice.primary.category">Read more from {{slice.primary.category | capitalize}} </router-link><ArrowRight/></h3>
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
import ArrowRight from "mdi-vue/ArrowRight.vue";
import Parallax from 'vue-parallaxy'

export default {
  name: "Home",
  components: {
    Navigation,
    BlogSlider,
    ArrowRight,
    Parallax,
  },
  data() {
    return {
      slices: [],
      latestBlogs: {},
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
          // for each category slice we'll need to get the content per category
          if (slice.slice_type === 'posts_per_category') {
            that.getCategoryContent(slice.primary.category)
          } else if (slice.slice_type === 'most_recent_posts') {
            that.getMostRecentContent()
            }
        })
      }), reason => {
        console.log('uh-oh something went wrong retrieving content! =( , ', reason);
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
          if(response.results.length > 0) {
            var category = response.results[0].tags[0]
            this.previews[category]=response.results
          }
      });
    },
    getMostRecentContent() {

			this.$prismic.client.query([
			this.$prismic.Predicates.at('document.type', 'blogpost'),
			this.$prismic.Predicates.not('document.tags', ['TEST']),
			],
			{
			orderings : '[document.first_publication_date desc]',
			pageSize : 4,
			fetch : ['blogpost.blog_title', 'blogpost.cover_image'] }
			).then((response) => {
				this.latestBlogs = response.results
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
  margin: 40px auto;
  padding: 0 80px;
  @media only screen and (max-width: 768px) {
		padding: 0 40px;
  }
}

.recent-reel {
  display: flex;
  justify-content: space-between;
  h3 {
    font-size: 14px;
  }
  .publish-date {
    margin: 0;
  }
  .post {
    width: 20%;
    min-width: unset;
    @media only screen and (max-width: 768px) {
      width: 30%;
    }
    &:last-child {
      @media only screen and (max-width: 768px) {
        display: none;
      }
    }
  }
  .post-img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }
}

.parallax {
  width: 100%;
  height: 500px;
  object-fit: cover;
  overflow: hidden;
  @media only screen and (max-width: 768px) {
		height: 350px;
  }
}

.post {
  width: 30%;
  min-width: 30%;
  &.extra {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba($color: #000000, $alpha: 0.7);
    h3 {
      transition: all 0.2s ease-in-out;
    }
    h3:hover {
      color: black;
      cursor: pointer;
    }
  }
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
