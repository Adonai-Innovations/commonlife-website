const inputBase =
  "h-[52px] w-full rounded-[4px] bg-clWhite pl-4 pr-3.5 font-inter text-base text-clDeepOcean focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clBlue";

export function fieldBorder(error?: boolean) {
  return error ? "border-2 border-clAmber" : "border border-clDeepOcean/60";
}

export function RequiredMark({ error }: { error: boolean }) {
  return (
    <span className={error ? "font-semibold text-clAmber" : "font-normal text-clDeepOcean"}>
      (required)
    </span>
  );
}

export function FieldLabel({
  htmlFor,
  label,
  required,
  error,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  error?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-wrap gap-x-1.5 font-inter text-[15px] font-medium leading-[22px] text-clDeepOcean">
      <span>{label}</span>
      {required ? <RequiredMark error={Boolean(error)} /> : null}
    </label>
  );
}

export function TextField({
  id,
  name,
  label,
  required,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  error?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <FieldLabel htmlFor={id} label={label} required={required} error={error} />
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        className={`${inputBase} ${fieldBorder(error)}`}
      />
    </div>
  );
}

export function TextAreaField({
  id,
  name,
  label,
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  error?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel htmlFor={id} label={label} required={required} error={error} />
      <textarea
        id={id}
        name={name}
        rows={4}
        aria-invalid={error ? true : undefined}
        className={`${inputBase} h-[132px] resize-none py-3.5 ${fieldBorder(error)}`}
      />
    </div>
  );
}

export function SelectField({
  id,
  name,
  label,
  required,
  error,
  options,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  error?: boolean;
  options: readonly string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel htmlFor={id} label={label} required={required} error={error} />
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue=""
          aria-invalid={error ? true : undefined}
          className={`${inputBase} appearance-none pr-10 ${fieldBorder(error)}`}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative chevron */}
        <img
          src="/homepage/icon-chevron-down.svg"
          alt=""
          width={20}
          height={20}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}

export function CheckGroup({
  legend,
  hint,
  name,
  options,
  required,
  error,
}: {
  legend: string;
  hint?: string;
  name: string;
  options: readonly string[];
  required?: boolean;
  error?: boolean;
}) {
  return (
    <fieldset className="flex flex-col gap-3" aria-invalid={error ? true : undefined}>
      <legend className="flex flex-wrap gap-x-1.5 font-inter text-[15px] font-medium leading-[22px] text-clDeepOcean">
        <span>{legend}</span>
        {required ? <RequiredMark error={Boolean(error)} /> : null}
      </legend>
      {hint ? <p className="font-inter text-[15px] text-clDeepOcean">{hint}</p> : null}
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <label key={option} className="flex items-start gap-3 font-inter text-base leading-6 text-clDeepOcean">
            <span className="relative mt-0.5 inline-flex size-5 shrink-0">
              <input
                type="checkbox"
                name={name}
                value={option}
                aria-invalid={error ? true : undefined}
                className={`peer size-5 appearance-none rounded-[3px] bg-clWhite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clBlue ${fieldBorder(error)}`}
              />
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden size-5 text-clDeepOcean peer-checked:block"
              >
                <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function FormAlert({ children }: { children: string }) {
  return (
    <div className="flex items-start gap-3 rounded-[4px] border-2 border-clAmber bg-clWhite p-4" role="alert">
      {/* eslint-disable-next-line @next/next/no-img-element -- alert icon */}
      <img src="/homepage/icon-circle-alert.svg" alt="" width={20} height={20} className="mt-0.5 shrink-0" />
      <p className="font-inter text-base font-medium leading-6 text-clDeepOcean">{children}</p>
    </div>
  );
}
