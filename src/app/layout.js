import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/navbar';

const inter = Inter({ subsets: ['latin'] });

 const metadata = {
  title: 'Kuremara ',
  description: 'Generated by Best Team',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <div className='layout'> */}
        <Navbar />
        {children}
        
      </body>
    </html>
  );
}
