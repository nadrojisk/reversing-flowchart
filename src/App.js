import React, { Component } from "react";
import "./App.css";

// Importing installed tools
import { Flowpoint, Flowspace } from "flowpoints";

// Importing local tools
import { Sidebar } from "./sidebar/Sidebar.js";
import { MainButtons } from "./MainButtons";
import { MainLibrary } from "./MainLibrary";
import { HelpDialog } from "./HelpDialog";
import { parse_yaml } from "./Helpers";

class Node {
  constructor(msg, children, key, description = "", references = "") {
    this.msg = msg;
    this.key = key;
    this.children = children;
    this.description = description;
    this.references = references;
  }
}

// TODO: figure out how to have box highlighted when you click it
// TODO: figure out how to better do box placement

class App extends Component {
  constructor(props) {
    super(props);

    // Building state library
    this.state = MainLibrary();

    // Helpers
    this.diagramRef = null;
    this.count = Object.keys(this.state.points).length;

    // Binding class methods
    this.showHideHelp = this.showHideHelp.bind(this);
    this.showHide = this.showHide.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.makeFlowchart = this.makeFlowchart.bind(this);
    this.addNode = this.addNode.bind(this);

    this.makeFlowchart();
  }

  makeFlowchart() {
    // Parses YAML file and produces flowchart
    const nodes_from_yaml = parse_yaml();

    let nodes = {};
    for (var value in nodes_from_yaml) {
      if (value === "start") {
        continue;
      }
      let node_obj = nodes_from_yaml[value];
      let tmp = new Node(
        node_obj.name,
        node_obj.path,
        value,
        node_obj.description,
        node_obj.references
      );
      nodes[tmp.key] = tmp;
    }

    let leafs = nodes_from_yaml["start"];

    // grabs center of screen
    var x = window.innerWidth / 2;
    var y = window.innerHeight / 2 - 300;

    this.addNode(leafs, [x], y, nodes);
  }

  calx(num_of_children) {
    var base_x = window.innerWidth / 2;
    var children = [];
    if (num_of_children === 1 || num_of_children === 0) {
      return [window.innerWidth / 2];
    } else if (num_of_children % 2) {
      children.push(base_x);
    }
    var j = 0;
    var i = 0;
    for (; children.length < num_of_children; i++) {
      children.push(base_x + (j + 1) * 160 * Math.pow(-1, i));
      if (i % 2 !== 0) {
        j++;
      }
    }

    return children;
  }

  addNode(children, x, y, nodes) {
    // function which generates node which is converted to a flowpoint
    // at render. called recursively

    var count = 0;
    for (var child_name of children) {
      try {
        var child = nodes[child_name];
        var outputs = [];
        if (child.children != null) {
          for (let out_name of child.children) {
            let out = nodes[out_name];
            if (out) {
              outputs.push(out.key);
            }
          }
        }
        var x_locs = this.calx(outputs.length);
        this.handleAddPoint(child, x[count], y, outputs);
        this.addNode(outputs, x_locs, y + 180, nodes);

        count++;
      } catch (e) {}
    }
  }

  handleAddPoint(node, x, y, outputs = []) {
    // generates object and adds to point dict, converted into flowpoint at render
    var newpoint = {
      msg: node.msg,
      pos: { x: x, y: y },
      outputs: outputs,
      key: node.key,
      description: node.description,
      references: node.references,
    };

    var points = this.state.points;
    // ensures dups arent created
    for (let count in points) {
      let point = points[count];
      if (point.key === node.key) {
        return;
      }
    }
    points["" + this.count] = newpoint;
    this.count += 1;
    this.setState({
      points,
      selected: "" + (this.count - 1),
      lastPos: { x: this.state.lastPos.x, y: this.state.lastPos.y + 100 },
    });
  }

  showHideHelp() {
    var visual = this.state.visual;
    visual.show_help_dialog = !visual.show_help_dialog;
    this.setState({ visual });
  }

  showHide() {
    // Loading from state
    var visual = this.state.visual;

    // Open/close drawer
    visual.drawerOpen = !visual.drawerOpen;

    // Updating state
    this.setState({ visual });
  }

  handleClick(key, e) {
    // Loading from state
    this.doFocus = true;
    var flowpoints = this.state.points;
    var settings = this.state.settings;

    // Handling click

    // If not shift pressed: Select / deselect flowpoint
    settings.selected =
      settings.selected === null ? key : settings.selected === key ? null : key;

    // Updating state
    this.setState({
      settings,
      flowpoints,
    });
  }

  render() {
    var visual = this.state.visual;
    return (
      <div>
        <Sidebar
          state={this.state}
          refresh={() => {
            return this.state;
          }}
          updateVisual={(visual) => this.setState({ visual })}
          notification={(msg, color) => this.showNotification(msg, color)}
          diagramRef={this.diagramRef}
        />

        <Flowspace
          theme={visual.theme}
          variant={visual.variant}
          background={visual.background}
          arrowStart={visual.arrow === "start" || visual.arrow === "both"}
          arrowEnd={visual.arrow === "end" || visual.arrow === "both"}
          getDiagramRef={(ref) => {
            this.diagramRef = ref;
          }}
          avoidCollisions={true}
          style={{ height: "100vh", width: "100vw" }}
          connectionSize={this.state.lineWidth}
          selected={this.state.selected}
          selectedLine={this.state.selectedLine}
          onClick={() => {
            this.setState({ selected: null, selectedLine: null });
          }}
          onLineClick={(key_a, key_b) => {
            this.setState({ selectedLine: { a: key_a, b: key_b } });
          }}
        >
          {Object.keys(this.state.points).map((key) => {
            var point = this.state.points[key];

            return (
              <Flowpoint
                key={point.key}
                snap={{ x: 10, y: 10 }}
                style={{
                  height: Math.max(50, Math.ceil(point.msg.length / 20) * 30),
                }}
                startPosition={point.pos}
                outputs={point.outputs}
                onClick={(e) => {
                  this.handleClick(key, e);
                }}
                onTouch={(e) => {
                  this.handleTouch(key);
                }}
                onDrag={(pos) => {
                  var points = this.state.points;
                  points[key].pos = pos;
                  this.setState({ points, lastPos: pos });
                }}
              >
                <div
                  style={{ display: "table", width: "100%", height: "100%" }}
                >
                  <div
                    style={{
                      display: "table-cell",
                      verticalAlign: "middle",
                      textAlign: "center",
                      paddingLeft: 2,
                      paddingRight: 2,
                    }}
                  >
                    {point.msg !== "" ? point.msg : "Empty"}
                  </div>
                </div>
              </Flowpoint>
            );
          })}
        </Flowspace>

        <MainButtons
          state={this.state}
          showHide={this.showHide}
          showHideHelp={this.showHideHelp}
        />

        <HelpDialog
          open={this.state.visual.show_help_dialog}
          onClose={() => {
            var visual = this.state.visual;
            visual.show_help_dialog = false;
            this.setState({ visual });
          }}
        />
      </div>
    );
  }
}

export default App;
