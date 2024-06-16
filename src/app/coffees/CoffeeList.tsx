import Image from "next/image";

type CoffeeType = "hot" | "iced";

type Coffee = {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  image: string;
  type: CoffeeType;
};

const getCoffees = async (type: CoffeeType): Promise<Coffee[]> => {
  const resp = await fetch(
    `https://oqqhqztkvpb5q3od6h7r57q32e0xxezp.lambda-url.ap-southeast-2.on.aws/coffee/${type}`,
    {
      next: { revalidate: 180 },
    },
  );
  const coffees = (await resp.json()) as Exclude<Coffee, "type">[];
  return coffees.map((coffee) => ({ ...coffee, type }));
};

type Props = {
  type: CoffeeType;
  isTop?: boolean;
};

export async function CoffeeList({ type, isTop }: Props) {
  const coffees = await getCoffees(type);

  return (
    <ul className="grid grid-cols-3 gap-x-3 gap-y-6">
      {coffees.map((coffee, index) => (
        <li key={coffee.id}>
          <h2 className="text-lg mb-2">{coffee.title}</h2>
          <p className="line-clamp-3 min-h-[72px] mb-2">{coffee.description}</p>
          <Image
            src={coffee.image}
            alt={coffee.title}
            width={640}
            height={960}
            sizes="33vw"
            style={{ objectFit: "cover", width: "100%", height: "320px" }}
            priority={isTop && index < 6}
          />
        </li>
      ))}
    </ul>
  );
}
