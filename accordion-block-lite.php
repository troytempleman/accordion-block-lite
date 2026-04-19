<?php
/**
 * Plugin Name:       Accordion Block Lite
 * Plugin URI:        https://github.com/troytempleman/accordion-block-lite
 * Description:       A block that displays vertical list items that can expand and collapse to show and hide their associated sections of content.
 * Version:           0.1.3
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Troy Templeman
 * Author URI:        https://troytempleman.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       accordion-block-lite
 * Domain Path:       /languages
 */

// Exit if accessed directly 
if( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Register block
function accordion_block_lite_register() {
	
	// Accordion
	register_block_type( 
		__DIR__ . '/build/accordion'
	);
	// Accordion item
	register_block_type(
		__DIR__ . '/build/accordion-item'
	);
}
add_action( 'init', 'accordion_block_lite_register' );
