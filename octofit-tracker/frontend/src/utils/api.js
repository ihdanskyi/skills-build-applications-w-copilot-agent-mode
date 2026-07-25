const getCodespaceUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

export function getApiUrl(path = '/') {
  const baseUrl = getCodespaceUrl();
  return `${baseUrl}${path}`;
}
