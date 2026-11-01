import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { addSnapshot, getProjects, getSnapshots, saveProject } from './db';

const starterCode = `# Welcome to EdgeSandbox!\n\nname = "Developer"\nprint(f"Hello, {name}!")\n\nfor number in range(1, 6):\n    print(number)\n`;

export default function App() {
  const [projects, setProjects] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState('Your program output will appear here.');
  const [running, setRunning] = useState(false);
  const [snapshots, setSnapshots] = useState([]);
  const workerRef = useRef(null);

  const activeProject = projects.find((project) => project.id === activeId);

  useEffect(() => {
    getProjects().then((saved) => {
      if (saved.length) {
        setProjects(saved);
        setActiveId(saved[0].id);
        setCode(saved[0].code);
      } else {
        const first = { id: crypto.randomUUID(), name: 'My First Project', code: starterCode };
        saveProject(first).then(() => { setProjects([first]); setActiveId(first.id); });
      }
    });
  }, []);

  useEffect(() => {
    if (!activeId) return;
    getSnapshots(activeId).then(setSnapshots);
  }, [activeId]);

  useEffect(() => () => workerRef.current?.terminate(), []);

  async function persistCode() {
    if (!activeProject) return;
    const updated = { ...activeProject, code };
    await saveProject(updated);
    setProjects((current) => current.map((project) => project.id === activeId ? updated : project));
    setOutput('Project saved locally in this browser.');
  }

  async function createProject() {
    const name = window.prompt('Project name:');
    if (!name?.trim()) return;
    const project = { id: crypto.randomUUID(), name: name.trim(), code: starterCode };
    await saveProject(project);
    setProjects((current) => [...current, project]);
    setActiveId(project.id);
    setCode(project.code);
    setOutput('New project created.');
  }

  async function createSnapshot() {
    if (!activeId) return;
    await persistCode();
    await addSnapshot(activeId, code);
    setSnapshots(await getSnapshots(activeId));
    setOutput('Version snapshot saved.');
  }

  async function runCode() {
    setRunning(true);
    setOutput('Starting Python runtime… The first run needs an internet connection to download Pyodide.');
    workerRef.current?.terminate();
    const worker = new Worker(new URL('./python.worker.js', import.meta.url), { type: 'module' });
    workerRef.current = worker;
    worker.onmessage = ({ data }) => {
      setOutput(data.output);
      setRunning(false);
      worker.terminate();
    };
    worker.onerror = (error) => {
      setOutput(`Worker error: ${error.message}`);
      setRunning(false);
      worker.terminate();
    };
    worker.postMessage({ code });
  }

  function openProject(id) {
    const project = projects.find((item) => item.id === id);
    if (!project) return;
    setActiveId(id);
    setCode(project.code);
    setOutput(`Opened ${project.name}.`);
  }

  function restoreSnapshot(snapshot) {
    setCode(snapshot.code);
    setOutput('Snapshot loaded into the editor. Click Save to update the project.');
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">E</span><div><strong>EdgeSandbox</strong><small>Code anywhere. Even offline.</small></div></div>
        <div className="status"><span className={`dot ${navigator.onLine ? 'online' : ''}`} />{navigator.onLine ? 'Online' : 'Offline'}</div>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <div className="side-heading"><span>WORKSPACE</span><button onClick={createProject} title="Create project">＋</button></div>
          <div className="project-list">
            {projects.map((project) => <button key={project.id} className={`project ${activeId === project.id ? 'selected' : ''}`} onClick={() => openProject(project.id)}><span>▣</span>{project.name}</button>)}
          </div>
          <div className="sidebar-bottom"><strong>Version history</strong><small>Snapshots for the selected project</small>
            {snapshots.length === 0 ? <p>No snapshots yet.</p> : snapshots.map((snapshot) => <button className="snapshot" key={snapshot.id} onClick={() => restoreSnapshot(snapshot)}>{new Date(snapshot.createdAt).toLocaleString()}</button>)}
          </div>
        </aside>
        <main className="main-panel">
          <div className="editor-toolbar"><div><strong>{activeProject?.name || 'Loading project…'}</strong><span className="file-label">main.py</span></div><div className="actions"><button className="secondary" onClick={persistCode}>Save locally</button><button className="secondary" onClick={createSnapshot}>Save snapshot</button><button className="run" onClick={runCode} disabled={running}>{running ? 'Running…' : '▶ Run'}</button></div></div>
          <div className="editor-wrap"><Editor height="100%" language="python" theme="vs-dark" value={code} onChange={(value) => setCode(value ?? '')} options={{ minimap: { enabled: false }, fontSize: 14, automaticLayout: true, scrollBeyondLastLine: false, padding: { top: 18 } }} /></div>
          <section className="output-panel"><div className="output-heading"><strong>TERMINAL / OUTPUT</strong><button onClick={() => setOutput('')}>Clear</button></div><pre>{output}</pre></section>
        </main>
      </div>
      <footer>EdgeSandbox MVP <span>•</span> Projects are stored locally in this browser</footer>
    </div>
  );
}
