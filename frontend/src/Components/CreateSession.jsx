import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateSession({ batchId, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!batchId) {
      return toast.error("Select a batch first");
    }

    try {
      await axios.post(
        "http://localhost:8007/session/create",
        {
          ...data,
          batchId,
        },
        { withCredentials: true }
      );

      toast.success("Session created");
      reset(); 
      onSuccess && onSuccess(); 
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow mt-5">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Create Session
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        
        {/* Title */}
        <input
          type="text"
          placeholder="Session Title"
          {...register("title", { required: "Title is required" })}
          className="border border-orange-300 p-3 rounded-lg outline-none"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">
            {errors.title.message}
          </span>
        )}

        {/* Date */}
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className="border border-orange-300 p-3 rounded-lg outline-none"
        />
        {errors.date && (
          <span className="text-red-500 text-sm">
            {errors.date.message}
          </span>
        )}

        {/* Start Time */}
        <input
          type="time"
          {...register("startTime", { required: "Start time is required" })}
          className="border border-orange-300 p-3 rounded-lg outline-none"
        />
        {errors.startTime && (
          <span className="text-red-500 text-sm">
            {errors.startTime.message}
          </span>
        )}

  
        <input
          type="time"
          {...register("endTime", { required: "End time is required" })}
          className="border border-orange-300 p-3 rounded-lg outline-none"
        />
        {errors.endTime && (
          <span className="text-red-500 text-sm">
            {errors.endTime.message}
          </span>
        )}

        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-400 transition"
        >
          Create Session
        </button>
      </form>
    </div>
  );
}