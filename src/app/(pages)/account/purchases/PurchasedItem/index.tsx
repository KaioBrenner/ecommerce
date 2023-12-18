'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'; // Importa a função de formatação de data

import classes from './index.module.scss'
import Link from 'next/link'
import { Media } from '../../../../_components/Media'
import { Price } from '../../../../_components/Price'
import Image from 'next/image'
import { RemoveFromCartButton } from '../../../../_components/RemoveFromCartButton'

const PurchasedItem = ({ product, title, metaImage, qty, createdAt }) => {
  // Converte a string createdAt para um objeto Date
  const createdAtDate = new Date(createdAt);

  // Formata a data no formato desejado (MM/DD/YYYY HH:mm:ss)
  const formattedDate = format(createdAtDate, 'MM/dd/yyyy');

  return (
    <li className={classes.item} key={title}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
          <Price product={product} button={false} />
          <p className={classes.purchasedDate}>Purchased On: {formattedDate}</p>
        </div>
      </div>
    </li>
  )
}

export default PurchasedItem
