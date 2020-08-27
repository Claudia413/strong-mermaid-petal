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
			<div v-for="(post, index) in blogpreviews" :key="'post-' + index" :blogId="post.uid" class="blog-post" >
            <div> {{ post.data.blog_title[0].text}}</div>

            </div>
		</main>
	</div>
</template>

<script>
// import moment from "moment";
import Navigation from "@/components/Navigation.vue";
import { mapState } from 'vuex';

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
	},
	methods: {
		getContent(category, pageNumber) {
            console.log('inside getContent');
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
    },
    computed: mapState({
        blogpreviews (state){
            return state['blogpreviews' + this.blog.tag]
            }
        }),
	created() {
        this.getContent(this.$route.params.tagid, this.pageNumber);
	},
	beforeRouteUpdate(to, from, next) {
        console.log('params', to.params.tagid)
		//   This prevents blog page not updating upon route change
        this.getContent(to.params.tagid, 1);
		next();
	},
};
</script>

<style lang="scss">
.overview {
	padding: 80px;
	display: flex;
	justify-content: center;
}

article {
	max-width: 1200px;
}

.title,
.publish-date {
	text-align: center;
	font-family: "Baskervville", Georgia, "Times New Roman", Times, serif;
}

.title {
	font-weight: 400;
	font-size: 42px;
	line-height: 50px;
}

.publish-date {
	color: RGBA(20, 20, 20, 0.5);
	font-size: 13px;
	font-style: italic;
}

.blog-image {
	width: 100%;
	height: auto;
	object-fit: cover;
}
</style>
