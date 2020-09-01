<template>
	<div>
		<Navigation />
		<main class="overview">
			<!-- <vue-headful
			:title="blog.seo_title"
			:description="blog.seo_description"
			:image="blog.seo_image"
			:url="'/category/' + blog.tag"
			/>-->
            <h2>Posts in {{blog.tag | capitalize}}</h2>
            <div class="blogs">
                <div v-for="(post, index) in blogpreviews" :key="'post-' + index" :blogId="post.uid" class="blog" >
                    <router-link :to="'/blog/' + post.uid"><prismic-image :field="post.data.cover_image" class="cover-image" /></router-link>
                    <p class="publish-date">{{ readableDate(post.first_publication_date) }} </p>
                    <h3 class="title">
                        <router-link :to="'/blog/' + post.uid">
                            {{ post.data.blog_title[0].text}}
                        </router-link> </h3>
                    <p class="teaser">
                        <prismic-rich-text :field="post.data.teaser" />
                        <router-link :to="'/blog/' + post.uid"> Read more <ArrowRight :size="14"/></router-link>
                    </p>
                </div>
            </div>
		</main>
	</div>
</template>

<script>
// import moment from "moment";
import Navigation from "@/components/Navigation.vue";
import { mapState } from 'vuex';
import moment from 'moment';
import ArrowRight from "mdi-vue/ArrowRight.vue";

export default {
	name: "Overview",
	data() {
		return {
            pageNumber: 1,
            maxPageNumber: 2,
            blog: {
                tag: ""
            }
		};
	},
	components: {
        Navigation,
        ArrowRight
	},
	methods: {
		getContent(category, pageNumber) {
			this.$prismic.client
				.query(
					[
						this.$prismic.Predicates.at("document.type", "blogpost"),
						this.$prismic.Predicates.at("document.tags", [category]),
					],
					{
						orderings: "[document.first_publication_date desc]",
						pageSize: 10,
						page: pageNumber,
						fetch: ["blogpost.blog_title", "blogpost.teaser", "blogpost.cover_image"],
					}
				)
				.then((response) => {
                    this.maxPageNumber = response.total_pages;
                    this.blog.tag = this.$route.params.tagid;
					this.$store.dispatch(
						"setBlogPreviewsFromPrismic",
						response.results
					);
					// response is the response object, response.results holds the documents
				});
        },
        readableDate(date) {
            return moment(date).format("MMMM Do, YYYY")
        }
    },
    computed: {
        ...mapState({
        blogpreviews (state){
            return state['blogpreviews' + this.blog.tag]
            }
        })
    },
	created() {
        if(this.$store.state['blogpreviews' + this.$route.params.tagid].length >= 1) {
            this.blog.tag = this.$route.params.tagid;
        } else {
            this.getContent(this.$route.params.tagid, this.pageNumber);
        }

	},
	beforeRouteUpdate(to, from, next) {
        //   This prevents blog page not updating upon route change and checks if info is already retrieved from prismic
        if(this.$store.state['blogpreviews' + to.params.tagid].length >= 1) {
            this.blog.tag = to.params.tagid;
            next();
        } else {
            this.getContent(to.params.tagid, 1);
            next();
        }

	},
};
</script>

<style lang="scss" scoped>
.overview {
	padding: 80px;
	display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
}

h2 {
    font-size: 18px;
    line-height: 28px;
    font-weight: 400;
}

.blogs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.blog {
    display: flex;
    flex-direction: column;
    max-width: 30%;
    justify-content: flex-start;
    @media only screen and (max-width: 768px) {
		max-width: 45%;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
}

.cover-image {
	width: 100%;
	height: auto;
	object-fit: cover;
}

.title,
.publish-date {
	text-align: left;
    font-family: "Baskervville", Georgia, "Times New Roman", Times, serif;
    margin: 0;
}

.title {
	font-weight: 400;
	font-size: 22px;
    line-height: 28px;
    margin: 12px 0;
}

.publish-date {
	color: RGBA(20, 20, 20, 0.5);
	font-size: 13px;
    font-style: italic;
    margin-top: 8px;
}

.teaser {
    font-family: "Josefin Sans",
        Arial,
        sans-serif;
        font-weight: 300;
        font-size: 14px;
        margin: 0;
        line-height: 22px;
    a {
        transition: all 0.2s ease-in-out;
        &:hover {
            color: RGBA(20, 20, 20, 0.5);
        }
    }
}
</style>
