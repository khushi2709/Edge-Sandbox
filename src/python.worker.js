import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.mjs';

let pyodidePromise;

async function getRuntime() {
  if (!pyodidePromise) pyodidePromise = loadPyodide();
  return pyodidePromise;
}

self.onmessage = async (event) => {
  const { code } = event.data;
  try {
    const pyodide = await getRuntime();
    let output = '';
    pyodide.setStdout({ batched: (text) => { output += text + '\n'; } });
    pyodide.setStderr({ batched: (text) => { output += text + '\n'; } });
    await pyodide.runPythonAsync(code);
    self.postMessage({ success: true, output: output.trimEnd() || 'Program executed successfully (no output).' });
  } catch (error) {
    self.postMessage({ success: false, output: String(error) });
  }
};
