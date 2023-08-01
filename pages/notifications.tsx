import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'

export function getServerSideProps(context: NextPageContext){
    const session = getSession(context)

    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }else{
        return {
                    props: {
                        session
                    }
                }
    }
}
const notifications = () => {
  return (
    <>
    <Header showBackArrow label="Notifications" />
    <NotificationsFeed />
  </>
  )
}

export default notifications
