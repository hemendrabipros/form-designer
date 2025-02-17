import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { memo, useState } from "react";
import AttributePanel from "./attr-panel/AttributePanel";
import { useConfirmationContext } from "./context/ConfirmationDialogContext";
import {
  useMetaContext,
  useToastContext,
  useUpdateMetaContext,
} from "./context/MetaContext";
import { useModalContext } from "./context/ModalContext";
import ControlPanel from "./control-panel/ControlPanel";
import EventModeler from "./events/builder/EventModeler";
import HDMenubar from "./menu-panel/HDMenubar";
import Playground from "./playground/Playground";
import EventExecutor from "./service/EventExecutor";

import Draggable from "react-draggable";

const Homepage = (props) => {
  const meta = useMetaContext();
  const modalContext = useModalContext();
  const { actions, modals } = modalContext;

  const confirmDialogContext = useConfirmationContext();
  const { confirmDialogs } = confirmDialogContext;

  const { togglePlaygroundMode } = useUpdateMetaContext();
  const toastContext = useToastContext();

  //Initialize the EvenExecutor and pass the modalContext
  setTimeout(() => {
    new EventExecutor(modalContext, confirmDialogContext, toastContext);
  }, 0);

  const [displayBasic, setDisplayBasic] = useState(false);
  const onHide = () => {
    setDisplayBasic(!displayBasic);
  };

  const renderFooter = (name) => {
    return (
      <div>
        {/* <Button label="No" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
          <Button label="Yes" icon="pi pi-check" onClick={() => onHide()} autoFocus /> */}
      </div>
    );
  };

  const openModal = () => {
    actions.push(
      `Hello Modal Calling from Homepage Button ${new Date().toLocaleTimeString()}`,
      (poppedModal) => {}
    );
    //push('Hello Modal Calling from Homepage Button');
  };

  return (
    <>
      <div className="top-menubar">
        <HDMenubar toggleEventModal={onHide} />
      </div>
      {modals}
      {confirmDialogs}

      <div className="grid p-fluid">
        <div className="col-12">
          {meta.editMode ? (
            <div className="control-panel">
              <ControlPanel />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="grid p-fluid" style={{ height: "90vh", width: "100%" }}>
        <div
          className={`${
            meta.editMode
              ? "col-12 playground"
              : "col-12 playground-preview m-20"
          }`}
        >
          <Playground />
          <Draggable>
            <Button
              onClick={(e) => togglePlaygroundMode()}
              icon={meta.editMode ? "pi pi-eye" : "pi pi-pencil"}
              style={{ position: "fixed" }}
              className="p-button-rounded p-button-secondary  preview-shortcut"
            />
          </Draggable>
        </div>
      </div>
      {meta.editMode ? (
        <div className="attribute-panel">
          <AttributePanel />
        </div>
      ) : (
        <></>
      )}

      <div className="layout-footer align-items-center justify-content-end flex">
        <footer>
          <p className="mr-3">&copy; 2022 Hemendra Sethi</p>
        </footer>
      </div>
      <Dialog
        header="Event Modeler"
        visible={displayBasic}
        style={{ width: "95vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        <EventModeler hide={onHide} />
      </Dialog>
    </>
  );
};

export default memo(Homepage);
