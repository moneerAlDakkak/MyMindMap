import { createStore } from "vuex";

export default createStore({
  state: {
    BUBBLE_ID: localStorage.getItem("BUBBLE_ID")
      ? Number.parseInt(localStorage.getItem("BUBBLE_ID"))
      : 1,
    MAP_ID: localStorage.getItem("MAP_ID")
      ? Number.parseInt(localStorage.getItem("MAP_ID"))
      : 1,

    refs: {
      /*refs set by app component*/
    },
    saved: true,
  },
  mutations: {
    increaseID: (state, type) => {
      if (type == "bubble") {
        state.BUBBLE_ID++;
        localStorage.setItem("BUBBLE_ID", state.BUBBLE_ID);
      } else {
        state.MAP_ID++;
        localStorage.setItem("MAP_ID", state.MAP_ID);
      }
    },
    setMap: (state, map) => {
      state.map = map;
    },
    clearEmpty: (state) => {
      clearEmpty(state.map.body);
    },
    setRefs: (state, refs) => {
      state.refs = refs;
    },
  },
  actions: {
    deleteMap: async (context) => {
      let answer = await context.state.refs.pop.show({
        title: "Map deletion",
        message: "Are you sure that you want to permanently delete this map ?",
        confirm: "Delete",
        cancel: "Cancel",
      });
      if (answer) {
        let mapsArray = JSON.parse(localStorage.getItem("myMaps"));
        mapsArray.splice(
          mapsArray.findIndex(
            (map) => map.headers.localId == context.state.map.headers.localId
          ),
          1
        );
        localStorage.setItem("myMaps", JSON.stringify(mapsArray));
        document.getElementById("home-link").click();
        context.state.refs.mnotes.add({
          title: "Done !",
          text: "Map deleted successfuly",
          type: "success",
        });
      } else return;
    },
    saveMap: (context) => {
      let mapsArray = JSON.parse(localStorage.getItem("myMaps"));
      mapsArray.splice(
        mapsArray.findIndex(
          (map) => map.headers.localId == context.state.map.headers.localId
        ),
        1,
        context.state.map
      );
      localStorage.setItem("myMaps", JSON.stringify(mapsArray));
    },
  },
  modules: {},
});

function clearEmpty(map) {
  map.forEach((e) => {
    if (Array.isArray(e)) {
      if (e.length === 0) {
        map.splice(
          map.findIndex((o) => o.length == 0),
          1
        );
      } else {
        clearEmpty(e);
      }
    }
  });
}
