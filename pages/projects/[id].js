import { useRouter } from "next/router";

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Later fetch tasks by projectId from Firestore
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Project Details: {id}</h1>
      <p className="text-gray-600">Here you’ll see project overview, tasks, and performance.</p>
    </div>
  );
}
