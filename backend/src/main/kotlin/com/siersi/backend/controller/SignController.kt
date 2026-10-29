package com.siersi.backend.controller

import com.siersi.backend.request.sign.SignRequest
import com.siersi.backend.service.sign.SignService
import com.siersi.backend.utils.Result
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/sign")
class SignController(
    private val signService: SignService,
) {

    @PostMapping("/submit")
    fun submit(@RequestBody @Valid signRequest: SignRequest): Result<Unit> {
        signService.submit(signRequest)
        return Result.success("提交成功")
    }
}
