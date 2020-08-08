<template>
  <div class="about">
    <h1>{{fields.title}}</h1>
     <prismic-rich-text :field="fields.richContent"/>
     <prismic-image :field="fields.photo"/>
  </div>
</template>


<script>
export default {
  data () {
    return {
      fields: {
        title: null,
        richContent: null,
        photo: null
      }
    };
  },
  methods: {
    getContent () {
      this.$prismic.client.getSingle('about')
        .then((document) => {
          this.fields.title = document.data.title[0].text;
          this.fields.richContent = document.data.content;
          this.fields.photo = document.data.photo;
        })
    }
  },
  created () {
    this.getContent();
    console.log('hi', this.fields);
  }
}
</script>