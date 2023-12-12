import React from "react"

import classes from './index.module.scss'
import Link from "next/link"
import CategoryCard from "./CategoryCard"

const Categories = ({categories}) => {
  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Shop by categories</h3>
        <Link href="/products">Show all</Link>
      </div>
      

      <div className={classes.list}>
      {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}

export default Categories