<template>
  <div class="page">
    <idea-container
      :ideas="JSON.stringify(map.body)"
      :level="0"
      editable="false"
    />
  </div>
</template>

<script>
import ideaContainer from "../components/ideaContainer.vue";

export default {
  name: "Map",
  data() {
    return {
      map: [],
    };
  },
  components: { ideaContainer },
  async beforeMount() {
    let id = location.href.slice(location.href.indexOf("=") + 1);
    const shownMap = await axios.get(`${this.$store.state.backend}/${id}`);
    this.map = shownMap.data;
    this.$store.commit("setMap", shownMap);
    document.body.classList.add(`m-${shownMap.headers.theme}`);
  },
  unmounted() {
    document.body.classList = [];
  },
};
</script>
