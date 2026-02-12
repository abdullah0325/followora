







export async function getCategories() {
    console.log("process.env.NEXT_PUBLIC_API_URL",process.env.NEXT_PUBLIC_API_URL)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    {
      cache: "no-store", // or revalidate
    }
  );

  const data = await res.json();
  return data.categories || [];
}



