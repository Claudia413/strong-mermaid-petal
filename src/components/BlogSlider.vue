<template>
<section>
		<div class="title-row">
			<h2 class="title">{{title}}</h2>
			<span v-if="showArrows" @click="incrementSlideIndex(-1)" class="arrow"><ChevronLeft/></span>
			<span v-if="showArrows" @click="incrementSlideIndex(1)" class="arrow"><ChevronRight/></span>
		</div>
		<div class="slider">
			<!-- <transition-group name="fade" mode="out-in" tag="div" class="slide-row"> -->
				<div v-for="n in numberOfSlides" :key="n" class="slide-row" v-show="slideIndex === n">
					<slot :name="'slide'+n"></slot>
				</div>
			<!-- </transition-group> -->
		</div>
</section>
</template>

<script>
import ChevronRight from "mdi-vue/ChevronRight.vue";
import ChevronLeft from "mdi-vue/ChevronLeft.vue";

export default {
	name: "TextSlider",
	data() {
		return {
			slideIndex: 1
		};
	},
	props: {
		numberOfSlides: Number,
		title: String,
		showArrows: Boolean,
	},
	components: {
		ChevronRight,
		ChevronLeft,
	},
	methods: {
		incrementSlideIndex(number) {
			if (this.slideIndex + number > this.numberOfSlides) {
				this.slideIndex = 1;
			} else if (this.slideIndex + number > 0) {
				this.slideIndex = this.slideIndex + number;
			} else {
				this.slideIndex = this.numberOfSlides;
			}
		}
	}
};
</script>

<style scoped lang="scss">

.title-row {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	.title {
		margin-right: auto;
	}
	.arrow {
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		&:hover {
			color: black;
		}
	}
}

h2 {
  font-family: "Josefin Sans",
     Arial,
     sans-serif;
     font-size: 18px;
     line-height: 28px;
     font-weight: 400;
}

.slider {
	max-width: 100%;
	position: relative;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
}
.slide-row {
	position: relative;
	display: flex;
	justify-content: space-between;
	overflow: hidden;
}
.fade-enter-active {
	animation: move-center-from-right 8s ease-in;
}
.fade-leave-active {
	animation: move-left-from-center 8s ease-in;
}
@keyframes move-center-from-right {
	0% {
		left: 1200px;
		width: 0;
	}
	100% {
		left: 0;
		width: 100%;
	}
}

@keyframes move-left-from-center {
	0% {
		left: 0;
		width: 100%;
	}
	100% {
		left: -1200px;
		width: 0;
	}
}

</style>
