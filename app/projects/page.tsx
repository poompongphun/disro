const channels = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Project</h1>
        <button className="bg-lightBlue px-4 py-2 text-black rounded-md text-sm">
          Join team or Create team
        </button>
      </div>
      <h2 className="my-4">Your Projects</h2>
      <div className="h-[calc(100vh-172px)] flex justify-center items-center">
        You don’t have any project
      </div>
    </div>
  );
};

export default channels;
