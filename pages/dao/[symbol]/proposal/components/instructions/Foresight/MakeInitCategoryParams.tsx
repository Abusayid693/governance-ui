/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { ForesightHasCategoryId } from '@utils/uiTypes/proposalCreationTypes'
import { Governance } from '@solana/spl-governance'
import { ProgramAccount } from '@solana/spl-governance'
import {
  governance as foresightGov,
  consts as foresightConsts,
} from '@foresight-tmp/foresight-sdk'
import { commonAssets, ForesightCategoryIdInput } from '@utils/Foresight'
import { PublicKey } from '@solana/web3.js'

const MakeInitCategoryParams = ({
  index,
  governance,
}: {
  index: number
  governance: ProgramAccount<Governance> | null
}) => {
  const {
    inputProps,
    effector,
    governedAccountSelect,
    wallet,
  } = commonAssets<ForesightHasCategoryId>(
    { categoryId: '' },
    index,
    governance
  )
  async function ixCreator(form: ForesightHasCategoryId) {
    const { ix } = await foresightGov.genInitCategoryIx(
      Buffer.from(form.categoryId.padEnd(20)),
      new PublicKey(foresightConsts.DEVNET_PID),
      wallet!.publicKey!
    )
    return ix
  }
  effector(ixCreator)
  return (
    <>
      {governedAccountSelect}
      <ForesightCategoryIdInput {...inputProps} />
    </>
  )
}

export default MakeInitCategoryParams
