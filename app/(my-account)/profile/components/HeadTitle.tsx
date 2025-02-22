import React from 'react'
import {HeadTitleProps} from "../types"

const HeadTitle: React.FC<HeadTitleProps> = ({title,description}) => {
  return (
    <div className="col-span-2">
    <h2 className="text-lg font-medium text-right text-gray-700">
       {title}
    </h2>
    <p className="text-right text-sm text-gray-500">
        {description}
    </p>
  </div>
  )
}

export default HeadTitle