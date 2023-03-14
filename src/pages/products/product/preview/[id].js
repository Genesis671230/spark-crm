// ** Demo Components Imports
import Preview from 'src/views/apps/products/product/preview/Preview'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchData} from "../../../../store/apps/products";
import { getProductsList } from 'src/configs/apiConfig';


const ProductPreview = ({ id,productData }) => {
  console.log(productData,"this is product data")
  return <Preview id={id} productData={productData} />
}

export const getStaticPaths = async () => {

  const response = await  getProductsList()
  const {data} = response.data;
  const paths = data.map(item => ({
    params: { id: `${item.id}` }
  }))
  
  return {
    paths,
    fallback: false
  }

}

export const getStaticProps = async({ params }) => {


  const response = await  getProductsList()
  const {data} = response.data;
  const productList = data.filter(item => item.id == params.id)
  const product = productList[0];

  return {
    props: {
      id: params?.id,
      productData: product
    }
  }
}

export default ProductPreview

















