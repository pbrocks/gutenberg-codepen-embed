export default function getPenHTML( attributes, className='codepen-embed', isEditor=false ){
    const { penID, themeID, penHeight, content, penType } = attributes;

    if( penID === null && content === '' ){
        return null
    }

    if( null === penID ){
        return (
            <p className="codepen">
                {content}
            </p>
        )
    }

    const jsScript = ( isEditor ) ? null : (<script async src="//codepen.io/assets/embed/ei.js"></script>);

    return (
        <div>
            <div className={className} style={{padding: '1em'}}>
                <p className="codepen" data-height={penHeight} data-theme-id={themeID} data-slug-hash={penID} data-default-tab={penType} data-animations='stop-after-5'>
                    {content}
                </p>
                {jsScript}
            </div>
        </div>
    );
}