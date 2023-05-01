import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";


export const client = SanityClient({
    projectId:'bj6uwgg1',
    dataset:'production',
    apiVersion:'2023-04-16',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN   
})

const builder = ImageUrlBuilder(client);

export const urlFor=(source)=>builder.image(source)