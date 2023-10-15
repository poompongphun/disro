const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
      <div className="hidden xl:col-span-2 sm:flex justify-center items-center auth-bg-gradient overflow-hidden relative">
        <div className=" w-[550px] h-[550px] border rounded-full absolute left-[-180px] bottom-[-155px]"></div>
        <div className=" w-[550px] h-[550px] border rounded-full absolute left-[-110px] bottom-[-180px]"></div>
        <div className=" w-3/4">
          <div>
            <h1 className="text-4xl font-bold">Disro</h1>
            <span>The most popular peer to peer lending at SEA</span>
          </div>
          <button
            type="button"
            className="bg-darkBlue hover:opacity-95 transition-opacity px-6 py-2 rounded-full mt-4"
          >
            Read more
          </button>
        </div>
      </div>
      <div className=" flex justify-center items-center bg-lightBlue">
        {children}
      </div>
    </div>
  );
};
export default AuthLayout;
