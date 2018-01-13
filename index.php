<?php
/**
 * Plugin Name: Gutenberg CodePen Embed
 * Plugin URI: https://codepen.io/
 * Description: Adds Gutenberg block for embedding Pens from <a href="http://codepen.io/">CodePen</a>. You can learn more about CodePen <a href="http://codepen.io/hello">here </a>.
 * Author: Andrew Taylor
 * Author URI: https://www.ataylor.me/
 * Version: 2.0.0
 * License: GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 *
 * @package Gutenberg_CodePen_Embed
 * @since   2.0.0
 */
namespace Gutenberg_CodePen_Embed;

// Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue block editor only JavaScript and CSS
 *
 * @return void
 */
function editorScripts()
{

    // CodePen Embed JS
    wp_enqueue_script(
        'codepen-embed-gutenberg-block-external-js',
        '//codepen.io/assets/embed/ei.js',
        [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ]
    );

    // Make paths variables so we don't write em twice ;)
    $blockPath = 'assets/js/block.editor.min.js';
    $editorStylePath = 'assets/css/editor.css';

    // Enqueue the bundled block JS file
    if (file_exists(plugin_dir_path(__FILE__) . $blockPath)) {
        wp_enqueue_script(
            'codepen-embed-gutenberg-block-js',
            plugins_url($blockPath, __FILE__),
            [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api', 'codepen-embed-gutenberg-block-external-js' ],
            filemtime(plugin_dir_path(__FILE__) . $blockPath)
        );
    }


    // Enqueue optional editor only styles
    if (file_exists(plugin_dir_path(__FILE__) . $editorStylePath)) {
        wp_enqueue_style(
            'codepen-embed-gutenberg-block-editor-css',
            plugins_url($editorStylePath, __FILE__),
            [ 'wp-blocks' ],
            filemtime(plugin_dir_path(__FILE__) . $editorStylePath)
        );
    }

}

// Hook scripts function into block editor hook
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\\editorScripts');


/**
 * Enqueue block editor JavaScript and CSS
 * 
 * @return void
 */
function blockScripts()
{
    $blockPath = 'assets/js/block.min.js';
    // Make paths variables so we don't write em twice ;)
    $stylePath = 'assets/css/style.css';

    // Enqueue the bundled block JS file
    if (file_exists(plugin_dir_path(__FILE__) . $blockPath)) {
        wp_enqueue_script(
            'codepen-embed-gutenberg-block-frontend-js',
            plugins_url($blockPath, __FILE__),
            [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ],
            filemtime(plugin_dir_path(__FILE__) . $blockPath)
        );
    }

    // Enqueue frontend and editor block styles
    if (file_exists(plugin_dir_path(__FILE__) . $stylePath)) {
        wp_enqueue_style(
            'codepen-embed-gutenberg-block-css',
            plugins_url($stylePath, __FILE__),
            [ 'wp-blocks' ],
            filemtime(plugin_dir_path(__FILE__) . $stylePath)
        );
    }

}

// Hook scripts function into block editor hook
add_action('enqueue_block_assets', __NAMESPACE__ . '\\blockScripts');
