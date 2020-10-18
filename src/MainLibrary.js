export function MainLibrary() {
  return {
    points: {},
    visual: {
      darkTheme: false,
      theme: "indigo",
      background: "black",
      variant: "filled",
      drawerOpen: true,
      drawerWidth: 360,
      showShape: false,
      showName: false,
      snap: true,
      show_load_dialog: false,
      load_dialog_error: false,
      show_save_dialog: false,
      show_help_dialog: false,
      arrow: "end",
    },
    settings: {
      tab: "Step",
      modelID: null,
      baseUrl: window.location.href.split("/?")[0],
      count: 0,
      selected: null,
      lastPos: { x: 50, y: -40 },
    },

    lastPos: { x: 300, y: 50 },
  };
}
