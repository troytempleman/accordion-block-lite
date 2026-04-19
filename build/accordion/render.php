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

echo '<ul ' . $wrapper_attributes . '>';
echo wp_kses_post( $content );
echo '</ul>';

?>
