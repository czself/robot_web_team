package com.siersi.backend.controller

import com.siersi.backend.entity.User
import com.siersi.backend.mapper.UserMapper
import com.siersi.backend.utils.Result
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/test")
class TestController(
    private val userMapper: UserMapper
) {

    @GetMapping("/api")
    fun test(): Result<List<User>> {
        val users = userMapper.selectAll()

        return Result.success(users)
    }
}