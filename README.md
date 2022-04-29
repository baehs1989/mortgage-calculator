# Mortgage Rate Calculator
A Simple Mortgage Rate Calculator can be easily embedded onto external websites as a 3rd party plugin. It will be embedded without causing any conflict as `CSS Modules` is being used to avoid namespace collision for classes.

The app is built with ReactJS with basic dependencies to keep it simple and light. Please refer to `package.json` that will list all dependencies of the app. `core-js` and `regenerator-runtime` are the biggest packages required to support IE. If the app doesn't need to support IE in the future, the packages can be removed, and the app can be lighter.

The widget can be placed at any location within the HTML document. All you have to do is place "\<div id="zuvafetest">\<div>" where the widget needs to be and import required CSS/js files. Please see the examples below. The required CSS/js files can be extracted using the `npm run widget-build` script described in the below section.


```
<header>
    ...
    <link href="./zuvafetest-main.css" rel="stylesheet">
    ...
</header>

<body>
    <div id="zuvafetest">
        <!-- Widget will be rendered here-->
    <div>
    
    ...

    <script defer="defer" src="./zuvafetest-main.js"></script>
</body>
```

```
<header>
    ...
    <link href="./zuvafetest-main.css" rel="stylesheet">
    ...
</header>

<body>
    <style>
      .fixed-parent {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 400px;
        height: 600px;
      }
    </style>

    <div class="fixed-parent">
        <div id="zuvafetest">
            <!-- Widget will be rendered here-->
        <div>
    </div>

    ...

    <script defer="defer" src="./zuvafetest-main.js"></script>
</body>
```

## Respnsive UI
The App is designed to adapt to any possible screen size to make the UI fully responsive. As a widget, it will be fully responsive to perfectly fit into its parent element.

## Browser Support
The App supports the latest, stable release of all browsers. You won't need to provide any JavaScript polyfills for IE11 as it is already included as a part of the build.

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the widget in the development mode.
You will find `package_window.json` and `package_mac.json` in the root directory. Before running either `npm ci` or `npm install`, please choose one file and rename it as `package.json`.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run ctest`
Launches the test runner with test coverage in the interactive watch mode.

### `npm run build`
Builds the standalone app for production to the `build` folder.

### `npm run widget-build`
Builds the required js/css files which requires for embedding the app as a widget for production. You will require to extract `/static/css/zuvafetest-main.css` and `/static/js/zuvafetest-main.js` from `build` folder.
