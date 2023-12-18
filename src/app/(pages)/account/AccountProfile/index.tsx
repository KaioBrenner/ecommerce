import React from 'react'

import classes from './index.module.scss'
import Image from 'next/image'
import { User } from 'payload/dist/auth'
import Link from 'next/link'

const links = [
  {
    href: '/account',
    src: '/assets/icons/user.svg',
    title: 'Personal Information',
  },
  {
    href: '/account/purchases',
    src: '/assets/icons/purchases.svg',
    title: 'My Purchases',
  },
  {
    href: '/account/orders',
    src: '/assets/icons/orders.svg',
    title: 'My Orders',
  },
  {
    href: '/account/logout',
    src: '/assets/icons/logout.svg',
    title: 'Logout',
  },
]

const AccountProfile = ({ user }) => {
  return (
    <main>
      <div className={classes.userInfo}>
        <Image src="/assets/icons/profile.svg" alt="profile" width={50} height={50} />
        <div className={classes.profileInfo}>
          <h6>{user?.name}</h6>
          <p>{user?.email}</p>
        </div>
      </div>
      <ul>
        {links.map((link, index) => (
          <li key={link?.title}>
            <Link href={link?.href} className={classes.navItem}>
              <Image src={link?.src} alt="user" width={24} height={34} />
              <p>{link?.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default AccountProfile
