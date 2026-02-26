import { Button } from "@/components/ui/button";

export default function SignUpForm() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);

  return (
    <>
      <form className="mt-4 space-y-7 px-8">
        <input
          type="text"
          placeholder="Name"
          className="w-full rounded-md border border-gray-300 px-4 py-6 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-md border border-gray-300 px-4 py-6 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <div className="pt-2">
          <p className="text-lg font-semibold">Date of birth</p>
          <p className="mt-1 text-md text-gray-500">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <select className="rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
            <option>Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>

          <select className="rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
            <option>Day</option>
            {Array.from({ length: 31 }, (_, day) => (
              <option key={day + 1}>{day + 1}</option>
            ))}
          </select>

          <select className="rounded-md border border-gray-300 bg-transparent px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
            <option>Year</option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>

        <Button className="mt-4 w-full rounded-full bg-black py-6 text-base font-semibold text-white hover:bg-gray-800 hover:text-white">
          Next
        </Button>
      </form>
    </>
  );
}
