"use client"
import UpdateBondDialog from '@/app/[country]/(my-account)/my-orders/components/UpdateBoundDialog';
import { useRouter } from 'next-nprogress-bar';
import React, { useState } from 'react'

function BtnUpdateBond({ orderId }: { orderId: number }) {
    const [openUpdateBondDialog, setopenUpdateBondDialog] = useState<boolean>(false);
    const router =  useRouter();
    return (
        <>
            <UpdateBondDialog
                open={openUpdateBondDialog}
                onOpenChange={() => { setopenUpdateBondDialog(false) }}
                orderId={orderId}
                onUpdateComplete={() => {
                    setopenUpdateBondDialog(false)
                    router.refresh()
                }}
            />
            <div
                className='p-1 px-2 bg-danger rounded-md shadow-sm text-white cursor-pointer'
                onClick={() => setopenUpdateBondDialog(true)}
            >

                <span> إدخال سند جديد </span>
            </div>
        </>
    )
}

export default BtnUpdateBond