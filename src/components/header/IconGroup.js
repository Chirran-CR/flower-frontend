import PropTypes from "prop-types";
import React,{useState} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import products from "../../data/products.json";
import { fetchProducts } from "../../redux/actions/productActions";

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  deleteFromCart,
  iconWhiteClass,
  userData,
  removeUser,
  fetchSearchedProduct,
}) => {
  const [searchedWord,setSearchedWord]=useState("");
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const handleLogout=()=>{
    removeUser();
  }
  const handleSearchChange=(e)=>{
     setSearchedWord(e.target.value);
  };
  const handleSearchSubmit=(e)=>{
    e.preventDefault();
    let resultProducts=products?.filter((product)=> product.name.includes(searchedWord));
    console.log("result products:",resultProducts);
    fetchSearchedProduct(resultProducts);
  }
  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={e => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form onSubmit={handleSearchSubmit}>
            <input type="text" value={searchedWord} onChange={handleSearchChange} placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={e => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
            <li>
             {Object.keys(userData).length> 0 ? <Link onClick={handleLogout} to={process.env.PUBLIC_URL + "/login-register"}>Logout</Link>:<Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>}
            </li>
            <li>
            {Object.keys(userData).length> 0  ? <></>:<Link to={process.env.PUBLIC_URL + "/login-register"}>
                Register
              </Link>}
            </li>
            <li>
              
              {Object.keys(userData).length> 0  ? <Link to={process.env.PUBLIC_URL + "/my-account"}>
                {userData.user.name}&nbsp;account
              </Link>:<></>}
            </li>
          </ul>
        </div>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareData && compareData.length ? compareData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cartData}
          currency={currency}
          deleteFromCart={deleteFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
  // userData:PropTypes.userData,
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
    userData:state.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    
   removeUser:()=>{
     dispatch({type:"remove-user"})
   },
   setFromSearchedProduct:(searchedProducts)=>{
      dispatch({type:"set-from-searched-product",payload:searchedProducts});
   },
   fetchSearchedProduct:(sProducts)=>{
     dispatch(fetchProducts(sProducts))
   }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
