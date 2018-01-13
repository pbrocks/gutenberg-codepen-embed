/**
 * Import internal dependencies
 */
import getPenID from './getPenID.js'

/**
 * Get WordPress libraries from the wp global
 */
const { __ } = wp.i18n;
const { InspectorControls, BlockDescription } = wp.blocks;
const { TextControl, ToggleControl, TextareaControl, RangeControl, SelectControl } = InspectorControls;

/**
 * Declare variables
 */
const penTypeOptions = [
    {value: 'result', label: __( 'Result only' ) },
    {value: 'html,result', label: __( 'HTML and result' ) },
    {value: 'js,result', label: __( 'JavaScript and result' ) },
    {value: 'css,result', label: __( 'CSS and result' ) },
];

export default function formFields(attributes, setAttributes) {
    const { penID, themeID, penHeight, content, penType } = attributes;

    return (

        <InspectorControls key="inspector">
            <BlockDescription>
            <p>{ __( 'This block embeds Pens from CodePen. Simply enter any text that includes a CodePen URL in the content field below. If there is an issue loading the CodePen embed the full text will be used as a fallback.', 'codepen' ) }</p>
            </BlockDescription>
            <TextareaControl 
                label={ __( 'Pen Text (including URL)' ) } 
                onChange={ ( value ) => setAttributes( { content: value, penID: getPenID(value) } ) } 
                value={content}
            />
            <TextControl 
                label={ __( 'Pen Height (in pixels)' ) } 
                onChange={ ( value ) => setAttributes( { penHeight: Number.parseInt( value, 10 ) } ) }
                value={penHeight}
                type='number'
            />
            <TextControl 
                label={ __( 'Theme ID' ) } 
                onChange={ ( value ) => setAttributes( { themeID: value } ) }
                value={themeID}
            />
            <SelectControl
                label={ __( 'Pen View' ) } 
                select={penType} 
                options={penTypeOptions} 
                onChange={ ( value ) => setAttributes( { penType: value } ) } 
                value={ penType }
            />
        </InspectorControls>
    );
}