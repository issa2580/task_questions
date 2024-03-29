// import axios from "axios";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { FormTask, TaskDataProps } from "../FormTask";

// const EditTask = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [taskData, setTaskData] = useState<TaskDataProps | null>(null);

//   useEffect(() => {
//     const fetchTaskData = async () => {
//       try {
//         const response = await axios.get<TaskDataProps>(
//           `https://tasks.vitasoftsolutions.com/userdata/${id}`
//         );
//         setTaskData(response.data);
//       } catch (error) {
//         console.error("Error fetching task data:", error);
//       }
//     };

//     if (id) {
//       fetchTaskData();
//     }
//   }, [id]);

//   const handleSubmit = async (updatedData: TaskDataProps) => {
//     try {
//       await axios.put(
//         `https://tasks.vitasoftsolutions.com/userdata/${id}`,
//         updatedData
//       );
//       router.push("/tasks/edit");
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="updateTitle">Update Task {id}</h1>
//       {taskData && <FormTask initialData={taskData} onSubmit={handleSubmit} />}
//     </div>
//   );
// };

// export default EditTask;

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormTask, TaskDataProps } from "../FormTask";

const EditTask = () => {
  const router = useRouter();
  const { id } = router.query;
  const [taskData, setTaskData] = useState<TaskDataProps | null>(null);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get<TaskDataProps>(
          `https://tasks.vitasoftsolutions.com/userdata/${id}`
        );
        setTaskData(response.data);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    if (id) {
      fetchTaskData();
    }
  }, [id]);

  const handleSubmit = async (updatedData: TaskDataProps) => {
    try {
      await axios.put(
        `https://tasks.vitasoftsolutions.com/userdata/${id}`,
        updatedData
      );
      router.push("/tasks/edit");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h1 className="updateTitle">Update Task {id}</h1>
      {taskData && <FormTask initialData={taskData} onSubmit={handleSubmit} />}
    </div>
  );
};

export default EditTask;
