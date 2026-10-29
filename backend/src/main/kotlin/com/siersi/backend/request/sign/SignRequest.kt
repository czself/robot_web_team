package com.siersi.backend.request.sign

import com.siersi.backend.validation.ValidGroups
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

data class SignRequest(
    @field:NotBlank(message = "姓名不能为空")
    @field:Size(max = 32, message = "姓名长度不能超过32个字符")
    val name: String,

    @field:NotBlank(message = "学号不能为空")
    @field:Pattern(regexp = "^\\d{10}$", message = "学号必须为10位数字")
    val stuId: String,

    @field:NotBlank(message = "院系不能为空")
    @field:Size(max = 64, message = "院系长度不能超过64个字符")
    val department: String,

    @field:NotBlank(message = "专业不能为空")
    @field:Size(max = 64, message = "专业长度不能超过64个字符")
    val major: String,

    @field:NotBlank(message = "年级不能为空")
    @field:Size(max = 32, message = "年级长度不能超过32个字符")
    val grade: String,

    @field:NotBlank(message = "QQ不能为空")
    @field:Pattern(regexp = "^[1-9]\\d{4,11}$", message = "QQ号格式不正确")
    val qq: String,

    @field:NotEmpty(message = "请至少选择一个组别")
    @field:Size(max = 5, message = "组别最多选择5个")
    @field:ValidGroups
    val groups: List<String>,

    @field:Size(max = 500, message = "相关经历不能超过500个字符")
    val experience: String? = null,

    @field:Size(max = 500, message = "自我介绍不能超过500个字符")
    val intro: String? = null
)
