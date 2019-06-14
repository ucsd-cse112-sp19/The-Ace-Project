## Installing Via NPM

### Setting up your Workspace
This guide assumes you have setup up your development environment using NPM. Learn more about installing and setting up NPM <a href="https://www.npmjs.com/get-npm" target="_blank">here</a>.

### Installing Ace Web Components
Installing Ace Web Components from NPM couldn't be simpler. Simply run the following command:

```
npm i ace-webcomponents
```

### Adding the Components to your Site
Now, all you have to do is include the components in your site! You have a couple choices on how to include them, depending on your needs. The first is without polyfills included:

```
<script src="node_modules/ace-webcomponents/dist/standard-bundle.js></script>
```

The second includes all necessary polyfills, so your site can support legacy browsers:

```
<script src="node_modules/ace-webcomponents/dist/polyfill-bundle.js></script>
```

Note: Ace Web Components do not currently support all browsers. Check out our <a href="https://github.com/ucsd-cse112/The-Ace-Project" target="_blank">Github</a> to see what we support and are planning on supporting.

### Build the Site of Your Dreams

Thats it! Your are all set up and ready to start building your site with Ace Web Components. Check out our <a href="tutorial-adding-components.html">tutorial</a> for a step-by-step guide on building your first site!

## Installing Via Downloaded Script
If you don't want to use NPM, you can easily download the latest bundle from our <a href="https://github.com/ucsd-cse112/The-Ace-Project" target="_blank">Github</a>. Simply include the script at the top of your page, and you are ready to go!