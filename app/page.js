'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaHome, FaInfoCircle, FaUserFriends, FaUser, FaCoins, FaBook, FaVideo, FaLink, FaCheck, FaArrowLeft, FaShare, FaTimes, FaSun, FaMoon } from 'react-icons/fa'

export default function EarnEasyRewards() {
  const [user, setUser] = useState({
    availableRewards: 0,
    performedTaskIds: [],
    lastActiveDate: '',
    joinDate: '',
    monthlyEarned: {},
    cumulativeEarned: 0,
    lifetimeTasksCompleted: 0
  })
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedUser = localStorage.getItem('earnEasyUser')
    const savedTheme = localStorage.getItem('earnEasyTheme')

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      const today = new Date().toDateString()
      const newUser = {
        availableRewards: 0,
        performedTaskIds: [],
        lastActiveDate: today,
        joinDate: today,
        monthlyEarned: {},
        cumulativeEarned: 0,
        lifetimeTasksCompleted: 0
      }
      setUser(newUser)
      localStorage.setItem('earnEasyUser', JSON.stringify(newUser))
    }

    if (savedTheme === 'dark') {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('earnEasyTheme', darkMode? 'dark' : 'light')
    }
  }, [darkMode, mounted])

  const tasks = [
    { id: 1, name: 'Task 1 - Read Article 1', desc: '5 min read', rewards: 5 },
    { id: 2, name: 'Task 2 - Watch Video 1', desc: '30s video', rewards: 5 },
    { id: 3, name: 'Task 3 - Read Article 2', desc: '3 min read', rewards: 5 },
    { id: 4, name: 'Task 4 - Watch Video 2', desc: '60s video', rewards: 5 },
    { id: 5, name: 'Task 5 - Take Survey 1', desc: '2 min survey', rewards: 5 },
    { id: 6, name: 'Task 6 - View Tips', desc: '5 tips', rewards: 5 },
    { id: 7, name: 'Task 7 - Share App', desc: 'Share with friend', rewards: 5 },
    { id: 8, name: 'Task 8 - Daily Check-in', desc: 'Login bonus', rewards: 5 },
    { id: 9, name: 'Task 9 - Watch Video 3', desc: '45s video', rewards: 5 },
    { id: 10, name: 'Task 10 - Read Guide', desc: '3 min read', rewards: 5 },
    { id: 11, name: 'Task 11 - Read Article 3', desc: '4 min read', rewards: 5 },
    { id: 12, name: 'Task 12 - Watch Video 4', desc: '90s video', rewards: 5 },
    { id: 13, name: 'Task 13 - Complete Quiz', desc: '5 questions', rewards: 5 },
    { id: 14, name: 'Task 14 - Rate App', desc: 'Leave review', rewards: 5 },
    { id: 15, name: 'Task 15 - Follow Social', desc: 'Follow us', rewards: 5 },
    { id: 16, name: 'Task 16 - Watch Video 5', desc: '2 min video', rewards: 5 },
    { id: 17, name: 'Task 17 - Read News', desc: '3 min read', rewards: 5 },
    { id: 18, name: 'Task 18 - Take Survey 2', desc: '3 min survey', rewards: 5 },
    { id: 19, name: 'Task 19 - Invite Friend', desc: 'Send invite', rewards: 5 },
    { id: 20, name: 'Task 20 - Daily Bonus', desc: 'Claim bonus', rewards: 5 }
  ]

  const MAX_TASKS_PER_DAY = 20
  const MONTHLY_ELIGIBLE = 100000

  useEffect(() => {
    if (!mounted) return
    const today = new Date().toDateString()
    if (user.lastActiveDate && user.lastActiveDate!== today) {
      const resetUser = {
     ...user,
        performedTaskIds: [],
        lastActiveDate: today
      }
      setUser(resetUser)
      localStorage.setItem('earnEasyUser', JSON.stringify(resetUser))
    }
  }, [mounted, user])

  if (!mounted) {
    return <div className={`min-h-screen ${darkMode? 'bg-gray-950' : 'bg-gray-50'} flex items-center justify-center`}>
      <p className={darkMode? 'text-gray-200' : 'text-gray-900'}>Loading...</p>
    </div>
  }

  const currentMonth = new Date().toISOString().slice(0, 7)
  const rewardsEarnedToday = tasks
