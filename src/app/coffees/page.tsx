import Image from "next/image";

type Coffee = {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  image: string;
};

const getHotCoffees = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const resp = await fetch("https://api.sampleapis.com/coffee/hot", {
    cache: "no-cache",
    // next: { revalidate: 30 },
  });
  return (await resp.json()) as Coffee[];
};

export default async function CoffeeListPage() {
  const coffees = await getHotCoffees();

  return (
    <div>
      <h1 className="text-2xl mb-4">Hot Coffees</h1>
      <ul className="grid grid-cols-3 gap-x-3 gap-y-6">
        {coffees.map((coffee) => (
          <li key={coffee.id}>
            <h2 className="text-lg mb-2">{coffee.title}</h2>
            <p className="line-clamp-3 min-h-[72px] mb-2">
              {coffee.description}
            </p>
            <figure
              style={{ position: "relative", width: "100%", height: "160px" }}
            >
              <Image
                src={coffee.image}
                alt={coffee.title}
                fill
                style={{ objectFit: "contain" }}
              />
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
