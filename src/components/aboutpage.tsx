//////////////////////////////
export interface AboutPageProps {
  title: string;
  description: string;
  whyTitle: string;
  whyText: string;
  technologies: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

//////////////////////////////
export default function AboutPage({
  title,
  description,
  whyTitle,
  whyText,
  technologies,
  faqs,
}: AboutPageProps) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="prose prose-invert max-w-none ">
        <h1 className="text-3xl font-light">{title}</h1>
        <p className="mt-4 text-base leading-relaxed">{description}</p>

        <h2 className="mt-8 text-2xl font-medium">{whyTitle}</h2>
        <p className="mt-3 text-base leading-relaxed">{whyText}</p>

        <h2 className="mt-8 text-2xl font-medium">Technology</h2>
        <ul className="mt-3 list-disc list-inside text-base space-y-1">
          {technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-light">FAQ</h2>
        <div className="mt-4 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <p className="text-sm  uppercase tracking-wider">
                {faq.question}
              </p>
              <p className="mt-2 text-base ">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}