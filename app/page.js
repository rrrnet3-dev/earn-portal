'use client'
import { useState, useEffect } from 'react'

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

  useEffect(() => {
    setMounted(true)
    const savedUser = localStorage.getItem('earnEasyUser')
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
  }, [])

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
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-4 pb-20">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Earn Easy Rewards</h1>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Eligible/Month</p>
            <p className="text-xl font-bold text-blue-600">{MONTHLY_ELIGIBLE}</p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Earned Today</p>
            <p className="text-xl font-bold text-green-600">{rewardsEarnedToday}</p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <p className="text-xs text-gray-500 mb-1">This Month</p>
            <p className="text-xl font-bold">{totalRewardsEarnedThisMonth}</p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Total Since Join</p>
            <p className="text-xl font-bold">{cumulativeRewardsEarned}</p>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-xl mb-4 text-center">
          <p className="text-sm text-gray-600">
            Tasks Today: <span className="font-bold">{tasksPerformed}/{MAX_TASKS_PER_DAY}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Lifetime Tasks: {user.lifetimeTasksCompleted}
          </p>
        </div>

        <h2 className="text-lg font-bold mb-3">Today's Tasks</h2>
        <div className="grid grid-cols-2 gap-3">
          {tasks.map(task => {
            const isDone = user.performedTaskIds.includes(task.id)
            const canDo =!isDone && balanceTasks > 0

            return (
              <div key={task.id} className={`bg-white p-3 rounded-xl shadow-sm ${isDone? 'opacity-60' : ''}`}>
                <div className="mb-2">
                  <h3 className="font-semibold text-sm leading-tight mb-1">{task.name}</h3>
                  <p className="text-xs text-gray-500">{task.desc}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600 font-bold text-sm">+{task.rewards} Rewards</span>
                </div>

                {isDone? (
                  <button disabled className="w-full bg-gray-300 text-gray-500 py-2 rounded-lg text-xs font-bold">
                    Done Today
                  </button>
                ) : (
                  <button
                    onClick={() => completeTask(task.id, task.rewards)}
                    disabled={!canDo}
                    className={`w-full py-2 rounded-lg text-xs font-bold ${
                      canDo? 'bg-blue-600 text-white active:bg-blue-700' : 'bg-gray-300 text-gray-500'
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