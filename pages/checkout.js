import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../redux/slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";

const filterArray = (myArray) => {
  const myObj = {};
  const newArray = [];
  myArray.forEach((elem) => {
    if (!myObj[elem.id]) {
      myObj[elem.id] = true;
      newArray.push(elem);
    }
  });
  return newArray;
};

function Checkout() {
  const [session] = useSession();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex mx-auto max-w-screen-2xl absolute top-24 left-0 right-0">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>

            {filterArray(items).map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                category={item.category}
                description={item.description}
                price={item.price}
                title={item.title}
                image={item.image}
                hasPrime={item.hasPrime}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length}) items:{" "}
              </h2>
              <span className="font-bold">
                <Currency quantity={total} />
              </span>

              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
