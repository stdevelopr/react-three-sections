import React, { createContext, useRef, useContext } from "react";
import { useFrame, useThree } from "react-three-fiber";
import lerp from "lerp";

const offsetContext = createContext(0);
let top = 0;

function Scanvas({ children }) {
  const sections_array = children.props.children.filter(
    item => item.type.name === "Section"
  );

  const domContent = useRef();
  const scrollArea = useRef();

  const onScroll = e => {
    top = e.target.scrollTop;
  };
  return (
    <>
      {children}
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent}></div>
        <div style={{ height: `${sections_array.length * 100}vh` }}></div>
      </div>
    </>
  );
}

function Section({ children, offset, ...props }) {
  const { offset: parentOffset, sectionHeight, aspect } = useSection();
  const ref = useRef();
  offset = offset !== undefined ? offset : parentOffset;
  useFrame(() => {
    const curY = ref.current.position.y;
    const curTop = top / aspect;
    ref.current.position.y = lerp(curY, curTop, 0.1);
  });
  return (
    <offsetContext.Provider value={offset}>
      <group {...props} position={[0, -sectionHeight * offset, 0]}>
        <group ref={ref}>{children}</group>
      </group>
    </offsetContext.Provider>
  );
}

function useSection() {
  const { size, viewport } = useThree();
  const offset = useContext(offsetContext);
  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;
  const canvasWidth = viewportWidth;
  const canvasHeight = viewportHeight;
  const mobile = size.width < 700;
  const margin = canvasWidth * (mobile ? 0.2 : 0.1);
  const contentMaxWidth = canvasWidth * (mobile ? 0.8 : 0.6);
  const sectionHeight = canvasHeight;
  const aspect = size.height / viewportHeight;
  return {
    aspect,
    viewport,
    offset,
    viewportWidth,
    viewportHeight,
    canvasWidth,
    canvasHeight,
    mobile,
    margin,
    contentMaxWidth,
    sectionHeight
  };
}

export { Scanvas, Section };
