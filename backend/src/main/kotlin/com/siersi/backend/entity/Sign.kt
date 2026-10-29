package com.siersi.backend.entity

import com.mybatisflex.annotation.Id
import com.mybatisflex.annotation.KeyType
import com.mybatisflex.annotation.Table
import java.time.LocalDateTime

@Table("sign")
data class Sign (
    @Id(keyType = KeyType.Auto)
    val id: Long? = null,

    val name: String? = null,
    val stuId: String? = null,
    val department: String? = null,
    val major: String? = null,
    val grade: String? = null,
    val qq: String? = null,
    val groups: String? = null,
    val experience: String? = null,
    val intro: String? = null,
    val createTime: LocalDateTime? = null,
    val updateTime: LocalDateTime? = null,
    val valid: Int? = null
)