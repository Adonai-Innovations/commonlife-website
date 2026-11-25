"use client";

const fieldClassName =
  "h-[52px] w-full rounded-[4px] border border-clDeepOcean bg-clWhite px-3 font-inter text-base text-clDeepOcean caret-clDeepOcean focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clBlue";

const labelClassName = "font-inter text-sm font-medium leading-normal text-clDeepOcean min-[1100px]:text-[15px]";

/**
 * The approved fields stay. The submit label is still pending, so there is no submit control
 * and this form does not send anything.
 */
export default function PilotForm() {
  return (
    <form
      className="flex flex-col gap-5 rounded-[4px] bg-clWhite p-6 min-[1100px]:p-12"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="flex flex-col gap-5 min-[1100px]:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label className={labelClassName} htmlFor="pilot-first-name">
            First Name (required)
          </label>
          <input
            id="pilot-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className={fieldClassName}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label className={labelClassName} htmlFor="pilot-last-name">
            Last Name (required)
          </label>
          <input
            id="pilot-last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClassName} htmlFor="pilot-email">
          Email (required)
        </label>
        <input
          id="pilot-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClassName} htmlFor="pilot-subject">
          Subject (required)
        </label>
        <input
          id="pilot-subject"
          name="subject"
          type="text"
          autoComplete="off"
          required
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClassName} htmlFor="pilot-message">
          Message (required)
        </label>
        <textarea
          id="pilot-message"
          name="message"
          required
          rows={4}
          className={`${fieldClassName} h-[120px] resize-none py-3`}
        />
      </div>
    </form>
  );
}