.filter(task => user.performedTaskIds?.includes(task.id))
.reduce((sum, task) => sum + task.rewards, 0)

  const totalRewardsEarnedThisMonth = user.monthlyEarned?.[currentMonth] || 0
  const cumulativeRewardsEarned = user.cumulativeEarned || 0
  const tasksPerformed = user.performedTaskIds.length
  const balanceTasks = MAX_TASKS_PER_DAY - tasksPerformed

  const completeTask = (taskId, rewardAmount) => {
    if (user.performedTaskIds.includes(taskId) || balanceTasks <= 0) return

    const updatedUser = {
   ...user,
      availableRewards: (user.availableRewards || 0) + rewardAmount,
      performedTaskIds: [...user.performedTaskIds, taskId],
      lifetimeTasksCompleted: (user.lifetimeTasksCompleted || 0) + 1,
      cumulativeEarned: (user.cumulativeEarned || 0) + rewardAmount,
      monthlyEarned: {
     ...user.monthlyEarned,
        [currentMonth]: (user.monthlyEarned?.[currentMonth] || 0) + rewardAmount
      }
    }
    setUser(updatedUser)
    localStorage.setItem('earnEasyUser', JSON.stringify(updatedUser))
  }

  const toggleTheme = () => setDarkMode(!darkMode)

  return (
    <div className={`min-h-screen ${darkMode? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-md mx-auto p-4 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${darkMode? 'text-blue-400' : 'text-blue-600'}`}>
            Earn Easy Rewards
          </h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${darkMode? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {darkMode? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className={`${darkMode? 'bg-gray-900 border border-gray-600' : 'bg-white'} p-3 rounded-xl shadow-sm`}>
            <span className={`inline-block text-xs font-medium px-2 py-1 rounded-md mb-2 ${darkMode? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
              Eligible/Month
            </span>
            <p className={`text-xl font-bold ${darkMode? 'text-blue-400' : 'text-blue-600'}`}>{MONTHLY_ELIGIBLE}</p>
          </div>
          <div className={`${darkMode? 'bg-gray-900 border border-gray-600' : 'bg-white'} p-3 rounded-xl shadow-sm`}>
            <span className={`inline-block text-xs font-medium px-2 py-1 rounded-md mb-2 ${darkMode? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'}`}>
              Earned Today
            </span>
            <p className="text-xl font-bold text-green-400">{rewardsEarnedToday}</p>
          </div>
          <div className={`${darkMode? 'bg-gray-900 border border-gray-600' : 'bg-white'} p-3 rounded-xl shadow-sm`}>
            <span className={`inline-block text-xs font-medium px-2 py-1 rounded-md mb-2 ${darkMode? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
              This Month
            </span>
            <p className={`text-xl font-bold ${darkMode? 'text-gray-100' : 'text-gray-900'}`}>{totalRewardsEarnedThisMonth}</p>
          </div>
          <div className={`${darkMode? 'bg-gray-900 border border-gray-600' : 'bg-white'} p-3 rounded-xl shadow-sm`}>
            <span className={`inline-block text-xs font-medium px-2 py-1 rounded-md mb-2 ${darkMode? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
              Total Since Join
            </span>
            <p className={`text-xl font-bold ${darkMode? 'text-gray-100' : 'text-gray-900'}`}>{cumulativeRewardsEarned}</p>
          </div>
        </div>

        <div className={`${darkMode? 'bg-blue-900/40 border border-blue-700' : 'bg-blue-50'} p-3 rounded-xl mb-4 text-center`}>
          <p className={`text-sm ${darkMode? 'text-gray-200' : 'text-gray-600'}`}>
            Tasks Today: <span className="font-bold">{tasksPerformed}/{MAX_TASKS_PER_DAY}</span>
          </p>
          <p className={`text-xs ${darkMode? 'text-gray-200' : 'text-gray-500'} mt-1`}>
            Lifetime Tasks: {user.lifetimeTasksCompleted}
          </p>
        </div>

        <h2 className={`text-lg font-bold mb-3 ${darkMode? 'text-gray-100' : 'text-gray-900'}`}>Today's Tasks</h2>
        <div className="grid grid-cols-2 gap-3">
          {tasks.map(task => {
            const isDone = user.performedTaskIds.includes(task.id)
            const canDo =!isDone && balanceTasks > 0

            return (
              <div key={task.id} className={`${darkMode? 'bg-gray-900 border border-gray-600' : 'bg-white'} p-3 rounded-xl shadow-sm ${isDone? 'opacity-70' : ''}`}>
                <div className="mb-2">
                  <h3 className={`font-semibold text-sm leading-tight mb-1 ${darkMode? 'text-gray-50' : 'text-gray-900'}`}>{task.name}</h3>
                  <p className={`text-xs ${darkMode? 'text-gray-200' : 'text-gray-500'}`}>{task.desc}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-400 font-bold text-sm">+{task.rewards} Rewards</span>
                </div>

                {isDone? (
                  <button disabled className={`w-full ${darkMode? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-500'} py-2 rounded-lg text-xs font-bold`}>
                    Done Today
                  </button>
                ) : (
                  <button
                    onClick={() => completeTask(task.id, task.rewards)}
                    disabled={!canDo}
                    className={`w-full py-2 rounded-lg text-xs font-bold ${
                      canDo? 'bg-blue-600 text-white active:bg-blue-700' : darkMode? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-500'
                    }`}
                  >
                    Complete
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}