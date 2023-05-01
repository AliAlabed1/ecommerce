import React from 'react'
import { Product,FooterBanner,HeroBanner } from '../components'

import { client } from '../lib/client'

const Home = ({products,banners}) => {
  
  return (
    <>
      <HeroBanner
        heroBanner={banners.length && banners[0]}
      />

      <div className='products-heading'>
        <h2>Beset Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
       { products?.map((item)=>(
         <div key={item.slug.current}>
           <Product 
              key={item._id}
              product={item}
           />
         </div>
       ))}
      </div>

      <FooterBanner footerBanner={banners&&banners[0]}/>
    </>
  )
}

export const getServerSideProps = async () =>{
  const query = '*[_type=="product"]';
  const products =  await client.fetch(query)

  const bannerQuery = '*[_type=="banner"]';
  const banners =  await client.fetch(bannerQuery)

  return {
    props:{products,banners}
  }
}

export default Home