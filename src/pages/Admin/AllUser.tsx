import { useGetAllUserQuery } from "@/redux/features/user/user.api";


export default function AllUser() {
const {data} = useGetAllUserQuery({});
console.log(data)
  return (
    <div>
      <h1>Total Users : {data?.length}</h1>

      <div>
        {
          data?.map((item) => (
            <div key={item._id}>
              <h1>{item.email}</h1>
            </div>
          ))
        }
      </div>
    </div>
  )
}
