// Support component names relative to this directory:
const componentRequireContext = require.context("admin", true);
const ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
