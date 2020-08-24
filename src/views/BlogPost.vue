<template>
	<div class="blog">
		<!-- <vue-headful
			:title="blog.seo_title"
			:description="blog.seo_description"
			:image="blog.seo_image"
			:url="'/blog' + blog.uid"
		/>-->
		<article>
			<p class="publish-date">{{ blog.first_publication_date }}</p>
			<h1 class="title">{{ blog.title[0].text }}</h1>
			<section v-for="(slice, index) in slices" :key="'slice-' + index" :class="slice.slice_type">
				<template v-if="slice.slice_type === 'text1'">
					<!-- <h2 class="heading">{{ slice.primary.section_title[0].text }}</h2> -->
					<prismic-rich-text :field="slice.primary.text" class="text" />
				</template>
				<template v-else-if="slice.slice_type === 'picture'">
					<prismic-image :field="slice.primary.picture" class="blog-image" />
					<prismic-rich-text :field="slice.primary.caption" class="blog-image-caption" />
				</template>
				<template v-else-if="slice.slice_type === 'image_with_caption'">
					<prismic-image :field="slice.primary.image" class="blog-image" />
					<prismic-rich-text :field="slice.primary.image_description" class="caption" />
				</template>
				<template v-else-if="slice.slice_type === 'ride_stats'" class="ride-stats">
					<span class="ride-stat">
						<Bike class="ride-stat-icon" />
						{{slice.primary.bike[0].text}}
					</span>
					<span class="ride-stat">
						<Speedometer class="ride-stat-icon" title="My tip" />
						{{slice.primary.avg_speed[0].text}} km / hr
					</span>
					<span class="ride-stat">
						<MapMarkerDistance class="ride-stat-icon" />
						{{slice.primary.total_km[0].text}} km
					</span>
					<span class="ride-stat">
						<FlagCheckered :h="24" class="ride-stat-icon" />
						<a :href="slice.primary.strava_url[0].text" target="_blank" rel="nofollow" class="strava-link">
						See on Strava</a>
					</span>
					<!-- <prismic-image :field="slice.primary.image" class="blog-image" />
					<prismic-rich-text :field="slice.primary.image_description" class="caption" />-->
				</template>
			</section>
		</article>
	</div>
</template>

<script>
import moment from "moment";
import Speedometer from "mdi-vue/Speedometer.vue";
import Bike from "mdi-vue/Bike.vue";
import MapMarkerDistance from "mdi-vue/MapMarkerDistance.vue";
import FlagCheckered from "mdi-vue/FlagCheckered.vue";

export default {
	name: "blogPost",
	data() {
		return {
			blog: {
				title: [{ text: "" }],
				labels: [],
				prismicID: "",
				uid: "",
				first_publication_date: ""
				// seo_title: "",
				// seo_description: "",
				// seo_image: ""
			},
			slices: []
		};
	},
	components: {
		Speedometer,
		Bike,
		MapMarkerDistance,
		FlagCheckered
	},
	methods: {
		getContent(uid) {
			this.$prismic.client.getByUID("blogpost", uid).then(document => {
				console.log("document", document);
				// Can't simply put the result in an empty blog object without console erros about undefined before its done loading. So we set them individually with starting empty objects and arrays
				this.blog.title = document.data.blog_title;
				this.blog.first_publication_date = moment(
					document.first_publication_date
				).format("MMMM Do YYYY");
				this.blog.labels = document.tags;
				// this.blog.seo_title = document.data.seo_title[0].text;
				// this.blog.seo_description = document.data.seo_description[0].text;
				// this.blog.seo_image = document.data.seo_image.url;
				this.slices = document.data.body;
				this.blog.prismicID = document.id;
			});
		}
	},
	created() {
		this.getContent(this.$route.params.uid);
		this.blog.uid = this.$route.params.uid;
	},
	beforeRouteUpdate(to, from, next) {
		//   This prevents blog page not updating upon route change
		this.getContent(to.params.uid);
		next();
	}
};
</script>

<style lang="scss">
.blog {
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

.blog-image-caption {
	font-size: 12px;
	line-height: 20px;
	padding-top: 8px;
	p {
		margin: 0;
		padding: 0;
	}
}

.ride_stats {
	display: flex;
	justify-content: space-between;
	align-content: space-between;
	margin: 64px 0;
}

.ride-stat {
	margin: 8px;
	display: flex;
	align-items: center;
	&:nth-child(1) {
		margin: 8px 0;
	}
	.ride-stat-icon {
		margin-right: 8px;
		height: 24px;
	}
	.strava-link {
		cursor: pointer;
		color: unset;
	}
	@media only screen and (max-width: 768px) {
		font-size: 13px;
	}
}
</style>
