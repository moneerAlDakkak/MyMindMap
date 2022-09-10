<template>
  <div>
    <div style="visibility: hidden">
      <router-link to="/" id="home-link"></router-link>
      <router-link to="/map" id="map-link"></router-link>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade-bottom">
        <component :is="Component" />
      </transition>
    </router-view>
    <transition name="fade-bottom">
      <m-poppup ref="pop" />
    </transition>
    <transition name="slide-right">
      <m-notes ref="mnotes" />
    </transition>
  </div>
</template>

<script>
import { MNotes, MPoppup } from "mairs";
export default {
  name: "App",
  components: { MNotes, MPoppup },
  data() {
    return {
      map: this.$store.state.map,
    };
  },
  mounted() {
    this.$store.commit("setRefs", {
      pop: this.$refs.pop,
      mnotes: this.$refs.mnotes,
    });
    if (!localStorage.getItem("myMaps")) {
      localStorage.setItem("myMaps", JSON.stringify([]));
    }
    new this.$MTheme({
      name: "def",
      colors: {
        main: "rgba(255, 255, 255, 1)",
        text: "rgba(0, 0, 0, 1)",
        accent: "rgb(131, 103, 184, 1)",
        onAccent: "rgba(255, 255, 255, 1)",
      },
      radius: "20",
      fonts: { ar: "Cairo", en: "Poppins" },
    });
    new this.$MTheme({
      name: "blue",
      colors: {
        main: "rgba(255, 255, 255, 1)",
        text: "rgba(0, 0, 0, 1)",
        accent: "rgba(88, 132, 243, 1)",
        onAccent: "rgba(255, 255, 255, 1)",
      },
      radius: "20",
      fonts: { ar: "Cairo", en: "Poppins" },
    });
    new this.$MTheme({
      name: "green",
      colors: {
        main: "rgba(255, 255, 255, 1)",
        text: "rgba(0, 0, 0, 1)",
        accent: "rgba(76, 184, 133, 1)",
        onAccent: "rgba(255, 255, 255, 1)",
      },
      radius: "20",
      fonts: { ar: "Cairo", en: "Poppins" },
    });
    new this.$MTheme({
      name: "grey",
      colors: {
        main: "rgba(20,20,20,1)",
        text: "rgba(255,255,255,1)",
        accent: "rgba(149, 175, 192, 1)",
        onAccent: "rgba(255, 255, 255, 1)",
      },
      radius: "20",
      fonts: { ar: "Cairo", en: "Poppins" },
    });
    new this.$MTheme({
      name: "red",
      colors: {
        main: "rgba(255, 255, 255, 1)",
        text: "rgba(0, 0, 0, 1)",
        accent: "rgb(219, 70, 95, 1)",
        onAccent: "rgba(255, 255, 255, 1)",
      },
      radius: "20",
      fonts: { ar: "Cairo", en: "Poppins" },
    });
    new this.$MTheme({
      name: "orange",
      colors: {
        main: "rgba(255, 255, 255, 1)",
        text: "rgba(0, 0, 0, 1)",
        accent: "rgba(255, 148, 114, 1)",
        onAccent: "rgba(255, 255, 255, 1)",
      },
      radius: "20",
      fonts: { ar: "Cairo", en: "Poppins" },
    });
    this.$MTheme.apply("blue");
  },
};
</script>

<style lang="scss">
@use "mairs/sass" as *;
* {
  box-sizing: border-box;
}
#app {
  .page:not(.HOME) {
    min-height: 100vh;
    width: 100%;
    padding: 10px;
  }
  a {
    text-decoration: none;
  }
}

@include m-animation-fade("fade-bottom", 0, 10px);
@include m-animation-fade("fade-top", 0, 4px);
@include m-animation-slide("slide-bottom", 0, 100%);
</style>
