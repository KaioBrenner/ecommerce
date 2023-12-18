import React, { Fragment } from 'react'
import { Gutter } from '../../../_components/Gutter'
import AccountProfile from '../AccountProfile'

import classes from './index.module.scss'
import { getMeUser } from '../../../_utilities/getMeUser'
import { Order } from '../../../../payload/payload-types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDateTime } from '../../../_utilities/formatDateTime'
import { Button } from '../../../_components/Button'
import { HR } from '../../../_components/HR'
import Image from 'next/image'
import PurchasedItem from './PurchasedItem'

const Purchases = async () => {
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
            <h5>Purchased Products</h5>


            {orders && orders.length > 0 && (
              <ul className={classes.purchasedPurchases}>
                {orders?.map((order, index) => {
                  const { items, createdAt } = order

                  return (
                    // <li key={order.id} className={classes.listItem}>
                    //   <Link className={classes.item} href={`/orders/${order.id}`}>
                    //     <div className={classes.itemContent}>
                    //       <h4 className={classes.itemTitle}>{`Order ${order.id}`}</h4>
                    //       <div className={classes.itemMeta}>
                    //         <p>{`Ordered On: ${formatDateTime(order.createdAt)}`}</p>
                    //         <p>
                    //           {'Total: '}
                    //           {new Intl.NumberFormat('en-US', {
                    //             style: 'currency',
                    //             currency: 'usd',
                    //           }).format(order.total / 100)}
                    //         </p>
                    //       </div>
                    //     </div>
                    //     <Button
                    //       appearance="secondary"
                    //       label="View Order"
                    //       className={classes.button}
                    //       el="button"
                    //     />
                    //   </Link>
                    //   {index !== orders.length - 1 && <HR />}
                    // </li>
                    <>
                      {items?.map((item, index) => {
                        if (typeof item.product === 'object') {
                          const {
                            quantity,
                            product,
                            product: { id, title, meta, stripeProductID },
                          } = item
                          const metaImage = meta?.image

                          return (
                            <PurchasedItem
                              product={product}
                              title={title}
                              metaImage={metaImage}
                              qty={quantity}
                              createdAt={createdAt}
                            />
                          )
                        }
                        return null
                      })}
                      {/* {items.map(item => (
                        <li>
                          <PurchasedItem />
                        </li>
                      ))} */}
                    </>
                  )
                })}
              </ul>
            )}
          </aside>
        </main>
      </Gutter>
    </Fragment>
  )
}

export default Purchases
