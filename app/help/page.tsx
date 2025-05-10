export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-200 animate-gradient-x py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-primary">Help & Instructions</h1>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-4 border-purple-300">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">How to Use LetterPlay</h2>
                <div className="bg-blue-100 p-6 rounded-xl border-2 border-blue-300">
                  <p className="text-lg mb-4">
                    LetterPlay helps you learn to write Devanagari letters in a fun and interactive way!
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        1
                      </div>
                      <p className="text-lg">
                        Choose between <strong>Practice Mode</strong> to learn step by step, or{" "}
                        <strong>Custom Mode</strong> to practice specific letters.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        2
                      </div>
                      <p className="text-lg">Look at the reference letter and try to draw it in the drawing area.</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        3
                      </div>
                      <p className="text-lg">
                        Click the <strong>Help</strong> button to see an animation of how to draw the letter.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        4
                      </div>
                      <p className="text-lg">
                        Click <strong>Check</strong> to see if your drawing is correct!
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">Button Guide</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-pink-100 p-4 rounded-xl border-2 border-pink-300">
                    <h3 className="font-bold text-lg mb-2">Practice Mode Buttons</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm">Previous</div>
                        <span>Go to the previous letter</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="bg-green-500 text-white rounded-full px-3 py-1 text-sm">Next</div>
                        <span>Go to the next letter</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="bg-yellow-500 text-white rounded-full px-3 py-1 text-sm">Help</div>
                        <span>Show how to draw the letter</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-yellow-100 p-4 rounded-xl border-2 border-yellow-300">
                    <h3 className="font-bold text-lg mb-2">Drawing Buttons</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="bg-red-500 text-white rounded-full px-3 py-1 text-sm">Clear</div>
                        <span>Erase your drawing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="bg-secondary text-white rounded-full px-3 py-1 text-sm">Check</div>
                        <span>Check if your drawing is correct</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">Tips for Success</h2>
                <div className="bg-green-100 p-6 rounded-xl border-2 border-green-300">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">✨</span>
                      <p>Draw the letter as large as possible in the drawing area</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">✨</span>
                      <p>Use the Help button to see how to draw each stroke</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">✨</span>
                      <p>Practice each letter multiple times</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">✨</span>
                      <p>Try to match the shape of the reference letter as closely as possible</p>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

