import { useState } from 'react'

function App() {
  const [query, setQuery] = useState('')
  const [downloadVersion, setDownloadVersion] = useState('')
  const [downloadState, setDownloadState] = useState<{status: 'idle' | 'loading' | 'success' | 'error', message?: string}>({ status: 'idle' })

  const handleDownload = async () => {
    if (!downloadVersion) return
    setDownloadState({ status: 'loading', message: `Downloading ${downloadVersion}...` })
    try {
      const result = await window.ipcRenderer.invoke('dev:download-version', downloadVersion)
      if (result.success) {
        setDownloadState({ status: 'success', message: `Downloaded ${result.count} files to ${result.path}` })
      } else {
        setDownloadState({ status: 'error', message: result.error || 'Download failed' })
      }
    } catch (err: any) {
      setDownloadState({ status: 'error', message: err.message })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex justify-center pt-24 pb-8 px-4 font-sans selection:bg-indigo-500/30">
      <div className="w-full max-w-2xl bg-neutral-800/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-neutral-700/50 flex flex-col transition-all duration-300 transform hover:shadow-indigo-500/10 hover:border-neutral-600/50 h-min">
        <div className="flex items-center px-4 py-3 border-b border-neutral-700/50 bg-neutral-800/50">
          <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none text-xl px-2 py-2 text-white placeholder-neutral-500 font-medium"
            placeholder="Search for apps, files, or commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {query && (
          <div className="p-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="text-xs font-semibold text-neutral-500 mb-2 mt-1 px-3 uppercase tracking-widest">
              Best Matches for "{query}"
            </div>
            <div className="space-y-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center p-3 rounded-xl hover:bg-indigo-500/10 cursor-pointer transition-all duration-200 group border border-transparent hover:border-indigo-500/20">
                  <div className="w-10 h-10 bg-neutral-700 text-indigo-400 rounded-lg flex items-center justify-center mr-4 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/20 transition-all duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white group-hover:text-indigo-50 transition-colors tracking-wide">
                      Example Result {i}
                    </div>
                    <div className="text-sm text-neutral-400 font-medium group-hover:text-indigo-200/70 transition-colors">
                      Application • /Applications/Example{i}.app
                    </div>
                  </div>
                  <div className="hidden group-hover:flex items-center text-xs text-indigo-300/80 mr-2 font-medium tracking-wide">
                    Press Enter to open
                    <kbd className="ml-2 px-2 py-1 bg-indigo-500/20 rounded-md text-indigo-200 grid place-items-center min-w-[1.5rem] border border-indigo-500/30">
                      ↵
                    </kbd>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!query && (
          <div className="px-4 py-12 text-center text-neutral-500 flex flex-col items-center">
            <div className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center mb-4 border border-neutral-700/50 shadow-inner">
              <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <p className="text-sm font-medium tracking-wide">Enter a query to start searching</p>
            <p className="text-xs text-neutral-600 mt-2">Find apps, files, perform calculations, and more</p>
          </div>
        )}

        {/* Dev Tools Section */}
        {import.meta.env.DEV && (
          <div className="border-t border-indigo-500/30 bg-indigo-500/5 p-4 flex flex-col items-center">
            <div className="text-xs font-bold text-indigo-400 mb-3 uppercase tracking-wider w-full">Dev Tools: Test Downloader</div>
            <div className="flex w-full space-x-2">
              <input
                type="text"
                placeholder="Version ID (e.g. 1.20.1)"
                className="flex-1 bg-neutral-900/80 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500 transition-colors"
                value={downloadVersion}
                onChange={(e) => setDownloadVersion(e.target.value)}
              />
              <button
                disabled={downloadState.status === 'loading'}
                onClick={handleDownload}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloadState.status === 'loading' ? 'Downloading...' : 'Download'}
              </button>
            </div>
            {downloadState.status !== 'idle' && (
              <div className={`mt-3 text-xs w-full p-2 rounded border ${
                downloadState.status === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                downloadState.status === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                'bg-blue-500/10 border-blue-500/30 text-blue-400'
              }`}>
                {downloadState.message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
