<template>
  <div class="HOME page">
    <header>
      <img src="../assets/logo.svg" />
      <section>
        <div>
          <h1>My Mind Map</h1>
          <p>Organize your ideas, focus on what you want !</p>
          <p style="font-size: 0.8em">
            Created with
            <a
              href="https://mairs.netlify.app"
              style="display: inline; color: inherit; font-weight: bold"
              >mairs</a
            >
          </p>
        </div>
      </section>
      <section>
        <h3>
          {{
            myMaps.length === 0 ? "Create your first map :" : "My latest maps :"
          }}
        </h3>
        <router-link @click="newMapPlate()" to="/">
          <figure>
            <i class="fas fa-plus"></i>
          </figure>
        </router-link>
        <router-link
          v-for="map in myMaps.slice(0, Math.min(3, myMaps.length))"
          :key="map.body[0].content"
          :to="`/map?id=${map.headers.localId}`"
        >
          <figure>
            <p>{{ map.body[0].content }}</p>
          </figure>
        </router-link>
        <m-button v-if="myMaps.length > 3" @click="all = true"
          >See All</m-button
        >
      </section>
    </header>
    <transition name="slide-bottom">
      <div class="all-maps" v-if="all">
        <div><i class="fas fa-angle-down fa-2x" @click="all = false"></i></div>
        <div class="container">
          <router-link @click="newMapPlate()" to="/">
            <figure>
              <i class="fas fa-plus"></i>
            </figure>
          </router-link>
          <router-link
            v-for="map in myMaps"
            :key="map.body[0].content"
            :to="`/map?id=${map.headers.localId}`"
          >
            <figure>
              <p>{{ map.body[0].content }}</p>
            </figure>
          </router-link>
        </div>
      </div>
    </transition>
    <transition name="fade-bottom">
      <m-poppup ref="pop">
        <h4 for="creator">Who is creating this map ?</h4>
        <div class="creator-name">
          <input
            type="text"
            id="creator"
            v-model="creator"
            placeholder="Enter your name please"
          />
        </div>
        <h4>Choose your map theme</h4>
        <div class="color-choosers">
          <input
            type="radio"
            value="purple"
            id="color-1"
            name="theme"
            v-model="theme"
          />
          <label for="color-1"></label>
          <input
            type="radio"
            value="green"
            id="color-2"
            name="theme"
            v-model="theme"
          />
          <label for="color-2"></label>
          <input
            type="radio"
            value="blue"
            id="color-3"
            name="theme"
            v-model="theme"
          />
          <label for="color-3"></label>
          <input
            type="radio"
            value="red"
            id="color-4"
            name="theme"
            v-model="theme"
          />
          <label for="color-4"></label>
          <input
            type="radio"
            value="grey"
            id="color-5"
            name="theme"
            v-model="theme"
          />
          <label for="color-5"></label>
          <input
            type="radio"
            value="orange"
            id="color-6"
            name="theme"
            v-model="theme"
          />
          <label for="color-6"></label>
        </div>
      </m-poppup>
    </transition>
  </div>
</template>

<script>
import { MPoppup, MButton } from "mairs";
export default {
  name: "HomePage",
  components: { MPoppup, MButton },
  data() {
    return {
      myMaps: undefined,
      all: false,
      theme: "orange",
      creator: "",
    };
  },
  methods: {
    async newMapPlate() {
      let res = await this.$refs.pop.show({
        title: "Create new Map",
        message: "",
        cancel: "Cancel",
        confirm: "Create",
      });
      if (res) this.createMap();
    },
    createMap() {
      this.$store.commit("increaseID", "map");
      const currentLocalMaps = JSON.parse(localStorage.getItem("myMaps"));
      let newMap = {
        headers: {
          creator: this.creator,
          theme: this.theme,
          localId: `map_${this.$store.state.MAP_ID}`,
          isWatermark: this.watermark,
        },
        body: [
          {
            content: "Click to edit text. Right click to add more ideas",
            id: "1",
          },
        ],
      };
      currentLocalMaps.push(newMap);
      localStorage.setItem("myMaps", JSON.stringify(currentLocalMaps));
      location.href += `map?id=map_${this.$store.state.MAP_ID}`;
    },
  },
  created() {
    this.myMaps = JSON.parse(localStorage.getItem("myMaps")).reverse();
  },
};
</script>

<style lang="scss" scoped>
@use "mairs/sass" as *;
header {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to right,
    #ff9472,
    #f2709c
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: rgb(255, 255, 255);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  position: relative;
  z-index: 0;

  a figure {
    border: 2px dashed white;
    color: white;
    background-color: rgba(255, 255, 255, 0.3);
  }

  & > img {
    z-index: 0;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0.03;
  }

  section {
    z-index: 1;
    text-align: left;
    font-size: 1.1em;
    h1 {
      font-size: 2em;
    }
    h2 {
      font-size: 1.5em;
    }
    &:last-of-type {
      display: grid;
      grid-template-columns: 180px 180px;
      grid-auto-rows: 60px 120px 120px 60px;
      grid-gap: 16px;
      h3,
      button {
        grid-column: span 2;
      }
      .MBUTTON {
        background-color: rgba(255, 255, 255, 0.3);
        &:hover {
          transform: scale(1);
          background-color: rgba(255, 255, 255, 0.8);
          color: #f77f8a;
        }
      }
    }
  }
}

.all-maps {
  border-radius: $ui_radius;
  position: fixed;
  top: 40px;
  background-color: $color_main;
  width: 100vw;
  height: 100vh;
  padding: 40px 26px;
  z-index: 1;
  div:not(.container) {
    text-align: center;
    color: rgba(40, 40, 40, 0.3);
    i {
      transform: translateY(-20px);
      cursor: pointer;
    }
  }
  .container {
    min-height: 100%;
    text-align: center;
    overflow: auto;
    a {
      margin: 10px;
    }
  }
}

a {
  display: inline-block;
  position: relative;
  width: 180px;
  height: 120px;
  figure {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    border: 2px dashed rgb(60, 60, 60);
    color: rgb(60, 60, 60);
    background-color: rgba(60, 60, 60, 0.3);
    border-radius: $ui_radius;
    text-align: center;
    padding: 10px;
    margin: 0;
    cursor: pointer;
    p {
      font-size: 0.9em;
    }
  }
}

.creator-name {
  input[type="text"] {
    display: block;
    border: none;
    outline: none;
    border-bottom: 2px solid $color_accent;
    width: 70%;
    font-size: 1em;
    font-family: $font_en;
    margin-bottom: 20px;
    background: transparent;
  }
}

.color-choosers {
  display: flex;
  justify-content: space-around;
  input[type="radio"] {
    display: none;
    &[value="grey"] + label {
      background: rgba(149, 175, 192, 1);
    }
    &[value="blue"] + label {
      background: rgba(88, 132, 243, 1);
    }
    &[value="green"] + label {
      background: rgba(76, 184, 133, 1);
    }
    &[value="purple"] + label {
      background: rgb(131, 103, 184, 1);
    }
    &[value="red"] + label {
      background: rgb(219, 70, 95, 1);
    }
    &[value="orange"] + label {
      background: rgba(255, 148, 114, 1);
    }
    &:checked + label {
      box-shadow: -1px 2px 4px 0 rgba(0, 0, 0, 0.6);
      transform: translateY(-4px);
    }
  }
  label {
    content: "";
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.4s ease;
  }
}
</style>
