// const Loading = () => {
//   return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
// };

// export default Loading;

// src/components/Loading.jsx

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="ml-4 text-lg">Loading ticket details...</p>
    </div>
  );
};

export default Loading;