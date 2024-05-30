import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const SimilarProductItem = props => {
  const renderSimilarProducts = () => {
    const {similarData} = props
    console.log(similarData)
    return similarData.map(eachData => {
      console.log(eachData)
      return (
        <li className="list-cart" key={eachData.id}>
          <img
            src={eachData.imageUrl}
            alt="similar product"
            className="list-image"
          />
          <h1 className="list-head">{eachData.title}</h1>
          <p className="list-brand">by {eachData.brand}</p>
          <div className="list-row">
            <p className="list-price">Rs {eachData.price}/-</p>
            <p className="list-rate">
              {eachData.rating} <BsFillStarFill />
            </p>
          </div>
        </li>
      )
    })
  }
  return (
    <div>
      <ul className="cart-item-list">{renderSimilarProducts()}</ul>
    </div>
  )
}
export default SimilarProductItem
