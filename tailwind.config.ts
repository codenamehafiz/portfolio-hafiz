import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					'50': '#ffffff',
					'100': '#fafafa',
					'200': '#f0f0f0',
					'300': '#e0e0e0',
					'400': '#bdbdbd',
					'500': '#9e9e9e',
					'600': '#757575',
					'700': '#616161',
					'800': '#424242',
					'900': '#212121',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				accent: {
					'50': '#fafafa',
					'100': '#f5f5f5',
					'200': '#eeeeee',
					'300': '#e0e0e0',
					'400': '#bdbdbd',
					'500': '#9e9e9e',
					'600': '#757575',
					'700': '#616161',
					'800': '#424242',
					'900': '#212121',
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				ink: {
					DEFAULT: '#0a0a0a',
					light: '#1a1a1a',
					medium: '#2d2d2d',
					soft: '#404040',
					muted: '#666666'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontFamily: {
				sans: [
					'var(--font-inter)',
					'system-ui',
					'sans-serif'
				],
				mono: [
					'var(--font-jetbrains-mono)',
					'monospace'
				],
				serif: [
					'Georgia',
					'Cambria',
					'Times New Roman',
					'serif'
				]
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'slide-down': 'slideDown 0.5s ease-out',
				'scale-in': 'scaleIn 0.3s ease-out',
				float: 'float 6s ease-in-out infinite',
				'marquee-left': 'marqueeLeft var(--duration, 30s) linear infinite',
				'marquee-right': 'marqueeRight var(--duration, 30s) linear infinite',
				'aurora-1': 'aurora1 15s ease-in-out infinite',
				'aurora-2': 'aurora2 20s ease-in-out infinite',
				'aurora-3': 'aurora3 18s ease-in-out infinite'
			},
			keyframes: {
				fadeIn: {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				slideUp: {
					'0%': {
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				slideDown: {
					'0%': {
						transform: 'translateY(-20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				scaleIn: {
					'0%': {
						transform: 'scale(0.9)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				float: {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				marqueeLeft: {
					'0%': {
						transform: 'translateX(0)'
					},
					'100%': {
						transform: 'translateX(-50%)'
					}
				},
				marqueeRight: {
					'0%': {
						transform: 'translateX(-50%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				},
				aurora1: {
					'0%, 100%': {
						transform: 'translate(0, 0) scale(1)'
					},
					'33%': {
						transform: 'translate(10%, 15%) scale(1.1)'
					},
					'66%': {
						transform: 'translate(-5%, 5%) scale(0.95)'
					}
				},
				aurora2: {
					'0%, 100%': {
						transform: 'translate(0, 0) scale(1)'
					},
					'33%': {
						transform: 'translate(-15%, -10%) scale(1.05)'
					},
					'66%': {
						transform: 'translate(10%, -5%) scale(1.1)'
					}
				},
				aurora3: {
					'0%, 100%': {
						transform: 'translate(0, 0) scale(1)'
					},
					'33%': {
						transform: 'translate(5%, -15%) scale(1.15)'
					},
					'66%': {
						transform: 'translate(-10%, 10%) scale(0.9)'
					}
				}
			},
			backgroundImage: {
				grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")"
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}
export default config
