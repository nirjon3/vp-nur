/** Editorial inner-page masthead: kicker, title, one-line description. */
export function PageHeader({
  title,
  description,
}: {
  kicker?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-line bg-offwhite">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
        <h1 className="bn-heading max-w-4xl text-3xl text-forest sm:text-4xl lg:text-[44px] lg:leading-[1.2]">
          {title}
        </h1>
        {description ? (
          <p className="prose-measure bn mt-3 text-[15px] leading-7 text-body sm:text-base">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
