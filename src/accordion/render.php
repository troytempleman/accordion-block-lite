<?php

// Exit if accessed directly 
if( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Attributes
$text_align = isset( $attributes['textAlign'] ) ? sanitize_html_class( $attributes['textAlign'] ) : '';

// Wrapper
$class = 'wp-block-tt-accordion';

if ( $text_align ) {
	$class .= ' has-text-align-' . $text_align;
}

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $class ) );

// Block content
$block_content = '<ul ' . $wrapper_attributes . '>';
$block_content .= $content;
$block_content .= '</ul>';

echo $block_content;

?>
