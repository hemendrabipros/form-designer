import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { memo, useState } from "react";
import AttributePanel from "./attr-panel/AttributePanel";
import { useMetaContext } from "./context/MetaContext";
import { useModalContext } from "./context/ModalContext";
import ControlPanel from "./control-panel/ControlPanel";
import EventModeler from "./events/builder/EventModeler";
import HDMenubar from "./menu-panel/HDMenubar";
import Playground from "./playground/Playground";
import EventExecutor from "./service/EventExecutor";

const Homepage = (props) => {
  const meta = useMetaContext();
  const modalContext = useModalContext();
  const { actions, modals } = modalContext;

  //Initialize the EvenExecutor and pass the modalContext
  setTimeout(() => {
    new EventExecutor(modalContext);
  },0)
  
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
    console.log({actions, modals});
    actions.push(`Hello Modal Calling from Homepage Button ${new Date().toLocaleTimeString()}`, (poppedModal) => {
        console.log(poppedModal);
    });
      //push('Hello Modal Calling from Homepage Button');
  }

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      {modals}
      <HDMenubar toggleEventModal={onHide} />
      <div
        className="p-fluid grid"
        style={{ height: "90vh", width: "100vw", marginTop: "10px" }}
      >
        {meta.editMode ? (
          <div className="col-2 control-panel">
            <ControlPanel />
          </div>
        ) : (
          <></>
        )}
        <div
          className={`${
            meta.editMode ? "col-8 playground" : "col-12 playground-preview"
          }`}
        >
          <div>
            <Playground />
          </div>
        </div>
        {meta.editMode ? (
          <div className="col-2 attribute-panel">
            <AttributePanel />
          </div>
        ) : (
          <></>
        )}
      </div>
      <Dialog
        header="Event Modeler"
        visible={displayBasic}
        style={{ width: "80vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        <EventModeler hide={onHide} />
      </Dialog>
    </>
  );
};

export default memo(Homepage);
