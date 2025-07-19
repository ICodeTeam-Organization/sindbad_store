import { Store } from '@/types/storeTypes'
import Image from 'next/image'
import React from 'react'

function StoreSectionDetails({store}:{store:Store|null}) {
  return (
    <div>
        <div>
            <Image  width={50} height={50} alt='' src={store?.mainImageUrl ?? store?.imagesUrl[0] ?? ""} />
            <p>
                {/* {store?.name} */}
            </p>
        </div>
    </div>
  )
}

export default StoreSectionDetails