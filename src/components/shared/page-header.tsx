/** Editorial inner-page masthead: title only (kicker & subtitle/description removed per user request). */
export function PageHeader({
  title,
}: {
  kicker?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-line bg-offwhite">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <h1 className="bn-heading max-w-4xl text-3xl text-forest sm:text-4xl lg:text-[42px] lg:leading-[1.2]">
          {title}
        </h1>
      </div>
    </div>
  );
}
