<template>
  <text-bubble
    v-if="!Array.isArray(JSON.parse(ideas))"
    :idea="JSON.parse(ideas)"
    :level="level"
    :editable="editable"
  />
  <section v-else :style="`--items: ${JSON.parse(ideas).length}`">
    <idea-container
      v-for="idea in JSON.parse(ideas)"
      :key="idea"
      :ideas="JSON.stringify(idea)"
      :level="Number.parseInt(level) + 1"
      :editable="editable"
    />
  </section>
</template>

<script>
import IdeaContainer from "./IdeaContainer.vue";
import TextBubble from "./TextBubble";
export default {
  name: "ideaContainer",
  data() {
    return {
      g: 0,
    };
  },
  components: { IdeaContainer, TextBubble },
  props: ["ideas", "level", "editable"],
  methods: {
    countItems(ideas) {
      let arraysInIdeas = JSON.parse(ideas).filter((o) => Array.isArray(o));
      let bubblesInIdeas = JSON.parse(ideas).filter((o) => !Array.isArray(o));
      if (arraysInIdeas.length !== 0) {
        return arraysInIdeas.length;
      } else return bubblesInIdeas.length;
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  display: grid;
  grid-template-columns: repeat(calc(var(--items) - 1), 1fr);
  grid-gap: 8px;
  align-items: start;
  .bubble:first-of-type {
    grid-column: span var(--items);
  }
}
</style>
