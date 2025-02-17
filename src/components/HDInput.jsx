import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useImperativeHandle } from "react";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import EventExecutor from '../service/EventExecutor';

const HDInput = React.forwardRef((props, ref) => {

  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext()
  const { element } = props;

  const [value, setValue] = useState(element.value || "");

  /**
   * We can play with the component dynamically
   */
  useImperativeHandle(ref, () => ({
    sayHello() {
      alert('Hello Imperative handle')
    },
    updateValue(value) {
      setValue(value);
    }
  }));

  useEffect(() => {
    updateMeta(meta); //This is necesary, put in all the components... we need to update the meta.elementMap so need to call thuis method after the input is rendered
  }, []);

  const executeFocusEvent = () => {//TODO Shilpa will take care of it
    if (element.attributes && element.attributes.onfocus) {
      EventExecutor.executeEvent(props.meta, element.attributes.onfocus, null, null);
    }
  }
  const executeBlurEvent = () => {
    if (element.attributes && element.attributes.onblur) {
      EventExecutor.executeEvent(props.meta, element.attributes.onblur, null, null);
    }
  }

  const executeKeyupEvent = () => {
    if (element.attributes && element.attributes.onkeyup) {
      EventExecutor.executeEvent(props.meta, element.attributes.onkeyup, null, null);
    }
  }

  const executeKeyDownEvent = () => {
    if (element.attributes && element.attributes.onkeydown) {
      EventExecutor.executeEvent(props.meta, element.attributes.onkeydown, null, null);
    }
  }

  const handleBlur = (e) => {
    element.value = value;
  };

  return (
    <>
      <InputText
        ref={ref}
        maxLength={element?.attributes?.maxLength}
        placeholder={element?.attributes?.placeholder}
        name={props.name}
        id={props.name}
        value={value || element?.attributes?.defaultValue}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => executeBlurEvent()}
        onFocus={(e) => executeFocusEvent()}
        onKeyUp={(e) => executeKeyupEvent()}
        onKeyDown={(e) => executeKeyDownEvent()}
      />
    </>
  );
});

export default HDInput;
