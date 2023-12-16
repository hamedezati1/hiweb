import { ChangeEvent, memo, useRef, useState } from "react";
import Close from "../../../assets/Icons/Close.tsx";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

type ModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type FileState = File | null | any;
const Modal: React.FC<ModalProps> = ({ setShowModal }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [productName, setProductName] = useState<any>(null);
  const [productPrice, setProductPrice] = useState<any>(null);
  const [productDec, setProductDec] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<FileState>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const token = Cookies.get("token");
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const addProduct = async () => {
    if (productName && productPrice && productDec && selectedFile) {
      setLoading(true);

      const formData = new FormData();
      formData.append("ProductTitle", productName);
      formData.append("ProductPrice", productPrice);
      formData.append("Description", productDec);
      formData.append("file", selectedFile);

      try {
        setLoading(true);

        fetch("https://taskapi.hiweb.ir/api/General/Product/AddProduct", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }).then(async (response) => {
          if (!response.ok) {
            setLoading(false);
          }
          setShowModal(false);

          toast.success("محصول اضافه شد");

          return response.json();
        });
      } catch (error) {
        setLoading(false);
        toast.error("مشکلی پیش امده  است");

        console.error("Error adding product:", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("فیلد های لازم را پر کنید");
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}

          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-4">
            {/*header*/}
            <div className="mr-auto" onClick={() => setShowModal(false)}>
              <Close />
            </div>
            <div className="flex items-start justify-between py-2 rounded-t">
              <h3 className="text-xl"> افزودن محصول</h3>
            </div>
            {/*body*/}
            <div className="flex flex-col mb-3">
              <label className="mb-2 text-sm" htmlFor="name">
                نام محصول
              </label>
              <input
                type="text"
                name="name"
                placeholder="نام محصول...."
                id="name"
                onChange={(e) => setProductName(e.target.value)}
                className="text-sm p-2 outline-none rounded border border-gray-400"
              />
            </div>
            <div className="flex flex-col mb-3">
              <label className="mb-2 text-sm" htmlFor="price">
                قیمت محصول
              </label>
              <input
                type="text"
                name="price"
                placeholder="قیمت محصول...."
                id="price"
                onChange={(e) => setProductPrice(e.target.value)}
                className="text-sm p-2 outline-none rounded border border-gray-400"
              />
            </div>
            <div className="flex flex-col mb-3">
              <label className="mb-2 text-sm" htmlFor="dec">
                توضیحات
              </label>
              <textarea
                name="dec"
                placeholder="...."
                id="dec"
                onChange={(e) => setProductDec(e.target.value)}
                className="text-sm p-2 outline-none rounded border border-gray-400 h-[100px]"
              />
            </div>
            <div className="flex flex-col mb-3">
              <label className="mb-2 text-sm" htmlFor="file">
                بارگزاری عکس محصول
              </label>
              <label
                htmlFor="file"
                className=" border flex justify-between items-center"
              >
                {selectedFile ? (
                  <p> {selectedFile?.name}</p>
                ) : (
                  <p className="text-gray-500 text-[10px]"> jpeg،png</p>
                )}
                <button
                  onClick={handleButtonClick}
                  className="bg-customGray p-2 rounded text-sm"
                >
                  {" "}
                  انتخاب فایل
                </button>
                <input
                  type="file"
                  id="file"
                  accept=".jpg, .jpeg, .png"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e)}
                />
              </label>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6  rounded-b">
              <button
                className=" background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                انصراف
              </button>
              {loading ? (
                <p className="text-center py-5">Loading...</p>
              ) : (
                <button
                  className="bg-emerald-400 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => addProduct()}
                >
                  ثبت محصول{" "}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
export default memo(Modal);
