import { getDashboardDataWithoutCacheLife } from "@/src/actions";
import CardItem from "./CardItem";

export default async function ItemsList() {

    const data = await getDashboardDataWithoutCacheLife();

    return (
        <ul className="grid gap-4 w-full">
            {data.data.map(item => (
                <CardItem key={item.id} item={item} />
            ))}
        </ul>
    )
}
