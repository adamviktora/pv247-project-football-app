export default function AdminLogin() {
  return (
    <div>
      <div className="m-auto w-96 rounded-xl bg-secondary-color">
        <form>
          <div className="flex flex-col gap-2 px-10 py-4">
            <h2 className="my-3 self-center text-2xl font-semibold">
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
            <button className="btn btn-primary mb-3 mt-6 text-white">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
