/**
 * Import internal dependencies
 */
import '../css/style.scss'
import blockIcons from './icons.js'
import formFields from './formFields.js'
import getPenHTML from './getPenHTML.js'

/**
 * Get WordPress libraries from the wp global
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register Block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'codepen/codepen-embed', {
	title: __( 'CodePen Embed' ),
    
    description: __( 'Embeds a CodePen Pen' ),
	
	icon: blockIcons.codepen,
	
	category: 'embed',

	attributes: {
		content: {
            type: 'string',
            default: '',
		},
		penID: {
            type: 'string',
            default: '',
		},
		penType: {
            type: 'string',
            default: 'result',
		},
		penHeight: {
			type: 'integer',
			default: 250,
		},
		themeID: {
			type: 'string',
			default: '1',
		},
	},

	supports: {
		html: true,
	},

	edit( { attributes, setAttributes, focus, className } ) {
		const { penID, themeID, penHeight, content, penType } = attributes;
        
        return [
			focus && (
                formFields( attributes, setAttributes)
            ),
			(
                getPenHTML( attributes, className, true)
            ),
		];
	},

	save( { attributes } ) {
        return getPenHTML( attributes );
	},
} );