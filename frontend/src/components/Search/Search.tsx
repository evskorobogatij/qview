import React, { useCallback } from 'react'
import { useStore, useEvent } from 'effector-react'
import { $search, searchChanged } from '../../models/search'

export const Search = (): JSX.Element => {
  const search = useStore($search)
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
              className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            >
              Search
            </button> */}
          </div>
        </form>
      </div>
    </>
  )
}
