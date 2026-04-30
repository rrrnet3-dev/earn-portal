'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaInfoCircle, FaUserFriends, FaUser, FaCoins, FaBook, FaVideo, FaLink, FaCheck, FaArrowLeft, FaShare, FaTimes, FaSun, FaMoon, FaUserGraduate, FaChalkboardTeacher, FaUserCheck, FaUserTie, FaBullhorn, FaAward, FaUsers, FaUserShield, FaUserNinja, FaMedal, FaTrophy, FaSitemap, FaChessRook, FaChessKnight, FaDraftingCompass, FaEye, FaLandmark, FaStar, FaCrown } from 'react-icons/fa'
import React from 'react'

export default function EarnEasyRewards() {
  const [user, setUser] = useState({
    availableRewards: 0,
    performedTaskIds: [],
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

  // 21-Level Designation System
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

  useEffect(() => {
    setMounted(true)
    const savedUser = localStorage.getItem('earnEasyUser')
    const savedTheme = localStorage.getItem('earnEasyTheme')

    if (savedUser) {
      const parsed = JSON.parse(savedUser)
      setUser({
       ...parsed,
        lifetimeTasksCompleted: parsed.lifetimeTasksCompleted || 0,
        highestLevelReached: parsed.highestLevelReached || 1
      })
    } else {
      const today = new Date().toDateString()
      const newUser = {
        availableRewards: 0,
        performedTaskIds: [],
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
  const currentLevel = getLevel(user.lifetimeTasksCompleted)
  const currentLevelData = getLevelData(currentLevel)
  const nextLevelData = getLevelData(currentLevel + 1)
  const nextLevelTasks = getTasksForNextLevel(currentLevel)
  const CurrentIcon = currentLevelData.icon

  const completeTask = (taskId, rewardAmount) => {
    if (user.performedTaskIds.includes(taskId) || balanceTasks <= 0) return

    const newLifetimeTotal = (user.lifetimeTasksCompleted || 0) + 1
    const newLevel = getLevel(newLifetimeTotal)
    const prevLevel = getLevel(user.lifetimeTasksCompleted || 0)

    const updatedUser = {
     ...user,
      availableRewards: (user.availableRewards || 0) + rewardAmount,
      performedTaskIds: [...user.performedTaskIds, taskId],
      lifetimeTasksCompleted: newLifetimeTotal,
      cumulativeEarned: (user.cumulativeEarned || 0) + rewardAmount,
      monthlyEarned: {
       ...user.monthlyEarned,
        [currentMonth]: (user.monthlyEarned?.[currentMonth] || 0) + rewardAmount
      },
      highestLevelReached: Math.max(user.highestLevelReached || 1, newLevel)
    }

    setUser(updatedUser)
    localStorage.setItem('earnEasyUser', JSON.stringify(updatedUser))

    if (newLevel > prevLevel && newLevel > (user.highestLevelReached || 1)) {
      const newLevelData = getLevelData(newLevel)
      const nextData = getLevelData(newLevel + 1)
      setLevelPopupData({
        level: newLevel,
        name: newLevelData.name,
        nextName: nextData.name,
        nextTasks: getTasksForNextLevel(newLevel)
      })
      setShowLevelPopup(true)
      setTimeout(() => setShowLevelPopup(false), 4000)
    }
  }

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
            Lifetime: {user.lifetimeTasksCompleted} | Rank: {currentLevelData.name}
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