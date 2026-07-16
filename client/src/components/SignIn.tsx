const SignIn = () => {
  return (
    <div className="flex items-center justify-center mt-10 m-auto flex-col">
      <h2 className="text-4xl font-semibold">Sign in to your account</h2>
      <span>
        <span>Or </span>
        <a className=" underline" href="">
          sign up for a new account
        </a>
      </span>

      <form className="flex flex-col w-110 border-gray-300 mt-4 border shadow rounded p-6 gap-2">
        <label htmlFor="email" className="text-lg font-semibold">
          Email address
        </label>
        <input
          className="border border-gray-500 rounded px-3 py-2"
          type="text"
          id="email"
          placeholder="Enter your email..."
        />

        <label htmlFor="password" className="text-lg font-semibold">
          Password
        </label>
        <input
          className="border border-gray-500 rounded px-3 py-2"
          type="password"
          id="password"
          placeholder="Enter your password..."
        />

        <div className="flex justify-between items-center">
          <div>
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="button" className="underline cursor-pointer">
            Forgot your password?
          </button>
        </div>

        <button
          type="submit"
          className="px-3 py-2 bg-indigo-600 text-white rounded mt-2 cursor-pointer"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
