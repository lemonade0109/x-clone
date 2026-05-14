export default function SignUpForm() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);

  const fieldClassName =
    "w-full rounded-md border border-zinc-300 bg-transparent px-4 py-6 text-xl text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20";

  return (
    <>
      <form className="mt-4 space-y-7 px-8 text-zinc-900 dark:text-zinc-100">
        <input type="text" placeholder="Name" className={fieldClassName} />

        <input type="email" placeholder="Email" className={fieldClassName} />

        <div className="pt-6">
          <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Date of birth
          </p>
          <p className="mt-1 text-lg text-zinc-500 dark:text-zinc-200">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <select className={fieldClassName}>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              Month
            </option>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              January
            </option>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              February
            </option>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              March
            </option>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              April
            </option>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              May
            </option>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              June
            </option>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              July
            </option>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              August
            </option>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              September
            </option>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              October
            </option>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              November
            </option>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              December
            </option>
          </select>

          <select className={fieldClassName}>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              Day
            </option>
            {Array.from({ length: 31 }, (_, day) => (
              <option
                key={day + 1}
                className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100"
              >
                {day + 1}
              </option>
            ))}
          </select>

          <select className={fieldClassName}>
            <option className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
              Year
            </option>
            {years.map((year) => (
              <option
                key={year}
                className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-100"
              >
                {year}
              </option>
            ))}
          </select>
        </div>
      </form>
    </>
  );
}
