import React from "react";
import PropTypes from "prop-types";
import classes from "./Drawer.module.css";

// interface DrawerProps {
//   anchor: string;
//   open: boolean;
//   onClose: () => void;
//   children: ReactNode;
// }

const changeAnchor = (anchor, classes) => {
    switch (anchor) {
      case "left":
        return classes.left;
      case "right":
        return classes.right;
      default:
        return classes.left;
    }
  };

export const Drawer = ({ anchor, open, onClose, children }) => {
  const {
    drawer,
    animate,
    hidden,
    overlay,
    overlayOpen,
    overlayHidden,
    // header
  } = classes;

  return (
    <>
      <div
        className={`${overlay} ${!open && overlayHidden} ${
          open && overlayOpen
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        tabIndex="-1"
        className={`${drawer} ${open && animate} ${
          !open && hidden
        } ${changeAnchor(anchor, classes)}`}
      >
        {/* <div className={header} /> */}
        {children}
      </div>
    </>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  anchor: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
