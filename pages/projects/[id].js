import { useRouter } from 'next/router';
import ProjectDetail from '../../components/ProjectDetail';
import { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!id) return;

    // Fetch project
    const fetchData = async () => {
      const projectRef = doc(db, 'projects', id);
      const projectSnap = await getDoc(projectRef);

      if (projectSnap.exists()) {
        setProject({ id: projectSnap.id, ...projectSnap.data() });

        // Fetch related tasks
        const q = query(collection(db, 'tasks'), where('projectId', '==', id));
        const taskSnap = await getDocs(q);
        setTasks(taskSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    };

    fetchData();
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <ProjectDetail
      project={project}
      tasks={tasks}
      onCreateTask={() => {}}
      onUpdateTask={() => {}}
      onDeleteTask={() => {}}
      onChangeStatus={() => {}}
      onReorder={() => {}}
    />
  );
}
