"use client";

export function TextField({
  name,
  label,
  required = false,
  error = false,
  value,
  onChange,
  autoComplete,
  multiline = false,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: boolean;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  multiline?: boolean;
}) {
  const id = name;
  return (
    <div className="field" data-error={error ? "true" : "false"}>
      <div className="field-label-row">
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
        {required ? <span className="field-req">(required)</span> : null}
      </div>
      {multiline ? (
        <textarea
          className="control"
          id={id}
          name={name}
          value={value}
          autoComplete={autoComplete}
          aria-invalid={error || undefined}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className="control"
          id={id}
          name={name}
          value={value}
          autoComplete={autoComplete}
          aria-invalid={error || undefined}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </div>
  );
}

export function SelectField({
  name,
  label,
  required = false,
  error = false,
  value,
  options,
  onChange,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: boolean;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  const id = name;
  return (
    <div className="field" data-error={error ? "true" : "false"}>
      <div className="field-label-row">
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
        {required ? <span className="field-req">(required)</span> : null}
      </div>
      <select
        className={value ? "control is-set" : "control"}
        id={id}
        name={name}
        value={value}
        aria-invalid={error || undefined}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckGroup({
  legend,
  required = false,
  hint,
  name,
  options,
  values,
  error = false,
  onChange,
}: {
  legend: string;
  required?: boolean;
  hint?: string;
  name: string;
  options: readonly string[];
  values: string[];
  error?: boolean;
  onChange: (values: string[]) => void;
}) {
  return (
    <fieldset className="checks" data-error={error ? "true" : "false"} aria-invalid={error || undefined}>
      <legend>
        <span className="legend-row">
          <span className="legend-label">{legend}</span>
          {required ? <span className="field-req">(required)</span> : null}
        </span>
        {hint ? <span className="hint">{hint}</span> : null}
      </legend>
      {options.map((option) => {
        const checked = values.includes(option);
        return (
          <label className="check" key={option}>
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={checked}
              aria-invalid={error || undefined}
              onChange={() => {
                onChange(checked ? values.filter((item) => item !== option) : [...values, option]);
              }}
            />
            {option}
          </label>
        );
      })}
    </fieldset>
  );
}
