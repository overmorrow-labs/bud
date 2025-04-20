import { useFloating } from "@floating-ui/react";
import { useState } from "react";
import { Rnd } from "react-rnd";
import { Button } from "./components/Button";

export const App = () => {
  // STATE
  const [isOpen, setIsOpen] = useState(false);

  // HOOKS
  const { refs, floatingStyles } = useFloating({
    open: isOpen,
  });

  // DRAW
  return (
    <>
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 100,
          height: 40,
        }}
        enableResizing={false}
        bounds="body"
        className="bg-red-500"
      >
        <div
          ref={refs.setReference}
          // className="budclient:w-full budclient:h-full"
        >
          <Button onClick={() => setIsOpen((state) => !state)} />
        </div>
      </Rnd>
      {isOpen ? (
        <div ref={refs.setFloating} style={floatingStyles}>
          Popover
        </div>
      ) : null}
    </>
  );
};
