import React from 'react'

const Content = () => {
  const snippets = [
    { id: 1, title: 'useState Hook', language: 'React', code: 'const [state, setState] = useState()', date: '2 gen 2026' },
    { id: 2, title: 'Fetch API', language: 'JavaScript', code: 'fetch(url).then(res => res.json())', date: '5 gen 2026' },
    { id: 3, title: 'CSS Flexbox', language: 'CSS', code: 'display: flex; justify-content: center;', date: '10 gen 2026' },
  ]

  return (
    <div className="h-full bg-gray-100 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">I tuoi Snippet</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm transition-all">Griglia</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Lista</button>
          </div>
        </div>

        <div className="grid gap-4">
          {snippets.map(snippet => (
            <div key={snippet.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-5 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{snippet.title}</h3>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                    {snippet.language}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded transition-all" title="Copia">
                    📋
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded transition-all" title="Modifica">
                    ✏️
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded transition-all" title="Elimina">
                    🗑️
                  </button>
                </div>
              </div>
              <pre className="bg-gray-50 p-3 rounded text-sm font-mono text-gray-700 border border-gray-200">
                {snippet.code}
              </pre>
              <p className="text-xs text-gray-500 mt-3">Modificato: {snippet.date}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
            + Aggiungi Snippet
          </button>
        </div>
      </div>
    </div>
  )
}

export default Content