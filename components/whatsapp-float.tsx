'use client'

import React, { MouseEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface WhatsAppFloatProps {
	phoneNumber?: string
	position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
	mobileOffsetPx?: number
	desktopOffsetPx?: number
	mobileBottomPx?: number
	mobileRightPx?: number
	desktopBottomPx?: number
	desktopRightPx?: number
}

export function WhatsAppFloat({ phoneNumber, position = 'bottom-right', mobileOffsetPx = 12, desktopOffsetPx = 24, mobileBottomPx = 80, mobileRightPx = 15, desktopBottomPx = 24, desktopRightPx = 24 }: WhatsAppFloatProps) {
	const [mounted, setMounted] = useState(false)
	const [isTouch, setIsTouch] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const [isHovered, setIsHovered] = useState(false)

	useEffect(() => {
		setMounted(true)
		setIsTouch(typeof window !== 'undefined' && 'ontouchstart' in window)
		const onResize = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 768)
		onResize()
		window.addEventListener('resize', onResize, { passive: true })
		return () => {
			window.removeEventListener('resize', onResize)
		}
	}, [])

	const envNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER as string | undefined)
	const rawNumber = (phoneNumber || envNumber || '').toString()
	const sanitized = rawNumber.replace(/\s|\+/g, '')
	const normalized = sanitized.replace(/^00/, '')
	const href = `https://wa.me/${normalized}`

	const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
		if (isTouch) return
		setIsHovered(true)
	}
	const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
		if (isTouch) return
		setIsHovered(false)
	}

	// Positionnement configurable par props
	const desktopOffset = desktopOffsetPx
	const mobileOffset = mobileOffsetPx

	const offsetRight = isMobile ? (position.includes('right') ? (mobileRightPx ?? mobileOffset) : undefined) : (position.includes('right') ? (desktopRightPx ?? desktopOffset) : undefined)
	const offsetLeft = isMobile ? (position.includes('left') ? (mobileRightPx ?? mobileOffset) : undefined) : (position.includes('left') ? (desktopRightPx ?? desktopOffset) : undefined)
	const offsetBottom = isMobile ? (position.includes('bottom') ? (mobileBottomPx ?? mobileOffset) : undefined) : (position.includes('bottom') ? (desktopBottomPx ?? desktopOffset) : undefined)
	const offsetTop = isMobile ? (position.includes('top') ? (mobileBottomPx ?? mobileOffset) : undefined) : (position.includes('top') ? (desktopBottomPx ?? desktopOffset) : undefined)

	const rightCssVar = offsetRight !== undefined ? `calc(${offsetRight}px + env(safe-area-inset-right, 0px))` : undefined
	const leftCssVar = offsetLeft !== undefined ? `calc(${offsetLeft}px + env(safe-area-inset-left, 0px))` : undefined
	const bottomCssVar = offsetBottom !== undefined ? `calc(${offsetBottom}px + env(safe-area-inset-bottom, 0px))` : undefined
	const topCssVar = offsetTop !== undefined ? `calc(${offsetTop}px + env(safe-area-inset-top, 0px))` : undefined

	const diameter = isMobile ? 56 : 56
	const iconSize = isMobile ? 24 : 24

	const containerStyle: React.CSSProperties = {
		position: 'fixed',
		...(position.includes('right') ? { right: rightCssVar } : { left: leftCssVar }),
		...(position.includes('bottom') ? { bottom: bottomCssVar } : { top: topCssVar }),
		zIndex: 2147483647,
		pointerEvents: 'auto',
		WebkitTapHighlightColor: 'transparent',
		touchAction: 'manipulation',
		contain: 'none',
	}

	const buttonStyle: React.CSSProperties = {
		width: `${diameter}px`,
		height: `${diameter}px`,
		borderRadius: '50%',
		backgroundColor: '#25D366',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		boxShadow: `${isHovered ? '0 10px 22px rgba(7, 94, 84, 0.38)' : '0 8px 20px rgba(7, 94, 84, 0.32)'} , 0 2px 6px rgba(0,0,0,0.22)`,
		outline: 'none',
		border: 'none',
		transform: isHovered ? 'translateY(-2px) scale(1.04)' : 'translateY(0) scale(1)',
		transition: 'transform 160ms ease, box-shadow 160ms ease',
		cursor: 'pointer',
	}

	const content = (
		<div style={containerStyle} aria-label="WhatsApp quick contact">
			{
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					style={buttonStyle}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onMouseDown={() => !isTouch && setIsHovered(false)}
					aria-label="Ouvrir WhatsApp"
				>
					<img
						src="/icons8-whatsapp-48.png"
						alt="WhatsApp"
						width={iconSize}
						height={iconSize}
						style={{ display: 'block', imageRendering: 'optimizeQuality' as any, WebkitFontSmoothing: 'antialiased' }}
					/>
				</a>
			}
		</div>
	)

	if (mounted && typeof document !== 'undefined') {
		return createPortal(content, document.body)
	}
	return content
} 