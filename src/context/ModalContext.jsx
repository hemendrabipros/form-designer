import React, { useContext, useState } from "react";
import { createContext } from "react";
import { Dialog } from "primereact/dialog";

export const ModalContext = createContext();

export const useModalContext = () => {
  return useContext(ModalContext);
};

const uniqueModalId = (() => {
  let i = 0;
  return () => i++;
})();

export const ModalContextProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const actions = {
    push(content, onHideCallback) {
      // => means push: () => {}
      let modal;
      if (typeof content === "object") {
        modal = (
          <Dialog
            breakpoints={{ "1360px": "75vw", "960px": "75vw", "640px": "90vw" }}
            style={{ width: "85%", height: "80vh" }}
            visible={true}
            position={content.position}
            key={uniqueModalId()}
            header="Modal Header"
            onHide={() => this.onHide(onHideCallback)}
          >
            {" "}
            {/*TODO  What if I want to handle the event on Modal close */}
            <p>{content.popupText}</p>
          </Dialog>
        );
      } else {
        modal = (
          <Dialog
            breakpoints={{ "1360px": "75vw", "960px": "75vw", "640px": "90vw" }}
            style={{ width: "85%", height: "80vh" }}
            visible={true}
            key={uniqueModalId()}
            header="Modal Header"
            onHide={() => this.onHide(onHideCallback)}
          >
            {" "}
            {/*TODO  What if I want to handle the event on Modal close */}
            <p>{content}</p>
          </Dialog>
        );
      }
      setModals((modals) => [...modals, modal]);
    },
    onHide(onHideCallback) {
      let prevModal = "";
      //modals.pop();
      setModals((prevModals) => {
        prevModal = prevModals[prevModals.length - 1];
        prevModals.pop();
        return [...prevModals];
      });

      onHideCallback && onHideCallback(prevModal); //This is call back method sot
    },
  };

  return (
    <ModalContext.Provider value={{ actions, modals }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
