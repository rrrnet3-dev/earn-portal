'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'

const TASK_DATA = {
  1: { type: 'article', title: 'Read Article 1', content: 'This is article content about earning rewards. Read for 5 minutes to understand the basics of our platform. Complete this to earn 5 rewards and level up your rank.', duration: '5 min read' },
  2: { type: 'video', title: 'Watch Video 1', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '30s video' },
  3: { type: 'article', title: 'Read Article 2', content: 'Advanced tips for maximizing your daily earnings. Learn how cooldowns work and how to reach Legendary Star faster.', duration: '3 min read' },
  4: { type: 'video', title: 'Watch Video 2', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '60s video' },
  5: { type: 'survey', title: 'Take Survey 1', questions: ['How did you find Earn Easy Rewards?', 'How often will you use the app?', 'Rate your experience 1-5'] },
  6: { type: 'action', title: 'View Tips', content: 'Tip 1: Complete tasks every 2 hours. Tip 2: Your rank persists across days. Tip 3: Midnight resets all cooldowns.', actionText: 'I Read The Tips' },
  7: { type: 'action', title: 'Share App', content: 'Share Earn Easy Rewards with a friend to help them start earning too.', actionText: 'I Shared The App' },
  8: { type: 'action', title: 'Daily Check-in', content: 'Thanks for logging in today! Claim your daily bonus.', actionText: 'Claim Bonus' },
  9: { type: 'video', title: 'Watch Video 3', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '45s video' },
  10: { type: 'article', title: 'Read Guide', content: 'Complete guide to understanding the 21 rank system from Intern to Legendary Star.', duration: '3 min read' },
  11: { type: 'article', title: 'Read Article 3', content: 'Industry insights on reward platforms and how Earn Easy compares.', duration: '4 min read' },
  12: { type: 'video', title: 'Watch Video 4', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '90s video' },
  13: { type: 'survey', title: 'Complete Quiz', questions: ['What rank comes after Manager?', 'How many tasks available per day?', 'What is the max rank?'] },
  14: { type: 'action', title: 'Rate App', content: 'Enjoying Earn Easy Rewards? Leave us a 5-star review on the app store!', actionText: 'I Rated The App' },
  15: { type: 'action', title: 'Follow Social', content: 'Follow us on social media for bonus codes and updates.', actionText: 'I Followed' },
  16: { type: 'video', title: 'Watch Video 5', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '2 min video' },
  17: { type: 'article', title: 'Read News', content: 'Latest updates: New Legendary Star rank added. 2-hour cooldown system live.', duration: '3 min read' },
  18: { type: 'survey', title: 'Take Survey 2', questions: ['What feature do you want next?', 'Would you pay for premium?', 'Any bugs found?'] },
  19: { type: 'action', title: 'Invite Friend', content: 'Send your unique invite link to a friend to earn bonus rewards.', actionText: 'I Sent Invite' },
  20: { type: 'action', title: 'Daily Bonus', content: 'Claim your final daily bonus! You are on your way to Legendary Star.', actionText: 'Claim Final Bonus' }
}

export default function TaskPage() {
  const router = useRouter()
  const params = useParams()
  const taskId = parseInt(params.id)
  const task = TASK_DATA[taskId]
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(null)
  const [surveyAnswers, setSurveyAnswers] = useState({})

  useEffect(() => {
    const savedTheme = localStorage.getItem('earnEasyTheme')
    const savedUser = localStorage.getItem('earnEasyUser')
    if (savedTheme === 'dark') setDarkMode(true)
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  if (!task) return <div className="p-4">Task not found</div>
  if (!user) return <div className="p-4">Loading...</div>

  const TASK_COOLDOWN_HOURS = 2
  const COOLDOWN_MS = TASK_COOLDOWN_HOURS * 60 * 60 * 1000
  const completedAt = user.taskCompletionTimes?.[taskId]
  const isOnCooldown = completedAt && (Date.now() - new Date(completedAt).getTime()) < COOLDOWN_MS

  const completeTask = () => {
    if (isOnCooldown) return
    const currentMonth = new Date().toISOString().slice(0, 7)
    const newLifetimeTotal = (user.lifetimeTasksCompleted || 0) + 1

    const updatedUser = {
    ...user,
      availableRewards: (user.availableRewards || 0) + 5,
      taskCompletionTimes: {
      ...user.taskCompletionTimes,
        [taskId]: new Date().toISOString()
      },
      lifetimeTasksCompleted: newLifetimeTotal,
      cumulativeEarned: (user.cumulativeEarned || 0) + 5,
      monthlyEarned: {
      ...user.monthlyEarned,
        [currentMonth]: (user.monthlyEarned?.[currentMonth] || 0) + 5
      }
    }
    localStorage.setItem('earnEasyUser', JSON.stringify(updatedUser))
    router.push('/')
  }

  return (
    <div className={`min-h-screen ${darkMode? 'bg-gray-950' : 'bg-gray-50'} p-4`}>
      <div className="max-w-md mx-auto">
        <button onClick={() => router.push('/')} className={`mb-4 flex items-center gap-2 ${darkMode? 'text-gray-200' : 'text-gray-700'}`}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <div className={`${darkMode? 'bg-gray-900 border-gray-600' : 'bg-white'} p-6 rounded-xl shadow-sm border`}>
          <h1 className={`text-2xl font-bold mb-2 ${darkMode? 'text-gray-100' : 'text-gray-900'}`}>{task.title}</h1>
          <p className={`text-sm mb-4 ${darkMode? 'text-gray-300' : 'text-gray-600'}`}>Reward: +5 | {task.duration || task.type}</p>

          {task.type === 'article' && <div className={`${darkMode? 'text-gray-200' : 'text-gray-700'} mb-6 leading-relaxed`}>{task.content}</div>}
          {task.type === 'video' && <video src={task.videoUrl} controls className="w-full rounded-lg mb-6" onEnded={completeTask} />}
          {task.type === 'survey' && task.questions.map((q, i) => (
            <div key={i} className="mb-4">
              <p className={`mb-2 ${darkMode? 'text-gray-200' : 'text-gray-700'}`}>{i+1}. {q}</p>
              <input type="text" onChange={(e) => setSurveyAnswers({...surveyAnswers, [i]: e.target.value})} className={`w-full p-2 rounded border ${darkMode? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300'}`} placeholder="Your answer" />
            </div>
          ))}
          {task.type === 'action' && <div className={`${darkMode? 'text-gray-200' : 'text-gray-700'} mb-6`}>{task.content}</div>}

          <button
            onClick={completeTask}
            disabled={isOnCooldown || (task.type==='survey' && Object.keys(surveyAnswers).length!== task.questions?.length)}
            className={`w-full py-3 rounded-lg font-bold ${isOnCooldown? 'bg-green-600 text-white' : 'bg-blue-600 text-white active:bg-blue-700 disabled:bg-gray-400'}`}
          >
            {isOnCooldown? <><FaCheck className="inline mr-2" />On Cooldown</> : task.actionText || 'Complete Task'}
          </button>
        </div>
      </div>
    </div>
  )
}