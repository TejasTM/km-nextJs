import { Inter } from 'next/font/google'
import './globals.css'

import NavBar from './components/navbar';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <NavBar />
          <div className='mt-20 p-8'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
