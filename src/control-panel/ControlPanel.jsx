import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { CONTROL_ITEMS } from "../constants/Elements";
import getComponent from "../constants/HemendraConstants";
import { createElementId } from "../utils/Utils";

const ControlPanel = (props) => {
  /**
   * Add Element to the Playground
   *
   * @param  event
   */
  const addElement = (event) => {
    if (event.value === "clear") {
      clearAll();
    } else {
      const id = createElementId();
      if (!props.meta.elements) {
        props.meta.elements = [];
      }
      const component = getComponent(event.value);
      const element = {
        type: event.value.toLowerCase(),
        name: `${event.value}-${id}`,
        id: `${event.value}-${id}`,
        component,
      };
      props.setMeta((prevValue) => {
        prevValue.elements.push(element);
        return {
          ...prevValue,
        };
      });
    }
  };

  /**
   * Clear the Playground
   */
  const clearAll = () => {
    props.setMeta((prevValue) => {
      prevValue.elements.length = 0;
      return {
        ...prevValue,
        currentElement: null,
      };
    });
  };

  return (
    <>
      <ListBox options={CONTROL_ITEMS()} onChange={addElement} />
    </>
  );
};

export default ControlPanel;
