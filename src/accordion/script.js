window.addEventListener( 'load', function () {
	const accordions = document.querySelectorAll( '.wp-block-tt-accordion' );
	const prefersReducedMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	).matches;

	function getAssociatedPanel( button ) {
		const panelId = button.getAttribute( 'aria-controls' );

		if ( panelId ) {
			return document.getElementById( panelId );
		}

		const buttonId = button.getAttribute( 'id' ) || '';
		const suffix = buttonId.replace(
			'wp-block-tt-accordion-item-header-button-',
			''
		);

		if ( ! suffix ) {
			return null;
		}

		return document.getElementById(
			`wp-block-tt-accordion-item-panel-${ suffix }`
		);
	}

	function setExpandedState( button, panel, isExpanded ) {
		button.setAttribute( 'aria-expanded', String( isExpanded ) );
		button.classList.toggle( 'expanded', isExpanded );
		panel.classList.toggle( 'open', isExpanded );

		if ( isExpanded ) {
			panel.removeAttribute( 'hidden' );
		} else {
			panel.setAttribute( 'hidden', '' );
		}

		if ( prefersReducedMotion ) {
			panel.style.transition = 'none';
		}
	}

	function togglePanel( button, panel, buttons, singleOpen ) {
		const isExpanded = button.getAttribute( 'aria-expanded' ) === 'true';

		if ( singleOpen && ! isExpanded ) {
			buttons.forEach( function ( otherButton ) {
				if ( otherButton === button ) {
					return;
				}

				const otherPanel = getAssociatedPanel( otherButton );

				if ( otherPanel ) {
					setExpandedState( otherButton, otherPanel, false );
				}
			} );
		}

		setExpandedState( button, panel, ! isExpanded );
	}

	function focusByOffset( buttons, currentButton, offset ) {
		const currentIndex = buttons.indexOf( currentButton );

		if ( currentIndex === -1 || buttons.length === 0 ) {
			return;
		}

		const nextIndex =
			( currentIndex + offset + buttons.length ) % buttons.length;
		buttons[ nextIndex ].focus();
	}

	accordions.forEach( function ( accordion ) {
		const buttons = Array.from(
			accordion.querySelectorAll(
				'.wp-block-tt-accordion-item-header-button'
			)
		);
		const singleOpen =
			accordion.getAttribute( 'data-accordion-single' ) === 'true';

		buttons.forEach( function ( button ) {
			const panel = getAssociatedPanel( button );

			if ( ! panel ) {
				return;
			}

			setExpandedState( button, panel, false );

			button.addEventListener( 'click', function () {
				togglePanel( button, panel, buttons, singleOpen );
			} );

			button.addEventListener( 'keydown', function ( event ) {
				switch ( event.key ) {
					case 'ArrowDown':
						event.preventDefault();
						focusByOffset( buttons, button, 1 );
						break;
					case 'ArrowUp':
						event.preventDefault();
						focusByOffset( buttons, button, -1 );
						break;
					case 'Home':
						event.preventDefault();
						buttons[ 0 ].focus();
						break;
					case 'End':
						event.preventDefault();
						buttons[ buttons.length - 1 ].focus();
						break;
				}
			} );
		} );
	} );
} );
