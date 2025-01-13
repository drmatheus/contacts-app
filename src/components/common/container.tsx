const Container = ({ children }: any) => {
  return (
    <div className="max-w-7xl px-8 w-[100vw] xl:px-4 mt-4 mx-auto min-h-screen flex flex-col overflow-hidden lg:flex-row gap-4">
      <div className="lg:w-[30%] w-full ">{children[0]}</div>
      <div className="lg:w-[70%] w-full ">{children[1]}</div>
    </div>
  );
};

export default Container;
