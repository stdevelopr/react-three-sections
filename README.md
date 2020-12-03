# react-three-sections

Create sections for a react three canvas, and add a scrollbar to it.

# Instalation

`npm i react-three-sections`

# Usage

Wrap your react-three-fiber canvas with a Scanvas and put your code inside a Section tag. Each Section will be rendered with a full viewport height that can be scrolled.

```
import { Scanvas, Section } from "react-three-sections"

<Scanvas>
    // react-three-fiber Canvas
    <Canvas>
        // Here you define your sections
        <Section>
            // react-three-fiber code...
        </Section>
        ...
        <Section>
            // ...
        </Section>
     </Canvas>
</Scanvas>
```
