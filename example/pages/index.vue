<template>
  <section class="p-5 text-center">
    <h2>process.env =</h2>
    <h3>{{ env }}</h3>
  </section>
</template>

<script>
export default {
  asyncData({ env }) {
    return {
      env
    }
  },
  head: { 
    link: [{ 
      rel: "stylesheet", 
      type: "text/css", 
      href: "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" 
    }]
  }
}
</script>