type ProductData = {
  price: number;
  imageUrl: string;
  description: string;
  id: number;
  title: string;
};
const ProductsCard = ({ ProductData }: { ProductData: ProductData }) => {
  return (
    <article className="border  rounded-lg w-[24%] mb-3" key={ProductData.id}>
      <img
        src={ProductData.imageUrl}
        alt="Card Image"
        className="rounded-lg w-full h-[150px] "
      />

      <div className="p-4">
        <h2 className="font-bold">{ProductData.title}</h2>
        <p className="text-justify py-3 text-sm">{ProductData.description}</p>
        <div className="mt-2">
          <p className="text-sm">
            قیمت: <span>{ProductData.price}</span>
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProductsCard;
