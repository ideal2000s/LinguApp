import 'extensions/actiontextInit/actiontext.scss';

const componentRequireContext = require.context('teach', true);
const ReactRailsUJS = require('react_ujs');
ReactRailsUJS.useContext(componentRequireContext);
