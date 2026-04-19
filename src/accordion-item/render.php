<?php

// Exit if accessed directly 
if( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Attributes
$block_id = isset( $attributes['uid'] ) ? sanitize_key( $attributes['uid'] ) : wp_unique_id( 'tt-accordion-' );
$text_align = isset( $attributes['textAlign'] ) ? sanitize_html_class( $attributes['textAlign'] ) : '';
$header_element = isset( $attributes['headerElement'] ) ? $attributes['headerElement'] : 'paragraph';
$header_heading_level = isset( $attributes['headerHeadingLevel'] ) ? (int) $attributes['headerHeadingLevel'] : 3;
$header_heading_level = max( 1, min( 6, $header_heading_level ) );
$header_heading = $header_element === 'heading' ? 'h' . $header_heading_level : 'p';
$header_text = isset( $attributes['headerText'] ) ? $attributes['headerText'] : '';

$button_id = 'wp-block-tt-accordion-item-header-button-' . $block_id;
$panel_id = 'wp-block-tt-accordion-item-panel-' . $block_id;

// Wrapper
$class = 'wp-block-tt-accordion-item ' . wp_unique_id( 'wp-block-tt-accordion-item-' );

if ( $text_align ) {
	$class .= ' has-text-align-' . $text_align;
}

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $class ) );

$icon_markup = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><polyline points="4.711,8 12,15.289 19.289,8" stroke="currentColor" stroke-width="2" fill="none" /></svg>';

// Block content
$block_content = '<li ' . $wrapper_attributes . '>';
$block_content .= '<' . $header_heading . ' class="wp-block-tt-accordion-item-header">';
$block_content .= '<button class="wp-block-tt-accordion-item-header-button" id="' . esc_attr( $button_id ) . '" type="button" aria-expanded="false" aria-controls="' . esc_attr( $panel_id ) . '">';
$block_content .= '<span class="wp-block-tt-accordion-item-header-button-text">' . wp_kses_post( $header_text ) . '</span>';
$block_content .= '<span class="wp-block-tt-accordion-item-header-button-icon-arrow" aria-hidden="true">' . $icon_markup . '</span>';
$block_content .= '</button>';
$block_content .= '</' . $header_heading . '>';
$block_content .= '<div class="wp-block-tt-accordion-item-panel" id="' . esc_attr( $panel_id ) . '" role="region" aria-labelledby="' . esc_attr( $button_id ) . '" hidden>';
$block_content .= wp_kses_post( $content );
$block_content .= '</div>';
$block_content .= '</li>';

echo $block_content;

?>