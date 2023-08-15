import { memo } from "react";

const LOADING_SKELETON_AMOUNT = 20;
const LoadingDashboard = () => {
  const renderSkeleton = () => {
    const skeleton: JSX.Element[] = [];
    for (let i = 0; i < LOADING_SKELETON_AMOUNT; i++) {
      skeleton.push(
        <div
          className="shadow rounded-md p-4 basis-56 mx-auto bg-white"
          key={i}
        >
          <div className="animate-pulse">
            <div className="flex flex-col gap-3 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="h-2 bg-slate-200 rounded w-14"></div>
            </div>
          </div>
        </div>
      );
    }
    return skeleton;
  };
  return <>{renderSkeleton()}</>;
};

export default memo(LoadingDashboard);
