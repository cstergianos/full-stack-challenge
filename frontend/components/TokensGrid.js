/**
 * Component function to return the TokensGrid
 *
 * @param props
 * @returns TokensGrid
 * @constructor
 */
function TokensGrid(props) {
    let usIsToggled = props.usIsToggled;
    let testIsToggled = props.testIsToggled;
    let items = props.items;

    if (props.shuffleIsToggled) {
        items = props.shuffleItems;
    }

    return (
        <div>
            {usIsToggled === true && testIsToggled === false &&
                <div className='tokensGrid'>
                    {items.filter(token => token.isSupportedInUS === true).map(token => (
                        <div className='tokenContainer' id={token.code + '-us'}><span>{token.name} - {token.code}</span></div>
                    ))}
                </div>
            }

            {usIsToggled === false && testIsToggled === true &&
                <div className='tokensGrid'>
                    {items.filter(token => token.supportsTestMode === true).map(token => (
                        <div className='tokenContainer' id={token.code + '-test'}><span>{token.name} - {token.code}</span></div>
                    ))}
                </div>
            }

            {usIsToggled === true && testIsToggled === true &&
                <div className='tokensGrid'>
                    {items.filter(token => token.isSupportedInUS === true && token.supportsTestMode === true).map(token => (
                        <div className='tokenContainer' id={token.code + '-us-test'}><span>{token.name} - {token.code}</span></div>
                    ))}
                </div>
            }

            {usIsToggled === false &&
                <div className='tokensGrid'>
                    {items.map((token) => (
                        <div className='tokenContainer' id={token.code}><span>{token.name} - {token.code}</span></div>
                    ))}
                </div>
            }
        </div>
    )
}

export default TokensGrid