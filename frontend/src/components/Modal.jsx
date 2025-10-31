import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../styles/modal.css';

/**
 * Modal
 * - Renders children in a centered overlay
 * - Locks body scroll while open
 * - Closes on ESC and outside click
 * - Accessible: role="dialog" and aria-modal
 */
export default function Modal({ isOpen = true, onClose, title = '', showClose = true, children }) {
	const overlayRef = useRef(null);
	const contentRef = useRef(null);

	useEffect(() => {
		if (!isOpen) return;
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const onKeyDown = (e) => {
			if (e.key === 'Escape') {
				e.stopPropagation();
				onClose?.();
			}
		};
		document.addEventListener('keydown', onKeyDown);

		// Focus the first focusable element inside modal
		const focusFirst = () => {
			const container = contentRef.current;
			if (!container) return;
			const selectors = [
				'button',
				'a[href]',
				'input',
				'select',
				'textarea',
				'[tabindex]:not([tabindex="-1"])'
			];
			const el = container.querySelector(selectors.join(','));
			(el || container).focus({ preventScroll: true });
		};
		const t = setTimeout(focusFirst, 0);

		return () => {
			clearTimeout(t);
			document.removeEventListener('keydown', onKeyDown);
			document.body.style.overflow = originalOverflow;
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const modal = (
			<div className="modal-overlay" ref={overlayRef} onClick={() => onClose?.()}>
			<div
				className="modal-container"
				role="dialog"
				aria-modal="true"
				aria-label={title || 'Dialog'}
				onClick={(e) => e.stopPropagation()}
				ref={contentRef}
				tabIndex={-1}
			>
					{showClose && (
						<button
							type="button"
							className="modal-close-btn"
							aria-label="Close"
							title="Close"
							onClick={() => onClose?.()}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					)}
				{children}
			</div>
		</div>
	);

	return createPortal(modal, document.body);
}

