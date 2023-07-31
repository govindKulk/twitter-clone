
import Form from '@/components/Form'
import Header from '@/components/Header'
import Modal from '@/components/Modal'
import LoginModal from '@/components/Modal/LoginModel'
import RegisterModal from '@/components/Modal/RegisterModal'
import PostFeed from '@/components/posts/PostFeed'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='min-h-screen'>
     
      {/* <Modal isOpen title='Are you sure you want tp make payment' actionLabel='Purchase'  /> */}
      <Header label="Home" showBackArrow/>
      <Form placeholder="What's Happening"/>
      <PostFeed />

    </div>
    
  )
}
