import React from 'react'

interface CardItemProps {
  item: {
    id: number
    name: string
  }
}

export default function CardItem({ item }: CardItemProps) {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition">
      <h2 className="font-bold text-lg">{item.name}</h2>
    </div>
  )
}
