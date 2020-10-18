import React from "react";

// Importing local tools
import { NodeTab } from "./NodeTab.js";

// Styles
import "./SidebarContents.css";

export const SidebarContents = (props) => {
  var state = props.state;
  var visual = state.visual;
  var settings = state.settings;
  return (
    <div
      class="sidebarContents"
      style={{
        backgroundColor: visual.darkTheme ? "#1b1918" : null,
      }}
    >
      {settings.tab === "Step" ? (
        <NodeTab
          state={state}
          refresh={props.refresh}
          updateFlowpoints={props.updateFlowpoints}
          updateEnvironment={props.updateEnvironment}
          updateVisual={props.updateVisual}
          updateSettings={props.updateSettings}
          notification={props.notification}
          getEmptyFlowpointContent={props.getEmptyFlowpointContent}
          deleteSelected={props.deleteSelected}
        />
      ) : null}
    </div>
  );
};
