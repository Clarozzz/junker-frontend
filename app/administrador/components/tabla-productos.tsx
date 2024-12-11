'use client'

import Pagination from "@/components/ui/pagination";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import { getProductos } from "@/app/api/productos";
// import ButtonMoreDataTable from "@/components/ui/button-table";
// import { Button } from "@/components/ui/button";
// import { EllipsisVerticalIcon, LinkIcon } from "lucide-react";

export default function DataTableProductos ({
    categoria = null,
    precio_min = 0,
    precio_max = 0,
    estado = null,
    searchQuery = "",
    ordenPrecio = null,
  }: ProductosVistaProps) {
    const [productos, setProductos] = useState<ProductoVista[]>([]);
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(8);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);


  const fetchProductos = useCallback(async () => {
    try {
      const data: ProductosResponse = await getProductos(
        currentPage,
        itemsPerPage,
        categoria,
        precio_min,
        precio_max,
        estado,
        searchQuery,
        ordenPrecio
      );

      if (data && data.items) {
        setProductos(data.items);
        setTotalItems(data.total);
        setTotalPages(data.total_pages);  // Use the backend-provided total_pages
      } else {
        console.error("No se recibieron productos o hay un error en la estructura de datos.");
        setProductos([]);
        setTotalItems(0);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setProductos([]);
      setTotalItems(0);
      setTotalPages(0);
    }
  }, [
    currentPage,
    itemsPerPage,
    categoria,
    precio_min,
    precio_max,
    estado,
    searchQuery,
    ordenPrecio
  ]);

  // Add a useEffect to reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoria, precio_min, precio_max, estado, searchQuery, ordenPrecio]);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  // Optional: Add method to change items per page
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);  // Reset to first page
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const formatCurrency = (value: number): string =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });


  return (
    <div className='flex flex-col my-4'>
      <div className='-m-1.5 overflow-x-auto'>
        <div className='p-1.5 min-w-full inline-block align-middle'>
          <div className='border rounded-lg overflow-hidden dark:border-gray-700'>
            <Table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
              <TableHeader>
                <TableRow>
                  <TableHead
                    scope='col'
                    className='px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400  uppercase'
                  >
                    Nombre
                  </TableHead>
                  <TableHead
                    scope='col'
                    className='px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400 uppercase'
                  >
                    Precio
                  </TableHead>
                  <TableHead
                    scope='col'
                    className='px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400 uppercase'
                  >
                    Categoria
                  </TableHead>
                  <TableHead
                    scope='col'
                    className='px-6 py-3 text-start text-xs font-medium text-gray-600 dark:text-gray-400 uppercase'
                  >
                    Estado
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productos.length === 0 ? (
                  <TableRow>
                    <TableHead colSpan={5} className=''>
                      <div className='w-full flex flex-col justify-center items-center p-4 gap-2'>
                        <div className='rounded-full stroke-neutral-600 dark:stroke-slate-600 bg-neutral-200 dark:bg-slate-900 p-4'>
                          <svg
                            className='w-16 h-16'
                            viewBox='0 0 28 28'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            ></path>
                            <path
                              d='M17 16L22 21M22 16L17 21'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            ></path>
                          </svg>
                        </div>
                        <span className='text-neutral-500 dark:text-slate-600'>
                          No se encontraron productos
                        </span>
                      </div>
                    </TableHead>
                  </TableRow>
                ) : (
                  productos?.map((producto) => (
                    <TableRow
                      key={producto.id}
                      className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                    >
                      <TableCell className='whitespace-nowrap py-3 pl-6 pr-3'>
                        <div className='flex items-center gap-3'>
                          <Image
                            width={100}
                            height={100}
                            src={
                              producto.imagen_url ??
                              'https://leplanb.lesmontagne.net/wp-content/uploads/sites/5/2017/06/default_avatar.png'
                            }
                            className='rounded-full w-6 h-6 object-cover'
                            alt={`Fotografia perfil de ${producto.nombre}`}
                          />
                          <Link
                            href={`${pathname}/${producto.id}`}
                            className=' whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200'
                          >
                            {producto.nombre}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className='whitespace-nowrap px-3 py-3'>
                        Lps.{" "}
                          {formatCurrency(
                            producto.precio
                            )}
                      </TableCell>
                      <TableCell className='whitespace-nowrap px-3 py-3'>
                        {producto.categoria && producto.categoria.trim() !== '' ? producto.categoria : 'No disponible'}
                      </TableCell>
                      <TableCell className='whitespace-nowrap px-3 py-3'>
                        <span
                          className={`capitalize px-2 py-1 rounded-md
                          ${
                            producto.estado_producto === 'Nuevo'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-500'
                              : producto.estado_producto === 'Usado'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500'
                              : producto.estado_producto === 'no disponible'
                              ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500'
                              : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-500'
                          }
                        `}
                        >
                          {producto.estado_producto ?? 'No disponible'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {/* <ButtonMoreDataTable
                          className='flex flex-col max-w-[180px] p-1 mr-10 '
                          trigger={
                            <Button
                              size={'icon'}
                              variant={'ghost'}
                              onClick={() => {
                                setPersonaSeleccionada(usuarios)
                              }}
                            >
                              <EllipsisVerticalIcon className='h-5 w-5 text-gray-500' />
                            </Button>
                          }
                        >
                          <Button
                            asChild
                            variant={'ghost'}
                            className='justify-start font-normal'
                          >
                            <Link href={`${pathname}/${usuario.id}`}>
                              <LinkIcon className='h-4 w-4 mr-1' />
                              Ver perfil
                            </Link>
                          </Button>
                          <ModalPreclinica persona={personaSeleccionada} />

                            <>
                              <ModalAgregarRolEspecializacion
                                persona={personaSeleccionada}
                              />

                              <AlertModalDeleteUser
                                persona={personaSeleccionada}
                              />
                            </>

                        </ButtonMoreDataTable> */}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {productos.length > 0 && (
              <div className="my-2 flex w-full justify-center">
                <Pagination 
                    totalPages={totalPages} 
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    totalItems={totalItems}  
                    itemsPerPage={itemsPerPage} 
                    onItemsPerPageChange={handleItemsPerPageChange} 
                />
              </div>
          )}                 
          </div>
        </div>
      </div>
    </div>
  )
}
