'use client'

import { cn, generatePagination } from '@/lib/utils'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Pagination ({ 
    totalPages, 
    currentPage,
    onPageChange,
    totalItems,      
    itemsPerPage,    
    onItemsPerPageChange  
  }: { 
    totalPages: number, 
    currentPage: number,
    onPageChange: (page: number) => void,
    totalItems?: number,
    itemsPerPage?: number,
    onItemsPerPageChange?: (itemsPerPage: number) => void
  }) {
    // Remove the duplicate totalPages calculation
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams ?? '')
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
    }

    const handlePageChange = (page: number) => {
      // Call the provided onPageChange callback
      onPageChange(page);
      
      // Update the URL
      const pageUrl = createPageURL(page);
      router.push(pageUrl);
      router.refresh();
    }

    const allPages = generatePagination(currentPage, totalPages)

  return (
    <div className='flex flex-col items-center'>
      <div className='inline-flex'>
        <PaginationArrow
          direction='left'
          href={createPageURL(currentPage - 1)}
          onPageChange={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className='flex -space-x-px'>
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined

            if (index === 0) position = 'first'
            if (index === allPages.length - 1) position = 'last'
            if (allPages.length === 1) position = 'single'
            if (page === '...') position = 'middle'

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
                onPageChange={() => {
                  if (typeof page === 'number') {
                    handlePageChange(page)
                  }
                }}
              />
            )
          })}
        </div>

        <PaginationArrow
          direction='right'
          href={createPageURL(currentPage + 1)}
          onPageChange={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
      {onItemsPerPageChange && (
        <div className='pt-6 flex items-center space-x-2'>
          <label>Elementos por página:</label>
          <select 
            value={itemsPerPage} 
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className='border w-20 rounded cursor-pointer px-2 py-1'
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
          </select>
        </div>
      )}

      {/* Ver total de usuarios */}
      {totalItems !== undefined && (
        <div className='text-sm text-gray-500 mt-2'>
          Total de elementos: {totalItems}
        </div>
      )}
    </div>
  )
}

function PaginationNumber ({
  page,
  href,
  isActive,
  position,
  onPageChange
}: {
  page: number | string
  href: string
  position?: 'first' | 'last' | 'middle' | 'single'
  isActive: boolean
  onPageChange: () => void
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-custom-blue2 border-custom-blue2 text-white': isActive,
      'hover:bg-gray-100': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle'
    }
  )

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onPageChange();
      }}
      className={cn('rounded-none', className)}
    >
      {page}
    </Link>
  )
}

function PaginationArrow ({
  href,
  direction,
  isDisabled,
  onPageChange
}: {
  href: string
  direction: 'left' | 'right'
  isDisabled?: boolean
  onPageChange: () => void
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right'
    }
  )

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className='w-4' />
    ) : (
      <ArrowRightIcon className='w-4' />
    )

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link 
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onPageChange();
      }}
      className={className}
    >
      {icon}
    </Link>
  )
}

