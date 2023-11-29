import Container from "@/app/components/Container";

import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrdersById";
import NullData from "@/app/components/NullData";

interface IParams {
  orderId?: string;
}
const Order = async ({ params }: { params: IParams }) => {
  console.log("params", params);

  const order = await getOrderById(params);
  if (!order) return <NullData title="No orders" />;

  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
        <div className="flex flex-col mt-20 gap-4"></div>
      </Container>
    </div>
  );
};

export default Order;
