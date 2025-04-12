# 3JS

## Install Commands

npm install --save three
npm install --save-dev vite

## Testing Commands

npx vite

## Project Purpose

- This Project was created for cprg-310-a assignment: Implementing emerging trends. The technology I chose was threejs, a javascript library that allows developers to render a website as a 3d scene with cameras, lighting, and 3d models. I chose 3js as I have previously experemented with working in a 3 dimensional space using the unity game engine, as well as creating 3d models in blender.
- Creating a 3d website can allow a much more interesting and immersive user experience, but it can be difficult to understand as a beginner as working in a 3d space adds another layer of complexity and opens up more potential issues.

## The Project

Camera & Controls

- The scene is rendered with the use of a single perspective camera. Aspect ratio, field of view and clipping planes are all defined when this is created.
- Three.js has built in controls that can be added into the scene to control the camera. the control type I chose was orbitControls to allow the user to rotate the camera around a fixed vector 3, defaulting to 0,0,0 which is the position of earth.
  lighting

- There are two forms of lighting in this scene. The main one being a directional light to simulate sunlight, and an ambient light to provide a weak light to the entire scene, which gives the impression of shadows when compared to the directional light.

Planets

- The planets throughout this scene are created using geometry objects created with 3js, and 2d texture maps created in adobe illustrator.
- For objects like the moon and saturn's rings, I needed to add them into an empty group to rotate the object around a central point, rather than just on it own axis.

Stars

- There is a function in main.js named addstar. Within this function I define the shape of the star, the material of the star, and combine both into a mesh. I then created several random values that are used to give the newely created star a random position within a 3d rectangle and add the star into the scene. I obviously would need more than one star however so I created an array of 500 and filled each part of the array with the function in order to create 500 stars, each with their own randomized position within the defined range.

UI elements

- The user is able to navigate between planets using html elements added onto the webpage overtop of the renderer.
- There are differences in size between each planet. to improve the navigation between planets I gave each button a switch case that checks an index and changes the transforms of the camera, and the camera target in increments to smoothly move the camera from planet to planet.

Raycasting

- In order to interact with elements within the scene, I needed to create a raycaster to shoot and invisible beam out of the camera based on the position of the cursor. If the ray intersects with any planets, it checks the name value of the planet, and updates the innerhtml of the h1.

## Potential Updates

- Main.js contains almost 500 lines of javascript. scrolling through it is a nightmare and it would likely be easier to work with if it were broken into several smaller files.
- Higher quality textures of each planet, as well as bump maps to give the spheres texture.
- Orbit the planets around the sun.
- Provide more information about each planet when hovered over with the cursor. I wanted to implement this but I ran out of time.
- Improved UI elements.
- Instead of the current camera and controls, working in a 3d space gives the potential to turn this website into a game where the user controls a space ship and flies around space from planet to planet.
- Custom Cursor
- Give pluto its time under the sun.

## Issues

- The current navigation between planets changes the position of the camera on the z-axis regardless of rotation. This caused an issue when the user rotates the camera to be in line with the planets. It is not a large issue, however it makes the distance away from the planets inconsistent. If i was able to find a way to adjust the cameras distance relative to the target rather than along a single axis, this would no longer be an issue.
- The responsiveness breaks slightly when adjusting the screen size in the inspector. This is not a problem when adjusting the screen size in a minimized window. I am very confused.
- the scale of each planet is not the same as in real life, I think it's best untill i understand the library a bit better before i start stress-testing the performance when the sun is 1000 times larger than the earth and i throw in millions of stars.
- Certain areas of the documentation are signifigantly more detailed than other. This made it difficult to find out how to use certain functions.
