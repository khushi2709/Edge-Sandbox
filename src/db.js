import { openDB } from 'idb';

const dbPromise = openDB('edgesandbox-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('projects')) db.createObjectStore('projects', { keyPath: 'id' });
    if (!db.objectStoreNames.contains('snapshots')) db.createObjectStore('snapshots', { keyPath: 'id', autoIncrement: true });
  }
});

export async function getProjects() {
  return (await dbPromise).getAll('projects');
}

export async function saveProject(project) {
  return (await dbPromise).put('projects', { ...project, updatedAt: Date.now() });
}

export async function addSnapshot(projectId, code) {
  return (await dbPromise).add('snapshots', { projectId, code, createdAt: Date.now() });
}

export async function getSnapshots(projectId) {
  const all = await (await dbPromise).getAll('snapshots');
  return all.filter((snapshot) => snapshot.projectId === projectId).sort((a, b) => b.createdAt - a.createdAt);
}
