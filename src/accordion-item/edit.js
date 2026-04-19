// External dependencies
import classnames from 'classnames';

// WordPress dependencies
import { useSelect } from '@wordpress/data';
import {
	AlignmentToolbar,
	BlockControls,
	InnerBlocks,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// Internal dependencies
import icons from './icons';

// Edit
export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
} ) {
	// Attributes
	const { uid, textAlign, headerElement, headerHeadingLevel, headerText } =
		attributes;
	const wrapperAttributes = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	const contextHeaderElement = context[ 'accordion/headerElement' ];
	const contextHeaderHeadingLevel = context[ 'accordion/headerHeadingLevel' ];
	const button = useRef();
	const panel = useRef();
	const Heading =
		headerElement === 'heading' ? `h${ headerHeadingLevel }` : 'p';
	const allOtherBlocks = useSelect( ( select ) => {
		return select( 'core/blocks' )
			.getBlockTypes()
			.map( ( block ) => block.name )
			.filter( ( name ) => name !== 'tt/accordion-item' );
	}, [] );

	useEffect( () => {
		const nextAttributes = {};

		if ( uid !== clientId ) {
			nextAttributes.uid = clientId;
		}

		if ( contextHeaderElement && headerElement !== contextHeaderElement ) {
			nextAttributes.headerElement = contextHeaderElement;
		}

		if (
			typeof contextHeaderHeadingLevel === 'number' &&
			headerHeadingLevel !== contextHeaderHeadingLevel
		) {
			nextAttributes.headerHeadingLevel = contextHeaderHeadingLevel;
		}

		if ( Object.keys( nextAttributes ).length > 0 ) {
			setAttributes( nextAttributes );
		}
	}, [
		clientId,
		contextHeaderElement,
		contextHeaderHeadingLevel,
		headerElement,
		headerHeadingLevel,
		setAttributes,
		uid,
	] );

	// Block content
	const blockContent = () => {
		// Toggle
		function toggle() {
			const state =
				'true' === button.current.getAttribute( 'aria-expanded' );
			button.current.setAttribute( 'aria-expanded', ! state );
			if ( state ) {
				panel.current.classList.remove( 'open' );
				panel.current.hidden = true;
			} else {
				panel.current.classList.add( 'open' );
				panel.current.hidden = false;
			}
		}

		return (
			<li { ...wrapperAttributes }>
				<Heading className="wp-block-tt-accordion-item-header">
					<button
						ref={ button }
						onClick={ toggle }
						className="wp-block-tt-accordion-item-header-button"
						id={ 'wp-block-tt-accordion-item-header-button-' + uid }
						aria-expanded="false"
						aria-controls={
							'wp-block-tt-accordion-item-panel-' + uid
						}
						type="button"
					>
						<RichText
							tagName="span"
							className="wp-block-tt-accordion-item-header-button-text"
							value={ headerText }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
							placeholder={ __(
								'Add title',
								'accordion-block-lite'
							) }
							onChange={ ( value ) =>
								setAttributes( { headerText: value } )
							}
						/>
						<span className="wp-block-tt-accordion-item-header-button-icon-arrow">
							<Icon icon={ icons.arrow } />
						</span>
					</button>
				</Heading>
				<div
					ref={ panel }
					className="wp-block-tt-accordion-item-panel open"
					id={ 'wp-block-tt-accordion-item-panel-' + uid }
					aria-labelledby={
						'wp-block-tt-accordion-item-header-button-' + uid
					}
					role="region"
					hidden
				>
					<InnerBlocks allowedBlocks={ allOtherBlocks } />
				</div>
			</li>
		);
	};

	// Block controls
	const blockControls = () => {
		return (
			<BlockControls group="block">
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( value ) =>
						setAttributes( { textAlign: value } )
					}
				/>
			</BlockControls>
		);
	};

	// Editor
	return (
		<>
			{ blockControls() }
			{ blockContent() }
		</>
	);
}
