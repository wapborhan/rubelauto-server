import { ProgressSpinner } from "primereact/progressspinner";

const Loading = () => {
  return (
    <div className="flex my-10 justify-center items-center">
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
  );
};

export default Loading;
