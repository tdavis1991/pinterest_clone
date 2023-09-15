import Nav from '@/components/Nav'
import './globals.css'
import Provider from '@/components/Provider'

export const metadata = {
  title: 'Pinterest Clone',
  description: 'Clone of popular app called Pinterest',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  )
}
