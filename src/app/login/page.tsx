export default function AdminLogin() {
  return (
    <div>
      <div className="w-96 bg-secondary-color rounded-xl m-auto">
        <form>
          <div className="flex flex-col px-10 py-4 gap-2">
            <h2 className="self-center text-2xl font-semibold my-3">
              Admin login
            </h2>
            <div className="flex flex-col">
              <label htmlFor="admin-username">Email or username</label>
              <input id="admin-username" type="text" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="admin-password">Password</label>
              <input id="admin-password" type="text" />
            </div>
            <button className="mt-6 mb-3 btn btn-primary text-white">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
