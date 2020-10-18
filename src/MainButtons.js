import React from "react";
import { Fab, Tooltip } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import HelpIcon from "@material-ui/icons/Help";
import orange from "@material-ui/core/colors/orange";
import indigo from "@material-ui/core/colors/indigo";

const ButtonContainer = (props) => {
  return (
    <Tooltip
      title={props.tooltip}
      placement="right"
      disableTriggerFocus
      disableFocusListener
    >
      <Fab
        style={{
          background: props.color,
          color: "#ffffff",
          zIndex: 6,
          boxShadow: "none",
        }}
        aria-label={props.tooltip}
        onClick={() => {
          if (props.onClick) props.onClick();
        }}
      >
        {props.children}
      </Fab>
    </Tooltip>
  );
};

export const MainButtons = (props) => {
  return (
    <div style={{ position: "fixed", bottom: 0, right: 0, padding: 20 }}>
      <div>
        <div style={{ paddingBottom: 4 }}>
          <ButtonContainer
            color={orange["A700"]}
            tooltip="Help"
            onClick={props.showHideHelp}
          >
            <HelpIcon />
          </ButtonContainer>
        </div>

        <div>
          <ButtonContainer
            color={indigo["A400"]}
            tooltip="Show/hide sidebar"
            onClick={props.showHide}
          >
            <MenuIcon />
          </ButtonContainer>
        </div>
      </div>
    </div>
  );
};
