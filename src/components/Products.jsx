import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";



const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState('asc');

  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product))
  }

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      // const response = await fetch("https://fakestoreapi.com/products/");
            const response = await fetch("api/sneakers.json");

      if (componentMounted) {
        // setData(await response.clone().json());
        // setFilter(await response.json());
        const rdata = await response.json()
        // console.log(rdata.sneakers)
          setData(rdata.sneakers);
        setFilter(rdata.sneakers);
        // console.log(await response.clone().json().sneakers)
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category.includes(cat));
    setFilter(updatedList);
  }

  const sortProducts = (feild) => {
    let newList = []
     if(order == 'desc') {
         newList = [...filter].sort((a, b) => (a[feild] < b[feild] ? 1 : -1))
      } else {
        newList = [...filter].sort((a, b) => (b[feild] < a[feild] ? 1 : -1))
      }
      setFilter(newList)
     order == "asc" ? setOrder("desc") : setOrder("asc");

  }

  const ShowProducts = ({handleSearch}) => {

    const [searchText , setSearchText] = useState('')
    return (
      <>
      <div className="d-flex">
          {/* <form className="form-inline ml-auto"> */}
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
    <button className="btn btn-outline-dark my-2 my-sm-0" type="submit" onClick={() => handleSearch(searchText)}>Search</button>
  {/* </form> */}
      </div>
     <div className="row">
        <div className="col-md-8 buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>All</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("lifestyle")}>Lifestyle</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("basketball")}>
            Basketball
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("running")}>Running</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("skateboarding")}>Skateboarding</button>
        </div>

          <div className=" col-md-4 buttons text-right py-5">
           
          <button className="btn btn-dark btn-sm m-2" onClick={() => sortProducts("retail_price_cents")}>Sort By Price <span>&uarr;&darr;</span></button>         
        </div>
</div>
        {filter && filter.map((product) => {
          return (
            <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4" data-testid="test-product">
              <div className="card text-left h-100" key={product.id} style={{border: 0}}>
                <img
                  className="card-img-top p-3"
                  src={product.original_picture_url}
                  alt="Card"
                  height={300}
                  style={{background: 'rgba(var(--bs-light-rgb))'}}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.name.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.details.substring(0, 90)}...
                  </p>
                </div>
                <div className="card-body">
                  <h5 className="card-text text text-dark">$ {product.retail_price_cents}</h5>
                  <Link to={"/product/" + product.id} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

          );
        })}
      </>
    );
  };

  const handleSearch = (term) => {
    const filtered = data.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(term)));
    setFilter(filtered)
  }
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts handleSearch={(text) => handleSearch(text)}/>}
        </div>
      </div>
    </>
  );
};

export default Products;
