import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import { RenderParams } from '../../_components/RenderParams'
import { LowImpactHero } from '../../_heros/LowImpact'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'

import classes from './index.module.scss'
import AccountProfile from './AccountProfile'

export default async function Account() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  return (
    <Fragment>
      <Gutter className={classes.account}>
        <h3>My Profile</h3>
        <main className={classes.main}>
          <div className={classes.accountProfile}>
            <AccountProfile user={user} />
          </div>
          <aside className={classes.aside}>
            <h3>Personal Information</h3>
            <AccountForm />
          </aside>
        </main>
      </Gutter>
      {/* <Gutter className={classes.account}>
        <HR />
        <h2>Purchased Products</h2>
        <p>
          These are the products you have purchased over time. This provides a way for you to access
          digital assets or gated content behind a paywall. This is different from your orders,
          which are directly associated with individual payments.
        </p>
        <div>
          {user?.purchases?.length || 0 > 0 ? (
            <ul className={classes.purchases}>
              {user?.purchases?.map((purchase, index) => {
                return (
                  <li key={index} className={classes.purchase}>
                    {typeof purchase === 'string' ? (
                      <p>{purchase}</p>
                    ) : (
                      <h4>
                        <Link href={`/products/${purchase.slug}`}>{purchase.title}</Link>
                      </h4>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className={classes.noPurchases}>You have no purchases.</div>
          )}
        </div>
        <HR />
        <h2>Orders</h2>
        <p>
          These are the orders you have placed over time. Each order is associated with an payment
          intent. As you order products, they will appear in your "purchased products" list.
        </p>
        <Button
          className={classes.ordersButton}
          href="/orders"
          appearance="primary"
          label="View orders"
        />
        <HR />
        <Button href="/logout" appearance="secondary" label="Log out" />
      </Gutter> */}
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Account',
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
}
