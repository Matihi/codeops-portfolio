import { notFound } from "next/navigation";
import getDishes from "@/services/dishes";

const url = "https://addis-eats-backend.onrender.com/menu/";

export async function generateStaticParams() {
  const dishes = await getDishes(url);

  return dishes.map((dish) => ({ slug: dish.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dishes = await getDishes(url);

  const dish = dishes.find((dish) => dish.slug === slug);
  if (!dish) {
    return { title: "Dish not found" };
  }

  return {
    title: dish.nameEn,
    description: `${dish.nameEn} — ${dish.priceETB} ETB.`,
    openGraph: {
      title: dish.nameEn,
      description: `${dish.nameEn} — ${dish.priceETB} ETB.`,
      type: "website",
    },
  };
}

const DishDetail = async ({ params }) => {
  const { slug } = await params;
  const dishes = await getDishes(url);

  const dish = dishes.find((dish) => dish.slug === slug);
  if (!dish) {
    notFound();
  }

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "Dish",
    name: dish.nameEn,
    offers: { "@type": "Offer", price: dish.priceETB, priceCurrency: "ETB" },
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div>DishDetail {slug}</div>
    </section>
  );
};

export default DishDetail;
