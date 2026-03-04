export interface AboutPageProps {
  title: string;
  description: string;
  whyTitle: string;
  whyText: string;
}

export default function AboutPage({
  title,
  description,
  whyTitle,
  whyText,
}: AboutPageProps) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="prose prose-invert max-w-none">
        <h1 className="text-3xl font-light">{title}</h1>
        <p className="mt-4 text-base leading-relaxed">{description}</p>

        <h2 className="mt-8 text-2xl font-medium">{whyTitle}</h2>
        <p className="mt-3 text-base leading-relaxed">{whyText}</p>
      </div>
    </section>
  );
}