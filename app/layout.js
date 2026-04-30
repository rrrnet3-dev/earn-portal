import './globals.css'

export const metadata = {
  title: 'Earn Portal',
  description: 'Complete content tasks to earn coins',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}