import axios from "axios";

export const IbanForm = () => {
  const handleSubmit = async e => {
    let data = new FormData(e.target);

    let values = Object.fromEntries(data);

    console.log({ values });
    axios.post("localhost:8000/DepositSlipNo", {
      accountNo: values,
    });

    e.preventDefault();
  };

  return (
      <div className="mx-auto flex h-screen flex-col items-center justify-center  ">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Enter Iban Number

            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  IBAN
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={""}
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="******************"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none   focus:ring-4 "
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};
