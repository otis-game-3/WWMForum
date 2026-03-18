import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import "github-markdown-css/github-markdown.css";

export async function generateStaticParams() {
  const files = fs.readdirSync("content");
  return files.map((file) => ({
    slug: file.replace(".md", ""),
  }));
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params } : Props) {
  const filePath = path.join("content", params.slug + ".md");
  const file = fs.readFileSync(filePath, "utf-8");

  const { content, data } = matter(file);
  const processed = await remark().use(html).process(content);

  return (
    <div>
        <h1>{data.title}</h1>
        <div className="max-w-3xl mx-auto px-4 py-10">
            <article className="markdown-body dark prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: processed.toString() }} />
            </article>
        </div>
    </div>
  );
}