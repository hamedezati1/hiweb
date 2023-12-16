import Plus from "./../../assets/Icons/Plus.jsx";
import Logout from "./../../assets/Icons/Logout.jsx";
import empty from "./../../assets/empty.png";
import ProductsCard from "./components/ProductsCard.js";
import { useState, memo, FC, useEffect } from "react";
import Modal from "./components/Modal.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ProductsList: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [skip, setSkip] = useState(0);

  const navigate = useNavigate();
  const userName = localStorage.getItem("username");

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("username");
    localStorage.removeItem("rememberMe");
    navigate("/");
  };

  const token = Cookies.get("token");
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://taskapi.hiweb.ir/api/General/Product/ProductList?count=5&skip=${skip}&orderBy=title`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      setProducts((prevProducts: any) => [...prevProducts, data]);
      setSkip((prevSkip) => prevSkip + 10);
    } catch (error) {
      console.error("Error fetching products:", error);
      Cookies.remove("token");
      localStorage.removeItem("username");
      localStorage.removeItem("rememberMe");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight * 0.9 &&
        !loading
      ) {
        fetchProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div className=" container h-screen mx-auto px-3">
      <header className="flex flex-col sm:flex-row justify-between items-center p-3  border-b border-gray-500 mb-3">
        <h2>لیست محصولات</h2>
        <div className="flex justify-between items-center">
          <button
            className="bg-customGreen p-2 px-5 rounded flex justify-center items-center"
            onClick={() => setShowModal(true)}
          >
            <Plus />
            <p className="text-sm text-white mr-1">افزودن محصول</p>
          </button>
          <p className="pr-2"> {userName}</p>
          <button
            className=" p-2 px-5 rounded flex justify-center items-center outline-none"
            onClick={handleLogout}
          >
            <Logout />
            <p className="text-sm text-red-700 pr-2">خروج</p>
          </button>
        </div>
      </header>
      <main className="">
        {products.length > 0 ? (
          <div className="flex justify-between items-center flex-wrap">
            {products?.map((product: any) => {
              return product?.data?.list.map((res: any) => {
                return <ProductsCard ProductData={res} />;
              });
            })}
          </div>
        ) : (
          <figure
            className="flex flex-col justify-center items-center  cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <picture className="">
              <source media="(min-width: 900px)" srcSet={empty} />
              <source media="(min-width: 600px)" srcSet={empty} />
              <img src={empty} className="   " />
              <figcaption className="text-center">
                محصول خود را وارد نمایید.
              </figcaption>
            </picture>
          </figure>
        )}
      </main>
      {loading ? <p className="text-center py-5">Loading...</p> : null}

      {showModal ? <Modal setShowModal={setShowModal} /> : null}
    </div>
  );
};

export default memo(ProductsList);
