import Products from "@/app/Products/page";
import { urlFor } from "@/sanity/lib/image";
import { productSchema } from "@/sanity/schemaTypes/product";
import { log } from "console";
import React from "react";

const Datafetch = async () => {
  const query = await client.fetch(
    `*[_type == "product"]{
  _id,
  productName,
  slug,
  category,
  price,
  inventory,
  colors,
  status,
  image{
    asset -> {
      _id,
      url,
      metadata {
      
      }
    }
  },
  description,
}

 `
  );
  console.log(query);

  return (
    <div>
      {query.map((productSchema) => {
        return (
          <div>
            <h1>{productSchema.name}</h1>
            <p>{productSchema.price}</p>
            <Image
              src={urlFor(productSchema.imageUrl).url()}
              alt={productSchema.name}
              width={100}
              height={100}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Datafetch;
