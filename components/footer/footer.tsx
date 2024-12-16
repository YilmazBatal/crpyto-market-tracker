
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full mt-12">
      <div className="container mx-auto px-4">
        <div className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">CryptoTracker</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Stay updated with the latest crypto trends</p>
            </div>
            <div className="flex space-x-4">
              <Link href="https://github.com" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors">
                <ChevronDown className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://twitter.com" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors">
                <ChevronDown className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} CryptoTracker. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

