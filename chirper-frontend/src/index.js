import ReactDOM from 'react-dom'
import './index.css'
import { makeAuthRouting } from './routing';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render( makeAuthRouting(), 
	document.getElementById('root')
	);

