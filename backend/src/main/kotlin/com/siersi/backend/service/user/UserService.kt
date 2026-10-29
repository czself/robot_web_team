package com.siersi.backend.service.user

import com.mybatisflex.core.service.IService
import com.siersi.backend.entity.User
import com.siersi.backend.request.auth.LoginRequest
import com.siersi.backend.request.auth.RegisterRequest

interface UserService: IService<User> {
    fun register(registerRequest: RegisterRequest): Unit

    fun login(loginRequest: LoginRequest): String
}