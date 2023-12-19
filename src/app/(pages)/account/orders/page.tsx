import React, { Fragment } from 'react'
import AccountProfile from '../AccountProfile'
import { getMeUser } from '../../../_utilities/getMeUser'
import { Order } from '../../../../payload/payload-types'
import { notFound } from 'next/navigation'
import { Gutter } from '../../../_components/Gutter'
import Link from 'next/link'
import { formatDateTime } from '../../../_utilities/formatDateTime'
import { Button } from '../../../_components/Button'
import { HR } from '../../../_components/HR'

import classes from './index.module.scss'

const Orders = async () => {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to view your orders.',
    )}&redirect=${encodeURIComponent('/orders')}`,
  })

  let orders: Order[] | null = null

  try {
    orders = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      cache: 'no-store',
    })
      ?.then(async res => {
        if (!res.ok) notFound()
        const json = await res.json()
        if ('error' in json && json.error) notFound()
        if ('errors' in json && json.errors) notFound()
        return json
      })
      ?.then(json => json.docs)
  } catch (error) {
    console.error(error)
  }

  return (
    <Fragment>
      <Gutter className={classes.account}>
        <h3>My Profile</h3>
        <main className={classes.main}>
          <div className={classes.accountProfile}>
            <AccountProfile user={user} />
          </div>
          <aside className={classes.aside}>
            <h5>My Orders</h5>

            {orders && orders.length > 0 && (
              <ul className={classes.ordersList}>
                {orders?.map((order, index) => (
                  <li key={order.id} className={classes.listItem}>
                    <Link className={classes.item} href={`/orders/${order.id}`}>
                      <div className={classes.itemContent}>
                        <h4 className={classes.itemTitle}>{`Order ${order.id}`}</h4>
                        <div className={classes.itemMeta}>
                          <p>
                            {'Total: '}
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'usd',
                            }).format(order.total / 100)}
                          </p>
                          <p className={classes.orderDate}>{`Ordered On: ${formatDateTime(
                            order.createdAt,
                          )}`}</p>
                        </div>
                      </div>
                      <Button label="View Order" className={classes.button} el="button" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </main>
      </Gutter>
    </Fragment>
  )
}

export default Orders
