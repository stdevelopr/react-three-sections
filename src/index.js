import React, {
  createContext,
  useRef,
  useContext,
  Fragment,
  Children,
  cloneElement
} from "react";
import { useFrame, useThree } from "react-three-fiber";
import lerp from "lerp";

const offsetContext = createContext(0);

// variable to control the top displacement
export let top = {
  value: 0,
  get top() {
    return value;
  },
  set top(val) {
    value = val;
  }
};

// function wrapper to include the scrollbar and the whell scroll function
function Scanvas({ children }) {
  const sections_array = children.props.children.filter(
    item => item.type.name === "Section"
  );

  const whellScrol = e => {
    let newTop = top.value + e.deltaY;
    if (newTop >= 0 && newTop <= window.innerHeight) {
      newTop = top.value + e.deltaY;
      top.value = newTop;
      document.getElementById("scrollid").scrollBy(0, e.deltaY);
    }
  };

  const barScroll = e => {
    top.value = e.target.scrollTop;
  };

  let canvasClone = Children.map(children, item =>
    cloneElement(item, { onWheel: whellScrol })
  );

  return (
    <Fragment>
      {canvasClone}
      <div
        className="scrollArea"
        id="scrollid"
        onScroll={barScroll}
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
          height: "100vh",
          overflow: "scroll"
        }}
      >
        <div
          id="scrollbar"
          style={{
            height: `${sections_array.length * 100}vh`
          }}
        ></div>
      </div>
    </Fragment>
  );
}

// section wrapper that control the section position
function Section({ children, offset, factor = 1, ...props }) {
  const { offset: parentOffset, sectionHeight, aspect } = useSection();
  const ref = useRef();
  offset = offset !== undefined ? offset : parentOffset;
  useFrame(() => {
    const curY = ref.current.position.y;
    const curTop = top.value / aspect;
    ref.current.position.y = lerp(curY, curTop * factor, 0.1);
  });
  return (
    <offsetContext.Provider value={offset}>
      <group {...props} position={[0, -sectionHeight * offset * factor, 0]}>
        <group ref={ref}>{children}</group>
      </group>
    </offsetContext.Provider>
  );
}

// function that returns important parameters
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
