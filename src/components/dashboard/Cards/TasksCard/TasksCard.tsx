import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { userData } from "@/types/DashboardPage/dashboardTypes";

interface TasksCardProps {
  userData?: userData;
}

const TasksCard: React.FC<TasksCardProps> = ({ userData }) => {
  return (
    <Card>
      <CardHeader
        title="Tasks"
        className="bg-blue-500 text-white"
        sx={{
          "& .MuiTypography-root": {
            fontWeight: 700,
          },
        }}
      ></CardHeader>
      <CardContent>
        {userData?.tasks.length ? (
          userData?.tasks.map((task) => (
            <div key={task.id} className="flex h-10">
              {task.status === "to-be-done" ? (
                <RemoveCircleIcon className="text-amber-400" />
              ) : (
                <CheckCircleIcon className="text-green-500" />
              )}
              <Typography className="truncate">{task.title}</Typography>
            </div>
          ))
        ) : (
          <Typography>No Tasks available</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TasksCard;
