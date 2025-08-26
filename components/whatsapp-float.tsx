'use client'

import React, { MouseEvent } from 'react'

interface WhatsAppFloatProps {
	phoneNumber?: string
}

export function WhatsAppFloat({ phoneNumber }: WhatsAppFloatProps) {
	const envNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER as string | undefined)
	const rawNumber = (phoneNumber || envNumber || '').toString()
	const sanitized = rawNumber.replace(/\s|\+/g, '')
	const normalized = sanitized.replace(/^00/, '')
	const hasNumber = normalized.length > 0
	const href = hasNumber ? `https://wa.me/${normalized}` : undefined

	const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
		;(e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.08)'
	}
	const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
		;(e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'
	}

	return (
		<div
			style={{
				position: 'fixed',
				right: '16px',
				bottom: '16px',
				zIndex: 1000,
			}}
			aria-label="WhatsApp quick contact"
		>
			{hasNumber ? (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					style={{ display: 'inline-block', transition: 'transform 150ms ease' }}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<img
						src="/icons8-whatsapp-48.png"
						alt="WhatsApp"
						width={48}
						height={48}
						style={{ display: 'block' }}
					/>
				</a>
			) : null}
		</div>
	)
}
