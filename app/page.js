'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSun, FaMoon, FaUserGraduate, FaChalkboardTeacher, FaUserCheck, FaUser, FaUserTie, FaBullhorn, FaAward, FaUsers, FaUserShield, FaUserNinja, FaMedal, FaTrophy, FaSitemap, FaChessRook, FaChessKnight, FaDraftingCompass, FaEye, FaLandmark, FaStar, FaCrown, FaTimes } from 'react-icons/fa'
import React from 'react'
import { getDailyTasks } from '@/lib/tasks';

const TASK_COOLDOWN_HOURS = 2
const COOLDOWN_MS = TASK_COOLDOWN_HOURS * 60 * 60 * 1000

function CooldownTimer({ taskId, darkMode, getCooldownRemaining }) {
  const [remaining, setRemaining] = useState(getCooldownRemaining(taskId))

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getCooldownRemaining(taskId))
    }, 1000)
    return () => clearInterval(interval)
  }, [taskId, getCooldownRemaining])

  if (remaining <= 0) return null

  const hours = Math.floor(remaining / 3600000)
  const minutes = Math.floor((remaining % 3600000) / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)

  return (
    <div className={`text-xs ${darkMode? 'text-orange-400' : 'text-orange-600'} font-semibold mb-2`}>
      Cooldown: {hours}h {minutes}m {seconds}s
    </div>
  )
}

