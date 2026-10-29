package com.siersi.backend.service.sign

import com.mybatisflex.core.service.IService
import com.siersi.backend.entity.Sign
import com.siersi.backend.request.sign.SignRequest

interface SignService: IService<Sign> {
    fun submit(signRequest: SignRequest): Unit
}
