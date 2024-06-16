import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type CoffeeType = "hot" | "iced";

type Coffee = {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  image: string;
  type: CoffeeType;
};

const getCoffee = async (type: CoffeeType, id: number): Promise<Coffee> => {
  const resp = await fetch(
    `https://oqqhqztkvpb5q3od6h7r57q32e0xxezp.lambda-url.ap-southeast-2.on.aws/coffee/${type}/${id}`,
    {
      next: { revalidate: 180 },
    },
  );
  const coffee = (await resp.json()) as Exclude<Coffee, "type">;
  return { ...coffee, type };
};

type Props = {
  params: {
    slug: string;
  };
};

const parseSlug = (slug: string) => {
  if (!slug.match(/^(hot|iced)-[0-9]+$/)) return;

  const [type, id] = slug.split("-");
  return { type: type as CoffeeType, id: parseInt(id, 10) };
};

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, id } = parseSlug(params.slug)!;
  const coffee = await getCoffee(type, id);

  return {
    title: coffee.title,
    description: coffee.description,
    openGraph: {
      images: [coffee.image],
    },
  };
}

export default async function CoffeeDetailPage({ params }: Props) {
  const parsedSlug = parseSlug(params.slug);
  if (!parsedSlug) {
    notFound();
  }

  const { type, id } = parsedSlug;
  const coffee = await getCoffee(type, id);

  return (
    <>
      <h1 className="text-lg mb-2">{coffee.title}</h1>
      <p className="line-clamp-3 min-h-[72px] mb-2">{coffee.description}</p>
      <Image
        src={coffee.image}
        alt={coffee.title}
        width={640}
        height={960}
        priority={true}
        style={{ width: "100%", height: "auto" }}
      />
    </>
  );
}
