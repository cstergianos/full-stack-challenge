import { faEarth, faFlagUsa } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/**
 * Component function to return the ToggleContainer
 *
 * @param props
 * @returns ToggleContainer
 * @constructor
 */
function ToggleContainer(props) {
    let sortCodeClass = 'toggle-switch ';
    sortCodeClass += (props.sortByCodeIsToggled ? 'code' : 'name');

    return (
        <div className='toggle-container'>
            <div className='toggle' id='us-enabled'>
                <FontAwesomeIcon className='icon globe' icon={ faEarth } />
                <label className="toggle-switch">
                    <input type="checkbox" onChange={() => {props.setUsIsToggled(!props.usIsToggled); props.setShuffleIsToggled(false);}} />
                    <span className="switch" />
                </label>
                <FontAwesomeIcon className='icon flag-usa' icon={ faFlagUsa } />
            </div>

            <div className='toggle' id='testmode-enabled'>
                <span>Test Mode</span>
                <label className="toggle-switch">
                    <input type="checkbox" onChange={() => {props.setTestIsToggled(!props.testIsToggled); props.setShuffleIsToggled(false);}} />
                    <span className="switch" />
                </label>
            </div>

            <div className='toggle' id='sort-by-code-enabled'>
                <span>Sort by</span>
                <label className={sortCodeClass}>
                    <input type="checkbox" onChange={() => {props.setSortByCodeIsToggled(!props.sortByCodeIsToggled); props.setShuffleIsToggled(false);}} />
                    <span className="switch" />
                    <span className="name">name</span>
                    <span className="code">code</span>
                </label>
            </div>
        </div>
    )
}

export default ToggleContainer;

