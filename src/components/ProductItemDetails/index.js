import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare, BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

class ProductItemDetails extends Component {
  state = {
    onIncreOrDecre: 1,
    shownData: {},
    shownSimilarData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)
    const data = await response.json()
    const cartData = {
      id: data.id,
      imageUrl: data.image_url,
      title: data.title,
      price: data.price,
      description: data.description,
      brand: data.brand,
      totalReviews: data.total_reviews,
      rating: data.rating,
      availability: data.availability,
    }
    const similarData = data.similar_products.map(similarProduct => ({
      id: similarProduct.id,
      imageUrl: similarProduct.image_url,
      title: similarProduct.title,
      style: similarProduct.style,
      price: similarProduct.price,
      description: similarProduct.description,
      brand: similarProduct.brand,
      totalReviews: similarProduct.total_reviews,
      rating: similarProduct.rating,
    }))
    this.setState({
      shownData: cartData,
      shownSimilarData: similarData,
      isLoading: false,
    })
  }

  decrease = () => {
    const {onIncreOrDecre} = this.state
    if (onIncreOrDecre > 1) {
      this.setState(prevState => ({
        onIncreOrDecre: prevState.onIncreOrDecre - 1,
      }))
    }
  }

  increase = () => {
    this.setState(prevState => ({
      onIncreOrDecre: prevState.onIncreOrDecre + 1,
    }))
  }

  renderDetails = () => {
    const {shownData, onIncreOrDecre, isLoading} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
    } = shownData
    return (
      <div className="cart-data">
        <img src={imageUrl} alt="product" className="cart-image" />
        <div>
          <h1 className="cart-head">{title}</h1>
          <p className="cart-price">Rs {price}</p>
          <div className="rate-review">
            <p className="cart-rate">
              {rating} <BsFillStarFill />
            </p>
            <p>{totalReviews} Reviews</p>
          </div>
          <p className="cart-description">{description}</p>
          <div className="range">
            <p className="brand-availability">Available:</p>
            <p className="less-weight">{availability}</p>
          </div>
          <div className="range">
            <p className="brand-availability">Brand:</p>
            <p className="less-weight">{brand}</p>
          </div>
          <hr />
          <div className="range">
            <BsDashSquare
              data-testid="minus"
              onClick={this.decrease}
              className="left"
            />
            <p>{onIncreOrDecre}</p>
            <BsPlusSquare
              data-testid="plus"
              onClick={this.increase}
              className="right"
            />
          </div>
          <button className="add-to-cart">ADD TO CART</button>
        </div>
      </div>
    )
  }

  render() {
    const {shownSimilarData, isLoading} = this.state
    return (
      <div>
        <Header />
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
          </div>
        ) : (
          this.renderDetails()
        )}
        <h1 className="similar-head">Similar Products</h1>
        <SimilarProductItem similarData={shownSimilarData} />
      </div>
    )
  }
}

export default ProductItemDetails
