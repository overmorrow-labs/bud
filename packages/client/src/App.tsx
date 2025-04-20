import { autoPlacement, offset, shift, useFloating } from "@floating-ui/react";
import { useState } from "react";
import { Rnd } from "react-rnd";
import { Button } from "./components/Button";
import { ChatWindow } from "./components/ChatWindow";

export const App = () => {
  // STATE
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // HOOKS
  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    middleware: [
      autoPlacement({
        allowedPlacements: [
          "top-end",
          "bottom-end",
          "top-start",
          "bottom-start",
        ],
      }),
      offset(10),
      shift(),
    ],
  });

  // DRAW
  return (
    <>
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: "auto",
          height: "auto",
        }}
        disableDragging={isOpen}
        onDragStart={() => setIsDragging(true)}
        onDragStop={() => setIsDragging(false)}
        enableResizing={false}
        bounds="body"
      >
        <div ref={refs.setReference}>
          <Button
            isActive={isOpen}
            onClick={() => (!isDragging ? setIsOpen((state) => !state) : null)}
          />
        </div>
      </Rnd>
      {isOpen ? (
        <div ref={refs.setFloating} style={floatingStyles}>
          <ChatWindow />
        </div>
      ) : null}
    </>
  );
};
