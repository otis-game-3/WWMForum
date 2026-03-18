import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export const metadata = {
  title: "副本攻略清單"
};

type Guide = {
  slug: string;
  title: string;
  date: string;
};

function getGuides(): Guide[] {
  const files = fs.readdirSync("content");

  return files.map((file) => {
    const slug = file.replace(".md", "");
    const filePath = path.join("content", file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      date: "",
    };
  });
}

export default function GuidesPage() {
  const guides = getGuides();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">副本攻略</h1>

      <div className="grid gap-6">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`}>
            <div className="p-5 border rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
              <h2 className="text-xl font-semibold">{guide.title}</h2>
              <p className="text-sm text-gray-500 mt-2">
                {guide.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}