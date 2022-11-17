import React, { useCallback } from 'react'
import { useStore, useEvent } from 'effector-react'
import { $search, $searching, searchChanged } from '../../models/search'

export const Search = (): JSX.Element => {
  const search = useStore($search)
  const searching = useStore($searching)
  const handleSearch = useEvent(searchChanged)

  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSearch(e.target.value)
    },
    [handleSearch]
  )

  return (
    <>
      <div className="m-2 max-w-full">
        <form>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type={'search'}
              value={search}
              onChange={onSearchChange}
              className={
                'ring-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-sm text-gray-900 ring-offset-1 focus:border-blue-500 focus:ring-blue-500 focus-visible:outline-none active:border-blue-500'
              }
              placeholder={
                'Введите имя компьтера, серийный номер, IP-адрес или имя пользователя'
              }
            />

            {/* <input type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required> */}
            {/* <button
              type="submit"
              className="absolute right-2.5 h-5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            >
              Search
            </button> */}
            {searching && (
              <div className="absolute right-5 bottom-3">
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  )
}
