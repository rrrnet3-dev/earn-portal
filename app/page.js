'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaHome, FaInfoCircle, FaUserFriends, FaUser, FaCoins, FaBookOpen } from 'react-icons/fa'

export default function Home() {
  const MAX_TASKS_PER_DAY = 10 // y: max tasks to perform per day
  const DAILY_COIN_ALLOWANCE = 100000 // coins available to earn per day

  const [user, setUser] = useState({
    availableCoins: DAILY_COIN_ALLOWANCE,
    performedTaskIds: [],
    lastResetDate: new Date().toDateString()
  })

  const [activeTab, setActiveTab] = useState('home')
  const [spentHistory, setSpentHistory] = useState([])

  useEffect(() => {
    const today = new Date().toDateString()
    const savedUser = localStorage.getItem('earnUser')
    const savedSpent = localStorage.getItem('spentHistory')

    if (savedUser) {
      const parsed = JSON.parse(savedUser)
      if (parsed.lastResetDate!== today) {
        setUser({
          availableCoins: DAILY_COIN_ALLOWANCE,
          performedTaskIds: [],
          lastResetDate: today
        })
        setSpentHistory([])
      } else {
        setUser(parsed)
        if (savedSpent) setSpentHistory(JSON.parse(savedSpent))
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('earnUser', JSON.stringify(user))
  }, )

  useEffect(() => {
    localStorage.setItem('spentHistory', JSON.stringify(spentHistory))
  }, [spentHistory])

  const tasks = [
    { id: 1, name: 'Read Article 1', desc: '5 min read', link: '/content/article-1', cost: 20 },
    { id: 2, name: 'Watch Video 1', desc: '30s video', link: '/content/video-1', cost: 35 },
    { id: 3, name: 'Quick Survey', desc: '2 questions', link: '/content/survey-1', cost: 15 },
    { id: 4, name: 'Read Article 2', desc: '3 min read', link: '/content/article-2', cost: 50 },
    { id: 5, name: 'View Gallery', desc: '10 images', link: '/content/gallery-1', cost: 25 },
    { id: 6, name: 'Watch Video 2', desc: '60s video', link: '/content/video-2', cost: 40 },
    { id: 7, name: 'Read News', desc: '2 min read', link: '/content/news-1', cost: 30 },
    { id: 8, name: 'Quick Poll', desc: '1 question', link: '/content/poll-1', cost: 20 },
    { id: 9, name: 'Read Article 3', desc: '4 min read', link: '/content/article-3', cost: 45 },
    { id: 10, name: 'View Tips', desc: '5 tips', link: '/content/tips-1', cost: 10 },
    { id: 11, name: 'Watch Video 3', desc: '45s video', link: '/content/video-3', cost: 60 },
    { id: 12, name: 'Read Guide', desc: '3 min read', link: '/content/guide-1', cost: 25 },
  ]

  const totalCoinsSpent = spentHistory.reduce((sum, c) => sum + c, 0)
  const balanceCoins = user.availableCoins - totalCoinsSpent
  const tasksPerformed = user.performedTaskIds.length
  const balanceTasks = MAX_TASKS_PER_DAY - tasksPerformed

  const canPerformTask = (task) => {
    const alreadyDone = user.performedTaskIds.includes(task.id)
    const hasCoins = balanceCoins >= task.cost
    const underLimit = balanceTasks > 0
    return!alreadyDone && hasCoins && underLimit
  }

  const performTask = (task) => {
    if (!canPerformTask(task)) {
      if (user.performedTaskIds.includes(task.id)) {
        alert('You already completed this task today!')
      } else if (balanceTasks <= 0) {
        alert('Daily task limit reached! Come back tomorrow.')
      } else {
        alert(`Not enough coins! Need ${task.cost} coins.`)
      }
      return
    }

    setUser(prev => ({
...prev,
      performedTaskIds: [...prev.performedTaskIds, task.id]
    }))

    setSpentHistory(prev => [...prev, task.cost])
    window.open(task.link, '_blank')
  }

  const navItems = [
    { key: 'home', label: 'Home', icon: <FaHome /> },
    { key: 'about', label: 'About', icon: <FaInfoCircle /> },
    { key: 'referral', label: 'Referral', icon: <FaUserFriends /> },
    { key: 'profile', label: 'Profile', icon: <FaUser /> },
  ]

  const StatBox = ({ label, value, highlight = false }) => (
    <div className={`bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-sm ${highlight? 'ring-2 ring-emerald-500' : ''}`}>
      <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 leading-tight">{label}</p>
      <p className="text-base sm:text-lg font-bold leading-tight">{value.toLocaleString('en-US')}</p>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <div className="bg-emerald-600 text-white px-3 sm:px-4 pt-4 sm:pt-6 pb-3 sm:pb-4 sticky top-0 z-10">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <FaCoins /> Earn Portal
        </h1>
        <p className="text-[11px] sm:text-xs opacity-90 mt-0.5">Complete content tasks to earn coins</p>
      </div>

      {/* Stat boxes: 2 cols on all screens, tighter on mobile */}
      <div className="px-3 sm:px-4 py-3 sm:py-4 grid grid-cols-2 gap-2 sm:gap-3">
        <StatBox label="1. Coins Available to Earn" value={DAILY_COIN_ALLOWANCE} highlight />
        <StatBox label="2. Avg Task Reward" value={Math.round(tasks.reduce((s,t) => s+t.cost, 0) / tasks.length)} />
        <StatBox label="3. Coins Earned Today" value={totalCoinsSpent} />
        <StatBox label="4. Balance Coins Available to Earn" value={balanceCoins} highlight />
        <StatBox label="5. Max Tasks to Perform Per Day" value={MAX_TASKS_PER_DAY} />
        <StatBox label="6. Tasks Completed" value={tasksPerformed} />
        <StatBox label="7. Tasks Remaining" value={balanceTasks} highlight />
        <StatBox label="8. Status" value={balanceTasks > 0? 'Active' : 'Limit Reached'} />
      </div>

      <div className="px-3 sm:px-4">
        <h2 className="text-base sm:text-lg font-bold mb-1">Available Tasks</h2>
        <p className="text-[11px] sm:text-xs text-gray-500 mb-2 sm:mb-3">Complete tasks once per day. Resets at midnight.</p>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {tasks.map(task => {
            const isDone = user.performedTaskIds.includes(task.id)
            const canDo = canPerformTask(task)

            return (
              <motion.button
                key={task.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => performTask(task)}
                disabled={!canDo}
                className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl font-semibold transition relative text-left min-h-[72px] sm:min-h-[80px] ${
                  isDone
           ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : canDo
             ? 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white shadow-md'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isDone && <span className="absolute top-1 right-1.5 text-[10px]">✓</span>}
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <FaBookOpen className="mt-0.5 flex-shrink-0 text-sm sm:text-base" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm leading-tight font-semibold">{task.name}</div>
                    <div className="text-[10px] sm:text-xs opacity-80 mt-0.5 leading-tight">{task.desc}</div>
                    <div className="text-[11px] sm:text-xs mt-1 flex items-center gap-1 font-bold">
                      <FaCoins className="text-yellow-300 flex-shrink-0" /> {task.cost}
                    </div>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom">
        <div className="flex justify-around py-1.5 sm:py-2">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex flex-col items-center gap-0.5 px-3 sm:px-4 py-1 min-w-[64px] ${
                activeTab === item.key? 'text-emerald-600' : 'text-gray-500'
              }`}
            >
              <div className="text-lg sm:text-xl">{item.icon}</div>
              <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab!== 'home' && (
        <div className="fixed inset-0 bg-white z-10 pt-16 sm:pt-20 flex items-center justify-center">
          <div className="text-center text-gray-500 px-4">
            <p className="text-xl sm:text-2xl font-bold mb-2">{navItems.find(i => i.key === activeTab)?.label}</p>
            <p className="text-sm">Coming in Day 18</p>
            <button onClick={() => setActiveTab('home')} className="mt-4 text-emerald-500 text-sm font-semibold">Back to Home</button>
          </div>
        </div>
      )}
    </main>
  )
}