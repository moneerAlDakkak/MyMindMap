<template>
  <div
    :id="idea.id"
    :class="`bubble level-${level} ${idea.style || ''}`"
    @contextmenu.prevent="$refs.menu.show($event)"
  >
    <m-p
      ref="mdtext"
      spellcheck="false"
      :contenteditable="editable"
      @blur="editBubble(map, id, $event)"
      @input="$store.dispatch('saveMap')"
      math
      >{{ idea.content }}</m-p
    >
    <transition name="fade-top">
      <m-menu ref="menu">
        <m-menu-item
          @click="addSubBubble(map, idea.id)"
          icon-start="fas fa-plus"
        >
          Add sub-bubble
        </m-menu-item>
        <m-menu-item
          v-if="idea.id == 1"
          type="danger"
          icon-start="fas fa-trash"
          @click="$store.dispatch('deleteMap')"
        >
          Delete Map
        </m-menu-item>
        <m-menu-item
          v-if="idea.id != 1"
          type="danger"
          icon-start="fas fa-trash"
          @click="deleteBubble(map, idea.id)"
        >
          Delete
        </m-menu-item>
      </m-menu>
    </transition>
  </div>
</template>

<script>
import { MP, MMenu, MMenuItem } from "mairs";
export default {
  name: "TextBubble",
  components: { MP, MMenu, MMenuItem },
  props: ["idea", "level", "editable"],
  data() {
    return {
      map: this.$store.state.map.body,
    };
  },
  methods: {
    // Bubbles methods :
    addSubBubble(map, id) {
      this.$store.commit("increaseID", "bubble");
      if (map[0].id == id) {
        map.push({ content: "New Cell", id: this.$store.state.BUBBLE_ID });
        return;
      }
      map.forEach((o) => {
        if (o.id === this.idea.id) {
          map.splice(
            map.findIndex((c) => c.id === id),
            1,
            [o, { content: "New Cell", id: this.$store.state.BUBBLE_ID }]
          );
        } else if (Array.isArray(o)) {
          this.addSubBubble(o, id);
        }
      });
    },
    editBubble(map, id, e) {
      map.forEach((o) => {
        if (o.id == this.idea.id) {
          o.content = this.$refs.mdtext.getRawContent();
        } else if (Array.isArray(o)) {
          this.editBubble(o, id, e);
        }
      });
    },
    deleteBubble(map, id) {
      if (id == 1) return;
      map.forEach((o) => {
        if (map[0].id === id) {
          map.splice(0, map.length);
          this.$store.commit("clearEmpty");
        } else if (map.some((o) => o.id === id)) {
          map.splice(
            map.findIndex((r) => r.id === id),
            1
          );
        } else if (Array.isArray(o)) {
          this.deleteBubble(o, id);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "mairs/sass" as *;
.bubble {
  position: relative;
  min-width: fit-content;
  margin: 10px 0;
  border-radius: 40px;
  display: inline-block;
  color: $color_onAccent;
  text-align: center;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.2);
  $i: 0;
  @while ($i < 20) {
    &.level-#{$i} {
      background-color: m-darker("accent", calc($i * 4%));
    }
    $i: $i + 1;
  }
  p {
    margin: 0;
    outline: none;
    white-space: pre;
    background: none;
    padding: 14px 20px;
  }
}
</style>
