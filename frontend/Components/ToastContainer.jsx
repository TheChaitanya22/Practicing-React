import { useRef, useState } from "react";

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});
  console.log(timersRef);
  const handleClose = (id) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToasts((prevToasts) => {
      const filteredArr = prevToasts.filter((toasts) => {
        return toasts.id !== id;
      });
      return filteredArr;
    });
  };
  const handleAdd = (message, type) => {
    const id = new Date().getTime();
    const newToasts = [...toasts, { id, message, type }];
    setToasts(newToasts);
    timersRef.current[id] = setTimeout(() => handleClose(id), 3000);
  };

  return (
    <div className="flex justify-center">
      <div className="fixed top-2 right-2">
        {toasts.map(({ id, message, type }) => {
          return (
            <div
              key={id}
              className={`animate-slide-in w-60 p-5 rounded-2xl m-2 relative text-white
          ${
            type === "success"
              ? "bg-green-500"
              : type === "info"
              ? "bg-blue-500"
              : type === "warning"
              ? "bg-yellow-500"
              : "bg-red-500"
          }
          `}
            >
              {message}
              <span
                className="absolute right-6 font-bold cursor-pointer"
                onClick={() => handleClose(id)}
              >
                X
              </span>
            </div>
          );
        })}
      </div>

      <div className="">
        <button
          className="cursor-pointer bg-green-400 m-2 rounded-md p-2"
          onClick={() => handleAdd("Success", "success")}
        >
          Success Toast
        </button>
        <button
          className="cursor-pointer bg-blue-400 m-2 rounded-md p-2"
          onClick={() => handleAdd("Info", "info")}
        >
          Info Toast
        </button>
        <button
          className="cursor-pointer bg-yellow-400 m-2 rounded-md p-2"
          onClick={() => handleAdd("Warning", "warning")}
        >
          Warning Toast
        </button>
        <button
          className="cursor-pointer bg-red-400 m-2 rounded-md p-2"
          onClick={() => handleAdd("Error", "error")}
        >
          Error Toast
        </button>
      </div>
    </div>
  );
}
