# react-three-sections

Create sections for a react three canvas, and add a scrollbar to it.

# Instalation

`npm i @stdevelopr/react-three-sections`

# Usage

Wrap your react-three-fiber canvas with a Scanvas and put your code inside a Section tag. Each Section will be rendered with a full viewport height that can be scrolled. Set an offset property defining the position in the canvas, starting at 0.

```
import { Scanvas, Section } from "@stdevelopr/react-three-sections"

<Scanvas>
    // react-three-fiber Canvas
    <Canvas>
        // Here you define your sections
        <Section offset={0}>
            // react-three-fiber code...
        </Section>
        // ... n-1 sections
        <Section offset={n}>
            // n is a number indicating the section position.
            // ...
        </Section>
     </Canvas>
</Scanvas>
```
