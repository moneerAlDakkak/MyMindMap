<template>
  <div class="page" ref="page">
    <idea-container
      :ideas="JSON.stringify($store.state.map.body)"
      :level="0"
      editable="true"
    />
    <div id="watermark" v-if="$store.state.map.headers.creator">
      <img src="../assets/logo2.svg" alt="m" />
      <img src="../assets/logo.svg" alt="mmm" />
      <p>
        Created by {{ $store.state.map.headers.creator }} <br />
        using My Mind Map
      </p>
    </div>
    <transition name="fade-bottom">
      <m-poppup ref="pop" />
    </transition>
  </div>
</template>

<script>
import ideaContainer from "../components/IdeaContainer.vue";
import { MPoppup } from "mairs";
export default {
  name: "MapPage",
  data() {
    return {
      oldMap: undefined,
    };
  },
  components: { ideaContainer, MPoppup },
  async beforeRouteLeave() {
    let currentMap = JSON.stringify(this.$store.state.map);
    if (this.oldMap !== currentMap) {
      console.log(this.$refs.pop);
      let answer = await this.$refs.pop.show({
        title: "Don't forget to save",
        message:
          "You haven't saved changes. Would you like to save before leave ?",
        confirm: "Save",
        cancel: "Leave",
      });
      if (answer) {
        this.oldMap = currentMap;
        this.$store.dispatch("saveMap");
        return false;
      } else {
        return true;
      }
    }
  },
  beforeMount() {
    let id = location.href.slice(location.href.indexOf("=") + 1);
    let mapsArray = JSON.parse(localStorage.getItem("myMaps"));
    const shownMap = mapsArray.find((map) => map.headers.localId == id);
    this.oldMap = JSON.stringify(shownMap);
    this.$store.commit("setMap", shownMap);
    this.$MTheme.apply(shownMap.headers.theme);
  },
};
</script>
<style lang="scss" scoped>
@use "mairs/sass/" as *;
.page {
  &:after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      300deg,
      changeOpacity("accent", -0.76) 0%,
      changeOpacity("accent", -0.8) 100%
    );
    z-index: -1;
  }
}
#watermark {
  display: flex;
  align-items: center;
  height: 40px;
  margin: 50px 10px;
  font-size: 0.8em;
  img {
    height: 100%;
    &:first-of-type {
      border-right: 2px solid rgba(0, 0, 0, 0.2);
      padding-right: 10px;
    }
  }
  p {
    margin: 0 10px;
    font-weight: bold;
  }
}
.m-grey {
  img {
    filter: invert(100%);
  }
}
</style>