export default function EarnEasyRewards() {
  const [user, setUser] = useState({
    availableRewards: 0,
    taskCompletionTimes: {},
    lastActiveDate: '',
    joinDate: '',
    monthlyEarned: {},
    cumulativeEarned: 0,
    lifetimeTasksCompleted: 0,
    highestLevelReached: 0
  })
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showLevelPopup, setShowLevelPopup] = useState(false)
  const [levelPopupData, setLevelPopupData] = useState({ level: 0, name: '', nextName: '', nextTasks: 0 })

  const LEVELS = [
    { level: 1, name: 'Intern', icon: FaUserGraduate },
    { level: 2, name: 'Trainee', icon: FaChalkboardTeacher },
    { level: 3, name: 'Senior Trainee', icon: FaUserCheck },
    { level: 4, name: 'Associate', icon: FaUser },
    { level: 5, name: 'Senior Associate', icon: FaUserTie },
    { level: 6, name: 'Ambassador', icon: FaBullhorn },
    { level: 7, name: 'Senior Ambassador', icon: FaAward },
    { level: 8, name: 'Manager', icon: FaUsers },
    { level: 9, name: 'Senior Manager', icon: FaUserShield },
    { level: 10, name: 'Trainer', icon: FaUserNinja },
    { level: 11, name: 'Master', icon: FaMedal },
    { level: 12, name: 'Grand Master', icon: FaTrophy },
    { level: 13, name: 'Organiser', icon: FaSitemap },
    { level: 14, name: 'Chief Organiser', icon: FaChessRook },
    { level: 15, name: 'Strategist', icon: FaChessKnight },
    { level: 16, name: 'Architect', icon: FaDraftingCompass },
    { level: 17, name: 'Visionary', icon: FaEye },
    { level: 18, name: 'Director', icon: FaLandmark },
    { level: 19, name: 'Star Director', icon: FaStar },
    { level: 20, name: 'Legendary Director', icon: FaCrown },
    { level: 21, name: 'Legendary Star', icon: FaSun }
  ]

  const getLevel = (tasksCompleted) => {
    const level = Math.min(Math.floor(tasksCompleted) + 1, 21)
    return level
  }

  const getLevelData = (level) => LEVELS[level - 1] || LEVELS[0]

  const getTasksForNextLevel = (currentLevel) => {
    if (currentLevel >= 21) return 0
    return 1
  }

  const isTaskAvailable = (taskId) => {
    const completedAt = user.taskCompletionTimes?.[taskId]
    if (!completedAt) return true
    const elapsed = Date.now() - new Date(completedAt).getTime()
    return elapsed >= COOLDOWN_MS
  }

  const getTaskCooldownRemaining = (taskId) => {
    const completedAt = user.taskCompletionTimes?.[taskId]
    if (!completedAt) return 0
    const elapsed = Date.now() - new Date(completedAt).getTime()
    return Math.max(0, COOLDOWN_MS - elapsed)
  }

  useEffect(() => {
  setMounted(true)
  const savedUser = localStorage.getItem('earnEasyUser')
  const savedTheme = localStorage.getItem('earnEasyTheme')

  if (savedUser) {
    const parsed = JSON.parse(savedUser)
    if (parsed.performedTaskIds &&!parsed.taskCompletionTimes) {
      const migrated = {}
      const yesterday = new Date(Date.now() - COOLDOWN_MS).toISOString()
      parsed.performedTaskIds.forEach(id => { migrated[id] = yesterday })
      parsed.taskCompletionTimes = migrated
      delete parsed.performedTaskIds
    }

    // Check for level up on page load
    const currentLevel = getLevel(parsed.lifetimeTasksCompleted || 0)
    const oldHighest = parsed.highestLevelReached || 1

    if (currentLevel > oldHighest) {
      const newLevelData = getLevelData(currentLevel)
      const nextLevelData = getLevelData(currentLevel + 1)
      setLevelPopupData({
        level: currentLevel,
        name: newLevelData.name,
        nextName: nextLevelData.name,
        nextTasks: getTasksForNextLevel(currentLevel)
      })
      setShowLevelPopup(true)
      setTimeout(() => setShowLevelPopup(false), 3000)

      parsed.highestLevelReached = currentLevel
      localStorage.setItem('earnEasyUser', JSON.stringify(parsed))
    }

    setUser({
 ...parsed,
      taskCompletionTimes: parsed.taskCompletionTimes || {},
      lifetimeTasksCompleted: parsed.lifetimeTasksCompleted || 0,
      highestLevelReached: parsed.highestLevelReached || 1
    })
  } else {
    const today = new Date().toDateString()
    const newUser = {
      availableRewards: 0,
      taskCompletionTimes: {},
      lastActiveDate: today,
      joinDate: today,
      monthlyEarned: {},
      cumulativeEarned: 0,
      lifetimeTasksCompleted: 0,
      highestLevelReached: 1
    }
    setUser(newUser)
    localStorage.setItem('earnEasyUser', JSON.stringify(newUser))
  }

  if (savedTheme === 'dark') setDarkMode(true)
}, []) // <-- Make sure there's nothing after this line except a newline

  useEffect(() => {
    if (mounted) localStorage.setItem('earnEasyTheme', darkMode? 'dark' : 'light')
  }, [darkMode, mounted])

  const tasks = getDailyTasks();

  const MONTHLY_ELIGIBLE = 100000

  useEffect(() => {
    if (!mounted) return
    const today = new Date().toDateString()
    if (user.lastActiveDate && user.lastActiveDate!== today) {
      const resetUser = {
    ...user,
        taskCompletionTimes: {},
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
  const tasksAvailableNow = tasks.filter(task => isTaskAvailable(task.id)).length
  const totalRewardsEarnedThisMonth = user.monthlyEarned?.[currentMonth] || 0
  const cumulativeRewardsEarned = user.cumulativeEarned || 0
  const currentLevel = getLevel(user.lifetimeTasksCompleted)
  const currentLevelData = getLevelData(currentLevel)
  const CurrentIcon = currentLevelData.icon

  const toggleTheme = () => setDarkMode(!darkMode)

  return (
    <div className={`min-h-screen ${darkMode? 'bg-gray-950' : 'bg-gray-50'}`}>
      <AnimatePresence>
        {showLevelPopup && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md"
          >
            <div className={`${darkMode? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} border rounded-xl shadow-2xl p-4`}>
              <div className="flex items-center gap-3">
                <div className="text-3xl text-yellow-500">{React.createElement(getLevelData(levelPopupData.level).icon)}</div>
                <div className="flex-1">
                  <p className={`font-bold ${darkMode? 'text-gray-100' : 'text-gray-900'}`}>
                    Level {levelPopupData.level} Achieved: {levelPopupData.name}
                  </p>
                  {levelPopupData.nextTasks > 0 && (
                    <p className={`text-sm ${darkMode? 'text-gray-300' : 'text-gray-600'}`}>
                      {levelPopupData.nextTasks} more task{levelPopupData.nextTasks > 1? 's' : ''} to {levelPopupData.nextName}
                    </p>
                  )}
                  {levelPopupData.nextTasks === 0 && (
                    <p className="text-sm text-yellow-500 font-semibold">Max Rank: Legendary Star!</p>
                  )}
                </div>
                <button onClick={() => setShowLevelPopup(false)}>
                  <FaTimes className={darkMode? 'text-gray-400' : 'text-gray-500'} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md mx-auto p-4 pb-20">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h1 className={`text-3xl font-bold ${darkMode? 'text-blue-400' : 'text-blue-600'}`}>
              Earn Easy Rewards
            </h1>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${darkMode? 'bg-gray-800 border border-gray-600' : 'bg-white border'}`}>
              <CurrentIcon className={currentLevel >= 18? 'text-yellow-500' : darkMode? 'text-blue-400' : 'text-blue-600'} />
              <span className={`text-xs font-bold ${darkMode? 'text-gray-200' : 'text-gray-700'}`}>Lv.{currentLevel}</span>
            </div>
          </div>
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
              Available Now
            </span>
            <p className="text-xl font-bold text-green-400">{tasksAvailableNow}/20</p>
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
            Tasks reset every 2 hours | Daily reset at midnight
          </p>
          <p className={`text-xs ${darkMode? 'text-gray-200' : 'text-gray-500'} mt-1`}>
            Lifetime: {user.lifetimeTasksCompleted} | Rank: {currentLevelData.name}
          </p>
        </div>

        <h2 className={`text-lg font-bold mb-3 ${darkMode? 'text-gray-100' : 'text-gray-900'}`}>Tasks</h2>
        <div className="grid grid-cols-2 gap-3">
          {tasks.map(task => {
            const isAvailable = isTaskAvailable(task.id)

            return (
              <div key={task.id} className={`${darkMode? 'bg-gray-900 border border-gray-600' : 'bg-white'} p-3 rounded-xl shadow-sm ${!isAvailable? 'opacity-70' : ''}`}>
                <div className="mb-2">
                  <h3 className={`font-semibold text-sm leading-tight mb-1 ${darkMode? 'text-gray-50' : 'text-gray-900'}`}>{task.name}</h3>
                  <p className={`text-xs ${darkMode? 'text-gray-200' : 'text-gray-500'}`}>{task.desc}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-400 font-bold text-sm">+{task.rewards} Rewards</span>
                </div>

                {!isAvailable && <CooldownTimer taskId={task.id} darkMode={darkMode} getCooldownRemaining={getTaskCooldownRemaining} />}

                {isAvailable? (
                  <button
                    onClick={() => window.location.href = `/task/${task.id}`}
                    className="w-full py-2 rounded-lg text-xs font-bold bg-blue-600 text-white active:bg-blue-700"
                  >
                    Start Task
                  </button>
                ) : (
                  <button disabled className={`w-full ${darkMode? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-500'} py-2 rounded-lg text-xs font-bold`}>
                    Cooldown Active
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