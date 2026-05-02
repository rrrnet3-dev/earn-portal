// app/task/[id]/page.js
'use client'
import { useRouter, useParams } from 'next/navigation'
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa'
import { getDailyTasks } from '@/lib/tasks'

export default function TaskPage() {
  const router = useRouter()
  const params = useParams()
  const taskId = parseInt(params.id)
  
  // Get today's 20 rotated tasks
  const dailyTasks = getDailyTasks()
  // Find the task with id 1-20
  const task = dailyTasks.find(t => t.id === taskId)

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 mb-4 text-blue-400">
          <FaArrowLeft /> Back
        </button>
        <div className="text-center mt-20">
          <h1 className="text-2xl font-bold">Task not found</h1>
          <p className="text-gray-400 mt-2">This task may have rotated out. Check today's tasks.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <button onClick={() => router.back()} className="flex items-center gap-2 mb-6 text-blue-400">
        <FaArrowLeft /> Back to Tasks
      </button>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold">{task.name}</h1>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              + Rs. {task.reward}
            </span>
          </div>
          
          <p className="text-gray-300 mb-6">
            Complete this task to earn your reward. The task will be available again after the cooldown period.
          </p>

          <a
            href={task.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
          >
            Start Task <FaExternalLinkAlt />
          </a>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            Link opens in new tab. Return here after completion.
          </p>
        </div>
      </div>
    </div>
  )
}