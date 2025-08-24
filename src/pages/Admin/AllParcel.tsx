import { useGetAllParcelQuery } from "@/redux/features/parcel/parcel.api";

export default function AllParcel() {
    const {data} = useGetAllParcelQuery({});
console.log(data)
  return (
    <div>
      <h1>All Parcel : {data?.length}</h1>
      <div>{data?.map((item) => (
<div key={item._id}>
<h1>{item.parcelType}</h1>
</div>
      ))}</div>
    </div>
  )
}
