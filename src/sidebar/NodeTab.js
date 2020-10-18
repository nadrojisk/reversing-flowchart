import React from "react";

const SettingsSection = (props) => {
  var settings = props.state.settings;
  var flowpoints = props.state.flowpoints;

  const point = flowpoints[settings.selected];
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>{point.msg}</h3>

      <div style={{ paddingTop: 15 }}>
        <h4>Description:</h4>
        <p> {point.description}</p>

        <h4>References:</h4>
        <p>
          <a href={point.references}>{point.references}</a>
        </p>
      </div>
    </div>
  );
};

export const NodeTab = (props) => {
  var settings = props.state.settings;

  // Nothing selected? Returning msg to select something
  if (settings.selected === null) {
    return (
      <div style={{ display: "table", width: "100%", height: "50px" }}>
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            textAlign: "center",
          }}
        >
          Select a step to display it's settings.
        </div>
      </div>
    );
  }

  // Paramaters and settings of selected
  return (
    <div style={{ padding: 15 }}>
      <SettingsSection
        state={props.state}
        refresh={props.refresh}
        updateFlowpoints={props.updateFlowpoints}
        getEmptyFlowpointContent={props.getEmptyFlowpointContent}
        deleteSelected={props.deleteSelected}
      />
    </div>
  );
};
